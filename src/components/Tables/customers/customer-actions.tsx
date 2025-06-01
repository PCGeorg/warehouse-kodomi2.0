"use client";

import { useState } from "react";
import EditCustomerModal from "./components/customer-form";
import { useRouter } from "next/navigation";

interface Customer {
  custId: number;
  custName: string;
}

export default function CustomerActions({ customer }: { customer?: Customer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    customer ?? null,
  );

  const router = useRouter();

  // Delete customer
  async function handleDelete(custId: number) {
    const confirmed = confirm("Are you sure you want to delete this customer?");
    if (!confirmed) return;

    try {
      const response = await fetch("/api/protected/customer", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: custId }),
      });

      if (!response.ok) throw new Error("Delete failed");

      router.refresh(); // Refresh the server component
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  // Edit customer
  function handleEdit() {
    if (customer) {
      setSelectedCustomer(customer);
      setIsOpen(true);
    }
  }

  // Add new customer
  function handleAddNew() {
    setSelectedCustomer(null);
    setIsOpen(true);
  }

  // Save from modal
  const handleSave = async () => {
    setIsOpen(false);
    router.refresh(); // Reload customer list after save
  };

  return (
    <>
      {!customer ? (
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-opacity-90"
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
      ) : (
        <div className="flex justify-end space-x-2">
          <button
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            onClick={() => handleDelete(customer.custId)}
          >
            Delete
          </button>
        </div>
      )}
      <EditCustomerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        customer={selectedCustomer}
        onSave={handleSave}
      />
    </>
  );
}
