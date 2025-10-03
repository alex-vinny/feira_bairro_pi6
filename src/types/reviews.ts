export interface Review {
  id: string;
  name: string;
  ago: string; // e.g., "3 months ago"
  text: string;
  stars: 1 | 2 | 3 | 4 | 5;
}

export interface VendorReviewSummary {
  label: string; // e.g., "Excellent"
  score: number; // e.g., 5.0
  total: number; // e.g., 64
  source: string; // e.g., "Google"
}

