export interface ElfData {
  id?: string;
  name: string;
  email?: string;
  wish: string;
  capturedImage?: string;
  elfImageUrl?: string;
}

export type WizardStep =
  | "welcome"
  | "camera"
  | "transform"
  | "result"
  | "certificate";
