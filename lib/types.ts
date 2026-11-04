export type TimeOfDay = "day" | "sunset" | "night";

export type ZoneId =
  | "overview"
  | "classroom"
  | "nature-table"
  | "solar-roof"
  | "library"
  | "medical"
  | "billboard";

export interface ZoneData {
  id: ZoneId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
  details: {
    iconName: string;
    features: string[];
    purpose: string;
    learningFocus?: string;
    specs?: { label: string; value: string }[];
  };
}

export interface Member {
  name: string;
  role: string;
  contribution: string;
  avatarColor: string;
}

export interface QuizOption {
  id: "A" | "B" | "C" | "D";
  text: string;
  isCorrect: boolean;
}

export interface ActivityQuestion {
  id: number;
  question: string;
  category: string;
  badge: string;
  options: QuizOption[];
  explanation: string;
}

