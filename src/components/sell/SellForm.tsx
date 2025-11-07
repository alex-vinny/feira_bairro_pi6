"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import BasicInfoSection from "./BasicInfoSection";
import ImageUploadSection from "./ImageUploadSection";
import ConditionPriceSection from "./ConditionPriceSection";
import LocationSection from "./LocationSection";
import { sellCategories, conditions } from "@/data/sellData";
import type { ConditionValue } from "@/types/sell";

interface ImageData {
  url: string;
  alt: string;
}

export default function SellForm() {
  const { user } = useAuth();
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [condition, setCondition] = useState<ConditionValue | "">("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [images, setImages] = useState<ImageData[]>([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check authentication
    if (!user) {
      alert("Você precisa estar logado para vender!");
      router.push("/login");
      return;
    }

    // Check if user is a seller
    if (user.userType !== 'seller' && user.userType !== 'both') {
      alert("Apenas vendedores podem publicar anúncios!");
      return;
    }

    // Validate images
    if (images.length === 0) {
      setError("Adicione pelo menos uma foto do produto!");
      return;
    }

    setLoading(true);

    try {
      // Generate unique product ID
      const productId = `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create product
      const productData = {
        id: productId,
        title: title.trim(),
        description: description.trim(),
        categoryId: parseInt(selectedCategory),
        condition,
        priceBrl: parseFloat(price),
        negotiable,
        zipCode: zipCode.trim(),
        city: city.trim(),
        state: state.trim(),
        images: images.map((img, index) => ({
          url: img.url,
          altText: img.alt,
          isCover: index === 0,
          displayOrder: index,
        })),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao publicar anúncio");
      }

      alert("Anúncio publicado com sucesso! ✅");

      // Redirect to product page or seller dashboard
      router.push(`/product-overview/${productId}`);

    } catch (err) {
      console.error("Error creating product:", err);
      setError(err instanceof Error ? err.message : "Erro ao publicar anúncio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {!user && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Você precisa estar logado como vendedor para publicar anúncios.{" "}
                <a href="/login" className="font-semibold underline hover:text-yellow-900">
                  Fazer login
                </a>
              </p>
            </div>
          )}

          {user && user.userType !== 'seller' && user.userType !== 'both' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                ❌ Apenas vendedores podem publicar anúncios. Seu tipo de conta: {user.userType}
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <BasicInfoSection
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={sellCategories}
            />

            <ImageUploadSection
              images={images}
              setImages={setImages}
            />

            <ConditionPriceSection
              condition={condition}
              setCondition={setCondition}
              price={price}
              setPrice={setPrice}
              negotiable={negotiable}
              setNegotiable={setNegotiable}
              conditions={conditions}
            />

            <LocationSection
              zipCode={zipCode}
              setZipCode={setZipCode}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
            />

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                type="submit"
                disabled={loading || !user || (user.userType !== 'seller' && user.userType !== 'both')}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Publicando..." : "Publicar Anúncio"}
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
