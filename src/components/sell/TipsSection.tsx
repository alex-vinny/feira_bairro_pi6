import { Camera, Info, DollarSign, MapPin } from "lucide-react";

const iconMap = {
  Camera,
  Info,
  DollarSign,
  MapPin,
};

const colorMap = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  orange: "bg-orange-600",
  purple: "bg-purple-600",
};

import type { Tip } from "@/types/sell";

interface TipsSectionProps {
  tips: Tip[];
}

export default function TipsSection({ tips }: TipsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Dicas Para Vender Mais Rápido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip, index) => {
            const IconComponent = iconMap[tip.icon];
            const colorClass = colorMap[tip.color];

            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-8 h-8 ${colorClass} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
