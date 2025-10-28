"use client";

import { useRef, useEffect, useState } from "react";
import type { ReactElement } from "react";
import type { Review, VendorReviewSummary } from "@/types/reviews";

function Stars({ count }: { count: number }): ReactElement {
  return (
    <div className="text-yellow-500 select-none" aria-label={`${count} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < count ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
function GoogleWord(): ReactElement {
  return (
    <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold select-none">
      <span className="text-blue-600">G</span>
      <span className="text-red-500">o</span>
      <span className="text-yellow-500">o</span>
      <span className="text-blue-600">g</span>
      <span className="text-green-600">l</span>
      <span className="text-red-500">e</span>
    </span>
  );
}

interface VendorReviewsProps {
  sellerId?: string;
}

export default function VendorReviews({ sellerId = 'u-001' }: VendorReviewsProps): ReactElement {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<VendorReviewSummary>({
    label: 'Loading...',
    score: 0,
    total: 0,
    source: 'ResellPur',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/reviews/seller/${sellerId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();

        if (data.success) {
          setReviews(data.data.reviews);
          setSummary(data.data.summary);
        } else {
          throw new Error(data.error || 'Failed to fetch reviews');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [sellerId]);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
            Rate of the vendor
          </h2>
          <div className="mt-6 text-center text-gray-500">Loading reviews...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
            Rate of the vendor
          </h2>
          <div className="mt-6 text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
            Rate of the vendor
          </h2>
          <div className="mt-6 text-center text-gray-500">No reviews yet</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
          Rate of the vendor
        </h2>

        {/* Summary */}
        <div className="mt-6 rounded-xl ring-1 ring-green-100 bg-green-50 p-8 text-center">
          <div className="text-2xl md:text-3xl font-extrabold text-green-700">
            {summary.label}
          </div>
          <div className="mt-3 flex items-center justify-center gap-3">
            <Stars count={Math.round(summary.score)} />
            <span className="text-base font-semibold text-gray-800">
              {summary.score.toFixed(1)}
            </span>
          </div>
          <div className="mt-3 text-xs text-gray-600 flex items-center justify-center gap-2">
            <GoogleWord />
            <span>Based on {summary.total} reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-6">
          {/* edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/90 to-transparent" />

          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => scrollBy(-1)}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border shadow text-gray-700 hover:bg-gray-50"
          >
            ‹
          </button>
          <div ref={scrollerRef} className="overflow-x-auto scroll-smooth px-8">
            <div className="flex gap-4 min-w-full snap-x snap-mandatory">
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className="min-w-[280px] sm:min-w-[320px] rounded-xl ring-1 ring-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                      {r.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.ago}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-gray-700 text-sm">{r.text}</div>
                  <div className="mt-4 flex items-center justify-between">
                    <Stars count={r.stars} />
                    <GoogleWord />
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => scrollBy(1)}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border shadow text-gray-700 hover:bg-gray-50"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
