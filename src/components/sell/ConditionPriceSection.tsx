import { Package, DollarSign } from "lucide-react";
import { Condition } from "@/data/sellData";

interface ConditionPriceSectionProps {
  condition: string;
  setCondition: (condition: string) => void;
  conditions: Condition[];
}

export default function ConditionPriceSection({
  condition,
  setCondition,
  conditions,
}: ConditionPriceSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <Package className="mr-2 text-blue-600" />
        Estado e Preço
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Estado de Conservação *
          </label>
          <div className="space-y-3">
            {conditions.map((cond) => (
              <label key={cond.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value={cond.value}
                  checked={condition === cond.value}
                  onChange={(e) => setCondition(e.target.value)}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900">{cond.label}</div>
                  <div className="text-sm text-gray-600">{cond.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preço Desejado (R$) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="0,00"
                min="0"
                step="0.01"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aceita Negociação?
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="sim">Sim, aceito propostas</option>
              <option value="nao">Não, preço fixo</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
