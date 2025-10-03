import type { AskItem } from "@/types/askout";

export const recentAsks: AskItem[] = [
  {
    id: "a1",
    product: "Cadeira ergonômica",
    budget: 350,
    donation: false,
    time: "há 2h",
  },
  { id: "a2", product: "Livro Cálculo I", donation: true, time: "há 5h" },
  {
    id: "a3",
    product: "iPhone 11",
    budget: 1800,
    donation: false,
    time: "há 1d",
  },
  {
    id: "a4",
    product: "Fogão 4 bocas",
    budget: 600,
    donation: false,
    time: "há 1d",
  },
  {
    id: "a5",
    product: "Mochila para notebook",
    budget: 120,
    donation: false,
    time: "há 3d",
  },
  { id: "a6", product: "Roupas infantis", donation: true, time: "há 1sem" },
];
