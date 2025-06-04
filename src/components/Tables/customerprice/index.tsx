"use client";

import { Suspense, useEffect, useState } from "react";
import { Select } from "@/components/FormElements/select";
import { Button } from "@/components/ui-elements/button";
import { ProductPriceTable } from "./customerprice-table";
import { CustomersProductPricesSkeleton } from "./skeleton";

interface Customer {
  custId: number;
  custName: string;
}

interface ProductPrice {
  prodCustId: number; // Primary-key
  productSellPrice: string;
  custProductId: number;
  productName: String;
  custId: number;
  create_date: string;
  update_date: string;
  create_by: string;
  update_by: string;
}

export default function CustomerProductPricesPageClient() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );
  const [productPrices, setProductPrices] = useState<ProductPrice[]>([]);

  useEffect(() => {
    fetch("/api/protected/customer")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  useEffect(() => {
    if (selectedCustomerId !== null) {
      fetch(`/api/protected/product-customer?custId=${selectedCustomerId}`)
        .then((res) => res.json())
        .then((data) => setProductPrices(data));
    }
  }, [selectedCustomerId]);

  const handleAddNew = async () => {
    if (!selectedCustomerId) return alert("Please select a customer first");
    const productSellPrice = prompt("Enter selling price:");
    const custProductId = Number(prompt("Enter product ID:") ?? "");
    if (!productSellPrice || !custProductId) return;

    const res = await fetch("/api/protected/product-customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productSellPrice,
        custProductId,
        custId: selectedCustomerId,
        create_by: "admin",
        update_by: "admin",
      }),
    });

    if (res.ok) {
      const newPrice = await res.json();
      setProductPrices((prev) => [...prev, newPrice]);
    } else {
      alert("Failed to add price");
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Customer Price
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <div className="w-1/3">
            <Select
              label="Select Customer"
              placeholder="Select customer..."
              items={customers.map((cust) => ({
                value: cust.custId.toString(),
                label: cust.custName,
              }))}
              defaultValue=""
              className="w-full"
              onChange={(val) => setSelectedCustomerId(Number(val))}
            />
          </div>
          <button
            className="ml-auto inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-opacity-90"
            onClick={handleAddNew}
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
        </div>

        {selectedCustomerId === null ? (
          <p className="text-gray-500">
            Please select a customer to view prices.
          </p>
        ) : productPrices.length === 0 ? (
          <CustomersProductPricesSkeleton />
        ) : (
          <ProductPriceTable productPrices={productPrices} />
        )}
      </div>
    </div>
  );
}
