"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useState, useEffect } from "react";

interface Customer {
  custId: number;
  custName: string;
}

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null; // 🔹 allow null for Add
  onSave: (data: Customer, isNew: boolean) => void; // 🔹 add isNew flag
}

export default function EditCustomerModal({
  isOpen,
  onClose,
  customer,
  onSave,
}: EditCustomerModalProps) {
  const isNew = customer === null;
  const [custName, setCustName] = useState("");

  // 🔹 Reset form when customer changes
  useEffect(() => {
    setCustName(customer?.custName || "");
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/protected/customer", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          custId: isNew ? undefined : customer?.custId,
          custName,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error("Error saving customer");

      onSave(result, isNew); // 🔹 pass isNew flag
      onClose();
    } catch (err) {
      console.error("Failed to save customer:", err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900 dark:text-white">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold">
              {isNew ? "Add Customer" : "Edit Customer"}
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
                label="Customer Name"
                type="text"
                placeholder="Enter customer name"
                value={custName}
                handleChange={(e) => setCustName(e.target.value)}
                className="mb-4.5"
                required
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
                  {isNew ? "Add Customer" : "Save Changes"}
                </button>
              </div>
            </form>
          </ShowcaseSection>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
