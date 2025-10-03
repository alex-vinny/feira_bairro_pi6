export type ConditionValue = "novo" | "como-novo" | "muito-bom" | "bom" | "regular";

export interface Condition {
  value: ConditionValue;
  label: string;
  description: string;
}

export type BenefitIcon = "DollarSign" | "Package" | "MapPin";
export type BenefitColor = "green" | "blue" | "purple";

export interface Benefit {
  icon: BenefitIcon;
  title: string;
  description: string;
  color: BenefitColor;
}

export type TipIcon = "Camera" | "Info" | "DollarSign" | "MapPin";
export type TipColor = "blue" | "green" | "orange" | "purple";

export interface Tip {
  icon: TipIcon;
  title: string;
  description: string;
  color: TipColor;
}

