"use client";

import { Camera, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageData {
  url: string;
  alt: string;
}

interface ImageUploadSectionProps {
  images: ImageData[];
  setImages: (images: ImageData[]) => void;
}

export default function ImageUploadSection({
  images,
  setImages,
}: ImageUploadSectionProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check total images limit
    if (images.length + files.length > 8) {
      alert("Você pode adicionar no máximo 8 fotos.");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Convert file to base64
        const base64 = await fileToBase64(file);

        // Upload to ImgBB via our API route
        const formData = new FormData();
        formData.append("image", base64.split(",")[1]); // Remove data:image/...;base64, prefix

        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          return {
            url: data.url,
            alt: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          };
        } else {
          throw new Error(data.error || "Upload failed");
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages([...images, ...uploadedImages]);

      // Reset input
      e.target.value = "";
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Erro ao fazer upload das imagens. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <Camera className="mr-2 text-blue-600" />
        Fotos do Item
      </h2>

      {/* Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adicionar Fotos *
        </label>
        <div className="flex items-center gap-4">
          <label className="flex-1 cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 font-medium">
                {uploading
                  ? "Fazendo upload..."
                  : "Clique para selecionar fotos"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WEBP (máx. 8 fotos)
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              disabled={uploading || images.length >= 8}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Selected Images */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Fotos selecionadas ({images.length}/8)
          {images.length > 0 && (
            <span className="text-xs text-gray-500 ml-2">
              (A primeira foto será a capa)
            </span>
          )}
        </p>

        {images.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-600">Nenhuma foto adicionada ainda</p>
            <p className="text-sm text-gray-500 mt-1">
              Mínimo 1 foto, máximo 8 fotos
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square group">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-lg"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Capa
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 mt-4">
        💡 Dica: Use fotos com boa iluminação e mostre diferentes ângulos do
        produto.
      </p>
    </div>
  );
}
