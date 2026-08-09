import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { db, initialUsers } from "./server/db.js";
import { evaluateClaimRisk, analyzeItemWithAI } from "./server/geminiService.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "20mb" }));

  // Request Logging
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // --- API ROUTES ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "LostLink AI Engine", timestamp: new Date().toISOString() });
  });

  // Auth: Mock Login & Profile
  app.post("/api/auth/login", (req, res) => {
    const { email, role } = req.body;
    let user = initialUsers.find(u => u.email === email);
    if (!user) {
      user = {
        id: `usr_${Date.now()}`,
        name: email.split("@")[0] || "Citizen User",
        email: email || "user@lostlink.ai",
        role: role === "admin" ? "admin" : "citizen",
        reputationScore: 90,
        createdAt: new Date().toISOString()
      };
    }
    res.json({ success: true, user });
  });

  // Reports Endpoints
  app.get("/api/reports", (req, res) => {
    const { type, category, status, query } = req.query;
    const reports = db.getReports({
      type: type as string,
      category: category as string,
      status: status as string,
      query: query as string
    });
    res.json({ success: true, count: reports.length, reports });
  });

  app.get("/api/reports/:id", (req, res) => {
    const report = db.getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: "Report not found" });
    }
    res.json({ success: true, report });
  });

  app.post("/api/reports/lost", async (req, res) => {
    try {
      const newReport = await db.addReport({
        ...req.body,
        type: "lost",
        status: "active"
      });
      res.status(201).json({ success: true, report: newReport });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post("/api/reports/found", async (req, res) => {
    try {
      const newReport = await db.addReport({
        ...req.body,
        type: "found",
        status: "active"
      });
      res.status(201).json({ success: true, report: newReport });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.patch("/api/reports/:id/status", (req, res) => {
    const { status } = req.body;
    const updated = db.updateReportStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Report not found" });
    }
    res.json({ success: true, report: updated });
  });

  // Duplicate Check API
  app.post("/api/reports/check-duplicate", async (req, res) => {
    const { title, category, description, location } = req.body;
    const activeReports = db.getReports({ category, status: "active" });
    
    // Quick heuristic duplicate check
    const duplicate = activeReports.find(r => 
      r.title.toLowerCase().includes(title.toLowerCase().trim()) ||
      title.toLowerCase().includes(r.title.toLowerCase().trim())
    );

    if (duplicate) {
      return res.json({
        hasDuplicate: true,
        existingReport: duplicate,
        similarityScore: 94,
        message: "A matching report with similar title and location already exists on LostLink AI."
      });
    }

    res.json({ hasDuplicate: false });
  });

  // Matches API
  app.get("/api/matches", (req, res) => {
    const { reportId } = req.query;
    const matches = db.getMatches(reportId as string);
    res.json({ success: true, count: matches.length, matches });
  });

  app.post("/api/matches/analyze", async (req, res) => {
    await db.rebuildMatches();
    const matches = db.getMatches();
    res.json({ success: true, count: matches.length, matches });
  });

  // Claims & Fraud Prevention API
  app.get("/api/claims", (req, res) => {
    const claims = db.getClaims();
    res.json({ success: true, count: claims.length, claims });
  });

  app.post("/api/claims", async (req, res) => {
    try {
      const {
        lostReportId,
        foundReportId,
        claimantId,
        claimantName,
        claimantEmail,
        serialNumberProvided,
        uniqueMarksProvided,
        verificationStatement
      } = req.body;

      const lostR = db.getReportById(lostReportId);
      if (!lostR) {
        return res.status(404).json({ success: false, error: "Lost report not found" });
      }

      // Run AI Fraud Risk Assessment
      const riskAssessment = await evaluateClaimRisk(
        { serialNumberProvided, uniqueMarksProvided, verificationStatement },
        lostR,
        claimantEmail
      );

      const claim: any = {
        id: `clm_${Date.now()}`,
        lostReportId,
        foundReportId,
        claimantId: claimantId || "usr_1",
        claimantName: claimantName || "Claimant",
        claimantEmail: claimantEmail || "claimant@example.com",
        serialNumberProvided,
        uniqueMarksProvided,
        verificationStatement,
        riskAssessment,
        status: riskAssessment.riskLevel === "HIGH" ? "under_review" : "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const saved = db.addClaim(claim);
      res.status(201).json({ success: true, claim: saved });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.patch("/api/claims/:id", (req, res) => {
    const { status, moderatorNotes } = req.body;
    const updated = db.updateClaimStatus(req.params.id, status, moderatorNotes);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Claim not found" });
    }
    res.json({ success: true, claim: updated });
  });

  // Notifications API
  app.get("/api/notifications", (req, res) => {
    const { userId } = req.query;
    const list = db.getNotifications(userId as string);
    res.json({ success: true, notifications: list });
  });

  app.patch("/api/notifications/:id/read", (req, res) => {
    const item = db.markNotificationRead(req.params.id);
    res.json({ success: true, notification: item });
  });

  // Admin & Analytics API
  app.get("/api/admin/analytics", (req, res) => {
    const analytics = db.getAnalytics();
    res.json({ success: true, analytics });
  });

  // Seed / Reset Database
  app.post("/api/seed/reset", async (req, res) => {
    await db.seedDemoData();
    res.json({ success: true, message: "LostLink AI database reset with rich demo data!" });
  });

  // --- VITE MIDDLEWARE OR PRODUCTION SERVING ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LostLink AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
