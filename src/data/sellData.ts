export const sellCategories = [
  "Eletrônicos",
  "Casa, Decoração e Utensílios",
  "Artigos Infantis",
  "Escritório",
  "Animais de Estimação",
  "Roupas",
  "Calçados",
  "Relógios",
  "Livros",
  "Esportes",
  "Instrumentos Musicais",
  "Outros",
];

export interface Condition {
  value: string;
  label: string;
  description: string;
}

export const conditions: Condition[] = [
  {
    value: "novo",
    label: "Novo",
    description: "Item nunca usado, na embalagem original",
  },
  {
    value: "como-novo",
    label: "Como Novo",
    description: "Usado poucas vezes, sem sinais de uso",
  },
  {
    value: "muito-bom",
    label: "Muito Bom",
    description: "Sinais mínimos de uso, funciona perfeitamente",
  },
  {
    value: "bom",
    label: "Bom",
    description: "Sinais normais de uso, funciona bem",
  },
  {
    value: "regular",
    label: "Regular",
    description: "Sinais visíveis de uso, mas funcional",
  },
];

export const benefits = [
  {
    icon: "DollarSign",
    title: "Sem Taxas de Listagem",
    description: "Publique seus anúncios gratuitamente. Você só paga uma pequena taxa quando vender.",
    color: "green",
  },
  {
    icon: "Package",
    title: "Proteção ao Vendedor",
    description: "Sistema de avaliações e pagamento seguro protegem você contra fraudes.",
    color: "blue",
  },
  {
    icon: "MapPin",
    title: "Alcance Local",
    description: "Conecte-se com compradores da sua região e evite custos de envio.",
    color: "purple",
  },
];

export const tips = [
  {
    icon: "Camera",
    title: "Fotos de Qualidade",
    description: "Use boa iluminação, mostre diferentes ângulos e inclua detalhes importantes.",
    color: "blue",
  },
  {
    icon: "Info",
    title: "Descrição Completa",
    description: "Seja honesto sobre o estado, inclua marca, modelo e motivo da venda.",
    color: "green",
  },
  {
    icon: "DollarSign",
    title: "Preço Competitivo",
    description: "Pesquise preços similares e seja realista com o valor do seu item.",
    color: "orange",
  },
  {
    icon: "MapPin",
    title: "Resposta Rápida",
    description: "Responda mensagens rapidamente para manter o interesse dos compradores.",
    color: "purple",
  },
];
