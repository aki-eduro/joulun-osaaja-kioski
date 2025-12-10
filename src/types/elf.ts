export interface ElfData {
  id?: string;
  name: string;
  email: string;
  quizAnswer: string;
  capturedImage?: string;
  elfImageUrl?: string;
  badgeIssued?: boolean;
}

export type WizardStep = "welcome" | "quiz" | "camera" | "loading" | "result" | "certificate" | "info";
