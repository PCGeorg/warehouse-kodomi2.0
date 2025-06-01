import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Customers } from "@/components/Tables/customers";
import { CustomersSkeleton } from "@/components/Tables/customers/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Customer",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Customer" />

      <div className="space-y-10">
        <Suspense fallback={<CustomersSkeleton />}>
          <Customers />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
