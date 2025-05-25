import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice/invoice-table";
import { InvoiceTableSkeleton } from "@/components/Tables/invoice/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Transaction",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Transaction" />

      <div className="space-y-10">
        <Suspense fallback={<InvoiceTableSkeleton />}>
          <InvoiceTable />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
