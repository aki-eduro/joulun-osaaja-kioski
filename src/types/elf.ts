export interface ElfData {
  id?: string;
  name: string;
  email?: string;
  wish: string;
  badgeImage?: string;
  capturedImage?: string;
  elfImageUrl?: string;
}

export type WizardStep =
  | "welcome"
  | "name"
  | "wish"
  | "camera"
  | "transform"
  | "result"
  | "certificate";
