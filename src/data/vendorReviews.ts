import type { Review, VendorReviewSummary } from "@/types/reviews";

export const vendorReviewSummary: VendorReviewSummary = {
  label: "Excelente",
  score: 5.0,
  total: 64,
  source: "Google",
};

export const vendorReviews: Review[] = [
  { id: "r1", name: "Koushik D.", ago: "há 3 meses", text: "Serviço incrível... muito satisfeito com eles.", stars: 5 },
  { id: "r2", name: "Rizwan K.", ago: "há 4 meses", text: "Processo foi tranquilo e rápido. Estou muito feliz com o serviço. Altamente recomendado.", stars: 5 },
  { id: "r3", name: "Priyanka E.", ago: "há 4 meses", text: "Entrega foi rápida. Embalagem também estava muito boa.", stars: 5 },
  { id: "r4", name: "Marina S.", ago: "há 1 mês", text: "Produto como descrito, atendimento excelente!", stars: 5 },
  { id: "r5", name: "Carlos A.", ago: "há 2 semanas", text: "Chegou rapidinho, recomendo.", stars: 5 },
];

