import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import OthersLookingSection from "@/components/askout/OthersLookingSection";
import ProductGalleryAndChat from "@/components/product/ProductGalleryAndChat";
import VendorReviews from "@/components/product/VendorReviews";
import ProductHeader from "@/components/product/ProductHeader";
import ProductDetails from "@/components/product/ProductDetails";
import { getProductById } from "@/services/productService";

// Force dynamic rendering - don't try to build this page at build time
export const dynamic = 'force-dynamic';

// Dynamic route: /product-overview/[product-id]
// Fetches product data from the database

export default async function ProductOverviewPage({
  params,
}: {
  params: Promise<{ [key: string]: string } & { "product-id"?: string }>;
}): Promise<ReactElement> {
  const p = await params;
  const productId = p["product-id"];

  if (!productId) {
    notFound();
  }

  // Fetch product from database
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  // Generate selling points from product data
  const sellingPoints = [
    product.condition && `Condição: ${product.condition}`,
    product.negotiable && 'Preço negociável',
  ].filter(Boolean) as string[];

  // Condition notes (can be enhanced later)
  const conditionNotes = product.description || '';

  // Location text
  const locationText = `${product.location.city}, ${product.location.state}`;

  return (
    <div className="min-h-screen bg-white">
      <ProductHeader
        product={{ id: product.id, title: product.title }}
        overrideId={productId}
      />

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery + Carousel + Chat */}
          <ProductGalleryAndChat
            images={product.images.map(img => img.url)}
            vendorName={product.seller?.displayName}
          />

          {/* Details */}
          <ProductDetails
            product={{
              priceBRL: product.priceBRL,
              seller: product.seller,
              sellingPoints,
              conditionNotes,
              locationText,
            }}
          />
        </div>
      </section>

      {/* You may also like */}
      <section className="py-4 border-t">
        <OthersLookingSection title="Você também pode gostar" />
      </section>

      <div className="border-t" />
      {/* Vendor rating & reviews */}
      <VendorReviews sellerId={product.seller?.id} />
    </div>
  );
}
