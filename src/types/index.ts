export type UserRole = 'citizen' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  reputationScore?: number;
  phone?: string;
  createdAt: string;
}

export type ItemCategory = 
  | 'electronics'
  | 'laptops'
  | 'phones'
  | 'wallets'
  | 'documents_ids'
  | 'keys'
  | 'jewelry_watches'
  | 'bags_luggage'
  | 'clothing'
  | 'pets'
  | 'vehicles'
  | 'other';

export type ReportType = 'lost' | 'found';
export type ReportStatus = 'active' | 'pending_claim' | 'reunited' | 'closed' | 'flagged';

export interface ReportLocation {
  address: string;
  city: string;
  state?: string;
  landmark?: string;
  lat: number;
  lng: number;
  isApproximate?: boolean;
}

export interface AIMetadata {
  objectType: string;
  detectedBrand?: string;
  detectedModel?: string;
  primaryColor: string;
  secondaryColors?: string[];
  visualFeatures: string[];
  perceivedCondition?: string;
  aiDescription: string;
  tags: string[];
  rawAnalysis?: string;
}

export interface Report {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: ReportType;
  title: string;
  category: ItemCategory;
  brand?: string;
  model?: string;
  color: string;
  description: string;
  imageUrl?: string;
  aiMetadata?: AIMetadata;
  location: ReportLocation;
  date: string;
  time: string;
  status: ReportStatus;
  
  // Private identifying information (only visible to owner or verified during claims)
  privateSerialNo?: string;
  privateUniqueMarks?: string;
  privateNotes?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface MatchScoreBreakdown {
  imageScore: number;       // Weight 35%
  textScore: number;        // Weight 20%
  locationScore: number;    // Weight 20%
  timeScore: number;        // Weight 10%
  categoryScore: number;    // Weight 10%
  brandModelScore: number;  // Weight 5%
  finalScore: number;       // 0 - 100%
}

export interface Match {
  id: string;
  lostReportId: string;
  foundReportId: string;
  lostReport?: Report;
  foundReport?: Report;
  breakdown: MatchScoreBreakdown;
  matchScore: number;       // overall score percentage
  explanation: string[];    // Explainable AI points
  distanceKm: number;       // Distance between locations in KM
  timeDiffHours: number;    // Time difference in hours
  status: 'suggested' | 'claimed' | 'verified' | 'dismissed';
  createdAt: string;
}

export type ClaimStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'escalated';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface FraudRiskAssessment {
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  reasons: string[];
  flaggedPatterns: string[];
  recommendedAction: string;
}

export interface Claim {
  id: string;
  matchId?: string;
  lostReportId: string;
  foundReportId: string;
  claimantId: string;
  claimantName: string;
  claimantEmail: string;
  
  // Submitted verification proof
  serialNumberProvided?: string;
  uniqueMarksProvided?: string;
  purchaseProofUrl?: string;
  verificationStatement: string;
  
  riskAssessment: FraudRiskAssessment;
  status: ClaimStatus;
  moderatorNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'match_found' | 'claim_update' | 'security_alert' | 'system';
  read: boolean;
  linkReportId?: string;
  createdAt: string;
}

export interface PlatformAnalytics {
  totalUsers: number;
  totalLostReports: number;
  totalFoundReports: number;
  totalAIMatches: number;
  successfulReunions: number;
  pendingClaims: number;
  fraudAlertsCount: number;
  avgMatchConfidence: number;
  categoryDistribution: Record<string, number>;
  locationHotspots: { city: string; count: number }[];
}
