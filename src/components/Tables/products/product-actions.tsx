"use client";

import { useState } from "react";
import ProductModal from "./components/product-form";

interface Product {
  productId?: number;
  productName: string;
  productPrice: string;
  productStock: bigint;
}

export default function ProductActions({ product }: { product?: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    product,
  );

  const handleSave = (savedProduct: Product) => {
    console.log("Saved:", savedProduct);
    // You'd typically send this to an API, then revalidate cache, etc.
    setIsModalOpen(false);
  };

  return (
    <>
      {!product ? (
        <button
          onClick={() => {
            setSelectedProduct(undefined);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-opacity-90"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New
        </button>
      ) : (
        <div className="flex justify-end space-x-2">
          <button
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            onClick={() => {
              setSelectedProduct(product);
              setIsModalOpen(true);
            }}
          >
            Edit
          </button>
          <button className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">
            Delete
          </button>
        </div>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
      />
    </>
  );
}
