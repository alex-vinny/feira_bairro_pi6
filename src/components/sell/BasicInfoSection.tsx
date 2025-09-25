import { Info } from "lucide-react";

interface BasicInfoSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export default function BasicInfoSection({
  selectedCategory,
  setSelectedCategory,
  categories,
}: BasicInfoSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <Info className="mr-2 text-blue-600" />
        Informações Básicas
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título do Anúncio *
          </label>
          <input
            type="text"
            placeholder="Ex: iPhone 13 Pro 128GB Azul"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria *
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição *
        </label>
        <textarea
          rows={4}
          placeholder="Descreva seu item em detalhes: marca, modelo, estado de conservação, motivo da venda, etc."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
    </div>
  );
}
