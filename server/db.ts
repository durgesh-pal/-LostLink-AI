import { Report, Match, Claim, NotificationItem, User, PlatformAnalytics } from "../src/types/index.js";
import { calculateMultimodalMatch, analyzeItemWithAI } from "./geminiService.js";

// Initial Seed Users
export const initialUsers: User[] = [
  {
    id: "usr_1",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    role: "citizen",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    phone: "+91 98765 43210",
    reputationScore: 94,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: "usr_2",
    name: "Priya Patel",
    email: "priya.p@example.com",
    role: "citizen",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    phone: "+91 98123 45678",
    reputationScore: 98,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString()
  },
  {
    id: "usr_admin",
    name: "Vikram Malhotra (Moderator)",
    email: "admin@lostlink.ai",
    role: "admin",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    phone: "+91 99999 00000",
    reputationScore: 100,
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString()
  }
];

// Initial Seed Reports
export const initialReports: Report[] = [
  {
    id: "rpt_lost_101",
    userId: "usr_1",
    userName: "Aarav Sharma",
    userEmail: "aarav.sharma@example.com",
    type: "lost",
    title: "Black HP Pavilion Laptop",
    category: "laptops",
    brand: "HP",
    model: "Pavilion 15-eg2000",
    color: "Black",
    description: "Black HP laptop lost near Prayagraj Railway Station around 6 PM. Has a distinctive silver metallic sticker near the center lid and minor scratches near the charging port.",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800",
    aiMetadata: {
      objectType: "Laptop",
      detectedBrand: "HP",
      detectedModel: "Pavilion 15",
      primaryColor: "Black",
      secondaryColors: ["Silver"],
      visualFeatures: ["Silver sticker on lid top center", "Chassis corner scratch", "15.6 inch display"],
      perceivedCondition: "Used - Good",
      aiDescription: "Dark black HP laptop computer featuring a metallic sticker in the middle of the top lid and standard QWERTY keyboard.",
      tags: ["hp", "laptop", "black", "prayagraj", "railway-station"]
    },
    location: {
      address: "Prayagraj Junction Railway Station, Leader Road",
      city: "Prayagraj",
      state: "Uttar Pradesh",
      landmark: "Near Main Gate Platform 1",
      lat: 25.4484,
      lng: 81.8286,
      isApproximate: true
    },
    date: "2026-08-08",
    time: "18:00",
    status: "active",
    privateSerialNo: "CND2390X88",
    privateUniqueMarks: "Small sticker of GitHub Octocat on left palm rest, scratch near left hinge",
    privateNotes: "Contains research manuscript files for Hackathon",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: "rpt_found_201",
    userId: "usr_2",
    userName: "Priya Patel",
    userEmail: "priya.p@example.com",
    type: "found",
    title: "Found Black HP Notebook Computer",
    category: "laptops",
    brand: "HP",
    model: "Pavilion",
    color: "Black",
    description: "Found a black HP laptop near the railway station waiting hall in Civil Lines area. Has a metallic emblem sticker on top lid and was left in a black canvas bag.",
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800",
    aiMetadata: {
      objectType: "Laptop",
      detectedBrand: "HP",
      detectedModel: "Pavilion Series",
      primaryColor: "Black",
      secondaryColors: ["Silver", "Dark Gray"],
      visualFeatures: ["Metallic sticker on lid", "Light scratches on lower bezel"],
      perceivedCondition: "Working - Minor Scratches",
      aiDescription: "Black HP laptop discovered in black canvas carrying sleeve with silver logo sticker.",
      tags: ["hp", "laptop", "black", "civil-lines", "railway-station"]
    },
    location: {
      address: "Civil Lines Side Exit, Prayagraj Railway Station",
      city: "Prayagraj",
      state: "Uttar Pradesh",
      landmark: "Civil Lines Waiting Lounge",
      lat: 25.4510,
      lng: 81.8310,
      isApproximate: true
    },
    date: "2026-08-08",
    time: "18:35",
    status: "active",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "rpt_lost_102",
    userId: "usr_1",
    userName: "Aarav Sharma",
    userEmail: "aarav.sharma@example.com",
    type: "lost",
    title: "Brown Leather Fossil Wallet",
    category: "wallets",
    brand: "Fossil",
    color: "Brown",
    description: "Brown leather bi-fold wallet containing student ID card, Metro pass, and blue lanyard key. Lost around MG Marg market area.",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
    aiMetadata: {
      objectType: "Wallet",
      detectedBrand: "Fossil",
      primaryColor: "Brown",
      secondaryColors: ["Tan"],
      visualFeatures: ["Embossed logo", "Bi-fold leather texture"],
      perceivedCondition: "Good",
      aiDescription: "Genuine brown leather bi-fold wallet with embossed brand stamp.",
      tags: ["wallet", "leather", "fossil", "brown"]
    },
    location: {
      address: "Mahatma Gandhi Marg, Civil Lines",
      city: "Prayagraj",
      state: "Uttar Pradesh",
      landmark: "Near Coffee House",
      lat: 25.4550,
      lng: 81.8350
    },
    date: "2026-08-07",
    time: "14:15",
    status: "active",
    privateUniqueMarks: "Driving License ending in 8841, family photo inside ID window",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "rpt_found_202",
    userId: "usr_2",
    userName: "Priya Patel",
    userEmail: "priya.p@example.com",
    type: "found",
    title: "Leather Pocket Wallet Found in Market",
    category: "wallets",
    brand: "Fossil",
    color: "Brown",
    description: "Picked up a brown leather wallet on a bench outside Civil Lines market complex. Contains several cards.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    aiMetadata: {
      objectType: "Wallet",
      detectedBrand: "Fossil",
      primaryColor: "Brown",
      secondaryColors: ["Dark Brown"],
      visualFeatures: ["Bi-fold stitching", "Leather grain"],
      perceivedCondition: "Good",
      aiDescription: "Brown leather wallet found in shopping street area.",
      tags: ["wallet", "brown", "civil-lines"]
    },
    location: {
      address: "Civil Lines Shopping Plaza",
      city: "Prayagraj",
      state: "Uttar Pradesh",
      landmark: "Outside Plaza Gate 2",
      lat: 25.4562,
      lng: 81.8365
    },
    date: "2026-08-07",
    time: "15:00",
    status: "active",
    createdAt: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString()
  },
  {
    id: "rpt_lost_103",
    userId: "usr_2",
    userName: "Priya Patel",
    userEmail: "priya.p@example.com",
    type: "lost",
    title: "Apple iPhone 14 Pro Max (Deep Purple)",
    category: "phones",
    brand: "Apple",
    model: "iPhone 14 Pro Max",
    color: "Purple",
    description: "Deep purple iPhone in a clear MagSafe case with astronaut pop socket. Lost in taxi during travel to airport.",
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
    aiMetadata: {
      objectType: "Smartphone",
      detectedBrand: "Apple",
      detectedModel: "iPhone 14 Pro",
      primaryColor: "Purple",
      secondaryColors: ["Transparent"],
      visualFeatures: ["Dynamic Island front display", "Clear MagSafe ring case", "Triple camera lens"],
      perceivedCondition: "Excellent",
      aiDescription: "Deep purple smartphone encased in transparent protective shell.",
      tags: ["iphone", "apple", "purple", "phone"]
    },
    location: {
      address: "Airport Road, Subedarganj",
      city: "Prayagraj",
      state: "Uttar Pradesh",
      landmark: "Near Bamrauli Airport Expressway",
      lat: 25.4400,
      lng: 81.7400
    },
    date: "2026-08-06",
    time: "11:30",
    status: "active",
    privateSerialNo: "IMEI: 359124098877123",
    privateUniqueMarks: "Lockscreen wallpaper is a cat under starry sky",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

// In-Memory Database Store
class Database {
  private users: User[] = [...initialUsers];
  private reports: Report[] = [...initialReports];
  private matches: Match[] = [];
  private claims: Claim[] = [];
  private notifications: NotificationItem[] = [
    {
      id: "notif_1",
      userId: "usr_1",
      title: "🎯 92% Match Found by AI!",
      message: "AI matching engine detected a potential match for your Lost HP Laptop with Found Report #201.",
      type: "match_found",
      read: false,
      linkReportId: "rpt_lost_101",
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
    }
  ];

  constructor() {
    this.rebuildMatches();
  }

  // Re-evaluates matches between active lost & found reports
  public async rebuildMatches() {
    this.matches = [];
    const lostReports = this.reports.filter(r => r.type === 'lost' && r.status !== 'closed');
    const foundReports = this.reports.filter(r => r.type === 'found' && r.status !== 'closed');

    for (const lost of lostReports) {
      for (const found of foundReports) {
        if (lost.category === found.category) {
          const matchResult = await calculateMultimodalMatch(lost, found);
          if (matchResult.matchScore >= 45) {
            this.matches.push({
              id: `match_${lost.id}_${found.id}`,
              lostReportId: lost.id,
              foundReportId: found.id,
              lostReport: lost,
              foundReport: found,
              breakdown: matchResult.breakdown,
              matchScore: matchResult.matchScore,
              explanation: matchResult.explanation,
              distanceKm: matchResult.distanceKm,
              timeDiffHours: matchResult.timeDiffHours,
              status: 'suggested',
              createdAt: new Date().toISOString()
            });
          }
        }
      }
    }
  }

  // Reports API
  public getReports(filters?: { type?: string; category?: string; status?: string; query?: string }) {
    let list = [...this.reports];
    if (filters?.type) {
      list = list.filter(r => r.type === filters.type);
    }
    if (filters?.category && filters.category !== 'all') {
      list = list.filter(r => r.category === filters.category);
    }
    if (filters?.status) {
      list = list.filter(r => r.status === filters.status);
    }
    if (filters?.query) {
      const q = filters.query.toLowerCase().trim();
      list = list.filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.brand && r.brand.toLowerCase().includes(q)) ||
        (r.color && r.color.toLowerCase().includes(q)) ||
        r.location.address.toLowerCase().includes(q) ||
        r.location.city.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getReportById(id: string) {
    return this.reports.find(r => r.id === id);
  }

  public async addReport(reportData: Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'aiMetadata'> & { imageBase64Data?: string }) {
    const id = `rpt_${reportData.type}_${Date.now()}`;
    
    // Run AI analysis
    const aiMeta = await analyzeItemWithAI(
      reportData.title,
      reportData.description,
      reportData.category,
      reportData.brand,
      reportData.model,
      reportData.color,
      reportData.imageBase64Data
    );

    const newReport: Report = {
      ...reportData,
      id,
      aiMetadata: aiMeta,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.reports.unshift(newReport);
    await this.rebuildMatches();

    // Trigger notification if match score > 75%
    const highestMatch = this.matches.find(m => m.lostReportId === id || m.foundReportId === id);
    if (highestMatch && highestMatch.matchScore >= 75) {
      this.notifications.unshift({
        id: `notif_${Date.now()}`,
        userId: newReport.userId,
        title: `🎯 ${highestMatch.matchScore}% AI Match Detected!`,
        message: `Our AI matched your "${newReport.title}" with a report near ${newReport.location.city}.`,
        type: 'match_found',
        read: false,
        linkReportId: newReport.id,
        createdAt: new Date().toISOString()
      });
    }

    return newReport;
  }

  public updateReportStatus(id: string, status: Report['status']) {
    const r = this.reports.find(item => item.id === id);
    if (r) {
      r.status = status;
      r.updatedAt = new Date().toISOString();
    }
    return r;
  }

  // Matches API
  public getMatches(reportId?: string) {
    if (reportId) {
      return this.matches
        .filter(m => m.lostReportId === reportId || m.foundReportId === reportId)
        .sort((a, b) => b.matchScore - a.matchScore);
    }
    return [...this.matches].sort((a, b) => b.matchScore - a.matchScore);
  }

  // Claims API
  public getClaims() {
    return [...this.claims].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addClaim(claim: Claim) {
    this.claims.unshift(claim);

    // Update report status
    const lostR = this.reports.find(r => r.id === claim.lostReportId);
    if (lostR) lostR.status = 'pending_claim';

    const foundR = this.reports.find(r => r.id === claim.foundReportId);
    if (foundR) foundR.status = 'pending_claim';

    // Send notifications to original report owners
    if (lostR) {
      this.notifications.unshift({
        id: `notif_claim_${Date.now()}`,
        userId: lostR.userId,
        title: "🔒 New Ownership Claim Submitted",
        message: `A claim with private verification was submitted for "${lostR.title}". Risk Assessment: ${claim.riskAssessment.riskLevel}`,
        type: 'claim_update',
        read: false,
        linkReportId: lostR.id,
        createdAt: new Date().toISOString()
      });
    }

    return claim;
  }

  public updateClaimStatus(claimId: string, status: Claim['status'], moderatorNotes?: string) {
    const c = this.claims.find(item => item.id === claimId);
    if (c) {
      c.status = status;
      if (moderatorNotes) c.moderatorNotes = moderatorNotes;
      c.updatedAt = new Date().toISOString();

      if (status === 'approved') {
        const lostR = this.reports.find(r => r.id === c.lostReportId);
        const foundR = this.reports.find(r => r.id === c.foundReportId);
        if (lostR) lostR.status = 'reunited';
        if (foundR) foundR.status = 'reunited';

        this.notifications.unshift({
          id: `notif_app_${Date.now()}`,
          userId: c.claimantId,
          title: "🎉 Claim Approved! Item Successfully Reunited",
          message: `Your ownership claim for "${lostR?.title || 'item'}" was verified and approved!`,
          type: 'claim_update',
          read: false,
          createdAt: new Date().toISOString()
        });
      }
    }
    return c;
  }

  // Notifications API
  public getNotifications(userId?: string) {
    if (userId) {
      return this.notifications.filter(n => n.userId === userId);
    }
    return [...this.notifications];
  }

  public markNotificationRead(id: string) {
    const n = this.notifications.find(item => item.id === id);
    if (n) n.read = true;
    return n;
  }

  // Analytics API
  public getAnalytics(): PlatformAnalytics {
    const reunited = this.reports.filter(r => r.status === 'reunited').length;
    const lostCount = this.reports.filter(r => r.type === 'lost').length;
    const foundCount = this.reports.filter(r => r.type === 'found').length;
    const highRiskClaims = this.claims.filter(c => c.riskAssessment.riskLevel === 'HIGH').length;

    const categoryDist: Record<string, number> = {};
    for (const r of this.reports) {
      categoryDist[r.category] = (categoryDist[r.category] || 0) + 1;
    }

    const avgScore = this.matches.length 
      ? Math.round(this.matches.reduce((acc, m) => acc + m.matchScore, 0) / this.matches.length)
      : 88;

    return {
      totalUsers: this.users.length,
      totalLostReports: lostCount,
      totalFoundReports: foundCount,
      totalAIMatches: this.matches.length,
      successfulReunions: reunited,
      pendingClaims: this.claims.filter(c => c.status === 'pending').length,
      fraudAlertsCount: highRiskClaims,
      avgMatchConfidence: avgScore,
      categoryDistribution: categoryDist,
      locationHotspots: [
        { city: "Prayagraj", count: 4 },
        { city: "Delhi NCR", count: 2 },
        { city: "Mumbai", count: 1 }
      ]
    };
  }

  // Reset & Seed Database for Hackathon Live Demo
  public async seedDemoData() {
    this.reports = [...initialReports];
    this.users = [...initialUsers];
    this.claims = [];
    this.notifications = [
      {
        id: "notif_demo",
        userId: "usr_1",
        title: "🎯 92% Match Found!",
        message: "AI found matching 'Found Black HP Laptop' at Prayagraj Railway Station.",
        type: "match_found",
        read: false,
        linkReportId: "rpt_lost_101",
        createdAt: new Date().toISOString()
      }
    ];
    await this.rebuildMatches();
  }
}

export const db = new Database();
