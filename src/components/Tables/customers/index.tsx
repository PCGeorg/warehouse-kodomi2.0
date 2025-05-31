"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import EditCustomerModal from "./components/customer-form";

interface Customer {
  custId: number;
  custName: string;
}

export function Customers() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // 🔹 Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/protected/customer");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // 🔹 Delete customer
  async function handleDelete(custId: number) {
    const confirmed = confirm("Are you sure you want to delete this customer?");
    if (!confirmed) return;

    try {
      const response = await fetch("/api/protected/customer", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: custId }),
      });

      if (!response.ok) throw new Error("Delete failed");

      setData((prev) => prev.filter((cust) => cust.custId !== custId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  // 🔹 Edit customer
  function handleEdit(custId: number) {
    const customer = data.find((c) => c.custId === custId);
    if (customer) {
      setSelectedCustomer(customer);
      setIsOpen(true);
    }
  }

  // 🔹 Add customer
  function handleAddNew() {
    setSelectedCustomer(null); // null = new customer
    setIsOpen(true);
  }

  // 🔹 Save from modal
  const handleSave = (savedCustomer: Customer, isNew: boolean) => {
    if (isNew) {
      setData((prev) => [...prev, savedCustomer]);
    } else {
      setData((prevData) =>
        prevData.map((c) =>
          c.custId === savedCustomer.custId ? savedCustomer : c
        )
      );
    }
    setIsOpen(false);
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Customer
        </h2>
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
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead>ID Customer</TableHead>
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Nama Customer
            </TableHead>
            <TableHead className="pr-5 text-right sm:pr-6 xl:pr-7.5">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((customer) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white"
              key={customer.custId}
            >
              <TableCell>{customer.custId}</TableCell>
              <TableCell className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                {customer.custName}
              </TableCell>
              <TableCell className="pr-5 text-right sm:pr-6 xl:pr-7.5">
                <div className="flex justify-end space-x-2">
                  <button
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    onClick={() => handleEdit(customer.custId)}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      {isOpen && (
        <EditCustomerModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          customer={selectedCustomer}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
