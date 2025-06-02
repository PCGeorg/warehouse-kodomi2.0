import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomerProductPricesPageClient from "@/components/Tables/customerprice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Product",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Customer Product" />

      <div className="space-y-10">
        <CustomerProductPricesPageClient />
      </div>
    </>
  );
};

export default TablesPage;
