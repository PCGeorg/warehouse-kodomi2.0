"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getTopProducts } from "../fetch";

export function Customers() {
  //   const data = await getCustomers();
  const data = [
    {
      custId: 10,
      custName: "Toko A",
    },
    {
      custId: 1,
      custName: "Toko B",
    },
    {
      custId: 11,
      custName: "Toko C",
    },
    {
      custId: 499,
      custName: "Toko D",
    },
  ];

  function handleDelete(custId: Number) {
    return;
  }
  function handleEdit(custId: Number) {
    return;
  }
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Customer
        </h2>
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
              <TableCell>
                <div>{customer.custId}</div>
              </TableCell>
              <TableCell className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                <div>{customer.custName}</div>
              </TableCell>

              <TableCell className="pr-5 text-right sm:pr-6 xl:pr-7.5">
                <div className="flex justify-end space-x-2">
                  <button
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    onClick={() => handleEdit(customer.custId)} // replace with your handler
                  >
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    onClick={() => handleDelete(customer.custId)} // replace with your handler
                  >
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
