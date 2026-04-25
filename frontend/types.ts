export interface UserProfile {
  age: number | '';
  educationLevel: string;
  learningGoal: string;
  timeCommitment: string;
}

export interface RoadmapStep {
  phase: string;
  title: string;
  description: string;
  estimatedDuration: string;
  keyConcepts: string[];
  recommendedResources: string[];
}

export type AppTab = 'generator' | 'deployment';
