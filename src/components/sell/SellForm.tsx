"use client";

import { useState } from "react";
import BasicInfoSection from "./BasicInfoSection";
import ImageUploadSection from "./ImageUploadSection";
import ConditionPriceSection from "./ConditionPriceSection";
import LocationSection from "./LocationSection";
import { sellCategories, conditions } from "@/data/sellData";
import type { ConditionValue } from "@/types/sell";

export default function SellForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [condition, setCondition] = useState<ConditionValue | "">("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages].slice(0, 8)); // Max 8 images
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <BasicInfoSection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={sellCategories}
            />

            <ImageUploadSection
              images={images}
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
            />

            <ConditionPriceSection
              condition={condition}
              setCondition={setCondition}
              conditions={conditions}
            />

            <LocationSection />

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                Publicar Anúncio
              </button>
              <p className="text-sm text-gray-600 text-center mt-4">
                Ao publicar, você concorda com nossos{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
