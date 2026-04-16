export interface VoterSegment {
  id: string;
  name: string;
  description: string;
  personaType: string;
  demographicProfile: {
    ageRange: [number, number];
    gender: 'M' | 'F' | 'Mixed';
    education: string[];
    socialClass: string[];
    location: string[];
  };
  behavioralProfile: {
    participationRate: number;
    voteStability: number;
    motivations: string[];
    informationChannels: string[];
  };
  sizePercentage: number;
  trends: {
    growth: number;
    stability: number;
    risk: number;
  };
  geographicDistribution: {
    [municipality: string]: number;
  };
  lastUpdated: Date;
}

export interface SimulationParameters {
  economicContext: number; // -1 to 1
  politicalContext: number; // -1 to 1
  campaignIntensity: number; // 0 to 1
  externalEvents: string[];
  segmentAdjustments: Record<string, number>;
  socialMediaImpact: number; // 0 to 1
}

export interface SimulationResults {
  expectedTurnout: number;
  voteShare: number;
  segmentContributions: Record<string, number>;
  confidence: number;
  geographicResults: Record<string, number>;
  scenarios: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
}

export interface SocialNarrative {
  id: string;
  content: string;
  platforms: string[];
  frequency: number;
  sentimentScore: number;
  politicalRelevance: number;
  impactOnSegments: Record<string, number>;
  trend: 'rising' | 'stable' | 'declining';
  firstDetected: Date;
  lastUpdated: Date;
}

export interface PersonaType {
  id: string;
  name: string;
  age: number;
  occupation: string;
  location: string;
  description: string;
  informationSources: string[];
  keyMotivations: string[];
  votingHistory: string[];
  likelihood: number; // 0 to 1
}