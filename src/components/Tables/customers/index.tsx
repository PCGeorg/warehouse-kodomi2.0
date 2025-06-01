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
import CustomerActions from "./customer-actions";

interface Customer {
  custId: number;
  custName: string;
}

export async function Customers() {
  //Fetxh Customer
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/protected/customer`,
    {
      cache: "no-store", // Disable caching so data is always fresh
    },
  );

  const data: Customer[] = await res.json();

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Customer
        </h2>
        <CustomerActions />
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
                <CustomerActions customer={customer} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
