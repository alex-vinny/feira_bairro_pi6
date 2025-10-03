import type { Review, VendorReviewSummary } from "@/types/reviews";

export const vendorReviewSummary: VendorReviewSummary = {
  label: "Excellent",
  score: 5.0,
  total: 64,
  source: "Google",
};

export const vendorReviews: Review[] = [
  { id: "r1", name: "Koushik D.", ago: "3 months ago", text: "Amazing service... very pleased with them.", stars: 5 },
  { id: "r2", name: "Rizwan K.", ago: "4 months ago", text: "Process was smooth and quick. I'm very happy with their service. Highly recommended.", stars: 5 },
  { id: "r3", name: "Priyanka E.", ago: "4 months ago", text: "Delivery was fast. Packaging was also very good.", stars: 5 },
  { id: "r4", name: "Marina S.", ago: "1 month ago", text: "Produto como descrito, atendimento excelente!", stars: 5 },
  { id: "r5", name: "Carlos A.", ago: "2 weeks ago", text: "Chegou rapidinho, recomendo.", stars: 5 },
];

