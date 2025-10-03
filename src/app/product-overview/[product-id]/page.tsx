import type { ReactElement } from "react";
import OthersLookingSection from "@/components/askout/OthersLookingSection";
import ProductGalleryAndChat from "@/components/product/ProductGalleryAndChat";
import VendorReviews from "@/components/product/VendorReviews";
import ProductHeader from "@/components/product/ProductHeader";
import ProductDetails from "@/components/product/ProductDetails";
import { productOverviewDemo } from "@/data/productOverview";

// Dynamic route: /product-overview/[product-id]
// This page intentionally ignores the "id" param and renders a fixed demo item
// so any value (number or text) will show the same content.

export default async function ProductOverviewPage({
  params,
}: {
  params: Promise<{ [key: string]: string } & { "product-id"?: string }>;
}): Promise<ReactElement> {
  const p = await params;
  const routeId = p["product-id"] ?? productOverviewDemo.product.id;
  const { product, sellingPoints, conditionNotes } = productOverviewDemo;

  return (
    <div className="min-h-screen bg-white">
      <ProductHeader
        product={{ id: product.id, title: product.title }}
        overrideId={routeId}
      />

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery + Carousel + Chat */}
          <ProductGalleryAndChat
            images={product.images}
            vendorName={product.seller?.displayName}
          />

          {/* Details */}
          <ProductDetails
            product={{
              priceBRL: product.priceBRL,
              seller: product.seller,
              sellingPoints,
              conditionNotes,
              locationText: product.locationText,
            }}
          />
        </div>
      </section>

      {/* You may also like */}
      <section className="py-4 border-t">
        <OthersLookingSection title="You may also like" />
      </section>

      <div className="border-t" />
      {/* Vendor rating & reviews */}
      <VendorReviews />
    </div>
  );
}
