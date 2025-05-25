import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Customers } from "@/components/Tables/customers";
import { customerSkeleton } from "@/components/Tables/customers/skeleton";
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
        <Suspense fallback={<customerSkeleton />}>
          <Customers />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
