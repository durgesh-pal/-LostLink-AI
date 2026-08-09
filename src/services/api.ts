import { Report, Match, Claim, NotificationItem, PlatformAnalytics, User } from "../types/index.js";

export async function loginUser(email: string, role: 'citizen' | 'admin' = 'citizen'): Promise<{ user: User }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role })
    });
    return await res.json();
  } catch (err) {
    return {
      user: {
        id: 'usr_demo',
        name: email.split('@')[0] || 'Demo User',
        email,
        role,
        reputationScore: 95,
        createdAt: new Date().toISOString()
      }
    };
  }
}

export async function fetchReports(filters?: { type?: string; category?: string; status?: string; query?: string }): Promise<Report[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.query) params.append('query', filters.query);

    const res = await fetch(`/api/reports?${params.toString()}`);
    const data = await res.json();
    return data.reports || [];
  } catch (err) {
    console.error("fetchReports error:", err);
    return [];
  }
}

export async function fetchReportById(id: string): Promise<Report | null> {
  try {
    const res = await fetch(`/api/reports/${id}`);
    const data = await res.json();
    return data.report || null;
  } catch (err) {
    return null;
  }
}

export async function submitReport(type: 'lost' | 'found', reportData: Partial<Report> & { imageBase64Data?: string }): Promise<Report> {
  const endpoint = type === 'lost' ? '/api/reports/lost' : '/api/reports/found';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reportData)
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to submit report");
  }
  return data.report;
}

export async function checkDuplicateReport(reportData: { title: string; category: string; description: string }): Promise<{ hasDuplicate: boolean; existingReport?: Report; message?: string }> {
  try {
    const res = await fetch('/api/reports/check-duplicate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    });
    return await res.json();
  } catch (err) {
    return { hasDuplicate: false };
  }
}

export async function fetchMatches(reportId?: string): Promise<Match[]> {
  try {
    const url = reportId ? `/api/matches?reportId=${reportId}` : '/api/matches';
    const res = await fetch(url);
    const data = await res.json();
    return data.matches || [];
  } catch (err) {
    return [];
  }
}

export async function runAIMatchAnalysis(): Promise<Match[]> {
  try {
    const res = await fetch('/api/matches/analyze', { method: 'POST' });
    const data = await res.json();
    return data.matches || [];
  } catch (err) {
    return [];
  }
}

export async function fetchClaims(): Promise<Claim[]> {
  try {
    const res = await fetch('/api/claims');
    const data = await res.json();
    return data.claims || [];
  } catch (err) {
    return [];
  }
}

export async function submitClaim(claimData: {
  lostReportId: string;
  foundReportId: string;
  claimantId: string;
  claimantName: string;
  claimantEmail: string;
  serialNumberProvided?: string;
  uniqueMarksProvided?: string;
  verificationStatement: string;
}): Promise<Claim> {
  const res = await fetch('/api/claims', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(claimData)
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to submit claim");
  }
  return data.claim;
}

export async function updateClaimStatus(claimId: string, status: Claim['status'], moderatorNotes?: string): Promise<Claim> {
  const res = await fetch(`/api/claims/${claimId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, moderatorNotes })
  });
  const data = await res.json();
  return data.claim;
}

export async function fetchNotifications(userId?: string): Promise<NotificationItem[]> {
  try {
    const url = userId ? `/api/notifications?userId=${userId}` : '/api/notifications';
    const res = await fetch(url);
    const data = await res.json();
    return data.notifications || [];
  } catch (err) {
    return [];
  }
}

export async function markNotificationRead(id: string): Promise<void> {
  try {
    await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
  } catch (err) {
    // ignore
  }
}

export async function fetchAnalytics(): Promise<PlatformAnalytics> {
  try {
    const res = await fetch('/api/admin/analytics');
    const data = await res.json();
    return data.analytics;
  } catch (err) {
    return {
      totalUsers: 3,
      totalLostReports: 3,
      totalFoundReports: 2,
      totalAIMatches: 2,
      successfulReunions: 1,
      pendingClaims: 1,
      fraudAlertsCount: 0,
      avgMatchConfidence: 91,
      categoryDistribution: { laptops: 2, wallets: 2, phones: 1 },
      locationHotspots: [{ city: "Prayagraj", count: 4 }]
    };
  }
}

export async function createLostReport(formData: any): Promise<Report> {
  return submitReport('lost', formData);
}

export async function createFoundReport(formData: any): Promise<Report> {
  return submitReport('found', formData);
}

export async function seedDemoScenario(): Promise<void> {
  await fetch('/api/seed/reset', { method: 'POST' });
}

export async function resetDatabase(): Promise<void> {
  await fetch('/api/seed/reset', { method: 'POST' });
}

export async function resetSeedData(): Promise<void> {
  await fetch('/api/seed/reset', { method: 'POST' });
}
