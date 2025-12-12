export interface ElfData {
  id?: string;
  name: string;
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
  | "certificate";
