// components/Modals/ProductModal.tsx
"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useEffect, useState } from "react";

interface Product {
  productId?: number;
  productName: string;
  productPrice: string;
  productStock: bigint;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Product) => void;
  product?: Product;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
}: ProductModalProps) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("0");

  useEffect(() => {
    if (product) {
      setProductName(product.productName || "");
      setProductPrice(product.productPrice || "");
      setProductStock(product.productStock.toString());
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...product,
      productName,
      productPrice,
      productStock: BigInt(productStock),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900 dark:text-white">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold">
              {product?.productId ? "Edit Product" : "Add Product"}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ShowcaseSection title="" className="!p-0">
            <form onSubmit={handleSubmit}>
              <InputGroup
                label="Product Name"
                type="text"
                placeholder="Enter product name"
                value={productName}
                handleChange={(e) => setProductName(e.target.value)}
                required
                className="mb-4.5"
              />
              <InputGroup
                label="Product Price"
                type="text"
                placeholder="Enter product price"
                value={productPrice}
                handleChange={(e) => setProductPrice(e.target.value)}
                required
                className="mb-4.5"
              />
              <InputGroup
                label="Product Stock"
                type="number"
                placeholder="Enter stock quantity"
                value={productStock}
                handleChange={(e) => setProductStock(e.target.value)}
                required
                className="mb-4.5"
              />

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
                >
                  {product?.productId ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </ShowcaseSection>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
