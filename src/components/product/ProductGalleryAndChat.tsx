"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, Send } from "lucide-react";
import type { ReactElement } from "react";

interface ProductGalleryAndChatProps {
  images: string[];
  vendorName?: string;
}

export default function ProductGalleryAndChat({
  images,
  vendorName = "Vendedor Confiável",
}: ProductGalleryAndChatProps): ReactElement {
  const [current, setCurrent] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  const onSend = () => {
    const m = message.trim();
    if (!m) return;
    setMessages((arr) => [...arr, m]);
    setMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Main image */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="relative aspect-[4/3] bg-gray-100">
          <Image
            key={images[current]}
            src={images[current]}
            alt="Imagem do produto"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="p-4 text-sm text-gray-500">Imagens ilustrativas.</div>
      </div>

      {/* Thumbnails carousel */}
      <div className="relative">
        {/* edge masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/90 to-transparent rounded-l-lg" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/90 to-transparent rounded-r-lg" />

        <button
          type="button"
          aria-label="Anterior"
          onClick={prev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border shadow text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeft className="h-5 w-5 mx-auto" />
        </button>
        <div className="overflow-x-auto scroll-smooth px-8">
          <div className="flex gap-3 snap-x snap-mandatory">
            {images.map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => setCurrent(idx)}
                className={`relative h-20 w-28 rounded-lg border transition-all snap-start ${
                  idx === current
                    ? "ring-2 ring-blue-600 border-transparent"
                    : "border-gray-200 hover:border-gray-300"
                } overflow-hidden bg-gray-100`}
              >
                <Image
                  src={src}
                  alt="Miniatura"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Próximo"
          onClick={next}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border shadow text-gray-700 hover:bg-gray-50"
        >
          ›
        </button>
      </div>

      {/* Chat with seller */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Chat com o vendedor
        </h2>
        <div className="mt-3 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-900">
          Todos os chats são públicos e podem ser moderados. Não compartilhe
          dados pessoais.
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {messages.length === 0 ? (
            <p>Nenhuma pergunta ou comentário ainda.</p>
          ) : (
            <ul className="space-y-2">
              {messages.map((m, i) => (
                <li key={i} className="rounded-md border p-2">
                  <span className="font-medium mr-1">Você:</span>
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Escreva sua dúvida para ${vendorName}...`}
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <button
            type="button"
            onClick={onSend}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 shadow"
          >
            <Send className="h-4 w-4" />
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
