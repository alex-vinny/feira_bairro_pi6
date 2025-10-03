// Types for the Ask Out (/askout) feature

// Form value model with a discriminated union so TypeScript enforces
// that budget is present only when donation === false
export interface AskFormBase {
  product: string;
}
export interface AskFormWithBudget extends AskFormBase {
  donation: false;
  budget: number; // BRL amount (>= 0). Input format handled in the component
}
export interface AskFormDonation extends AskFormBase {
  donation: true;
  budget: null; // explicitly null when donation is chosen
}
export type AskFormValues = AskFormWithBudget | AskFormDonation;

export type AskFormSubmitHandler = (values: AskFormValues) => void | Promise<void>;

// Items displayed in the "Confira o que outras pessoas estão procurando!" list
export interface AskItem {
  id: string;
  product: string;
  budget?: number; // shown when donation === false
  donation: boolean;
  time: string; // e.g., "há 2h", "há 1d"
}

export function hasBudget(v: Pick<AskItem, "budget">): v is { budget: number } {
  return typeof v.budget === "number";
}

