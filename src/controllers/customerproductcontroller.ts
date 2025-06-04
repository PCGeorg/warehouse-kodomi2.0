import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCustomerPrice(custid?: number) {
  const whereCondition: any = {};

  if (custid) {
    whereCondition.custId = custid;
  }

  const customerPrices = await prisma.productCustomer.findMany({
    where: whereCondition,
    include: {
      Product: {
        select: {
          productName: true, // ✅ Only fetch the product name
        },
      },
    },
  });

  return customerPrices.map((item) => ({
    ...item,
    productName: item.Product?.productName || null,
  }));
}

// ✅ Create a new customer
export async function createCustomerPrice(data: FormData) {
  try {
    const result = await prisma.productCustomer.create({
      data: {
        productSellPrice: String(data.get("name")),
        custProductId: Number(data.get("productId")),
        custId: Number(data.get("custId")),
        create_by: data.get("createdBy") as string,
        update_by: data.get("updateBy") as string,
        create_date: new Date(),
        update_date: new Date(),
      },
    });
    return result;
  } catch (error: any) {
    console.error("❌ Failed to create customer:", error.message || error);
    throw error;
  }
}

// ✅ Update a customer
export async function updateCustomerPrice(
  custId: number,
  prodCustId: number,
  data: FormData,
) {
  const file = data.get("file") as File | null;

  try {
    return await prisma.productCustomer.update({
      where: { custId, prodCustId },
      data: {
        productSellPrice: String(data.get("name")),
        custProductId: Number(data.get("productId")),
        custId: Number(data.get("custId")),
        update_by: data.get("updateBy") as string,
        update_date: new Date(), // ✅ Correct way to set the current timestamp
      },
    });
  } catch (error: any) {
    console.error("❌ Failed to update customer:", error.message || error);
    throw error;
  }
}

// ✅ Delete a customer
export async function deleteCustomerPrice(custId: number, prodCustId: number) {
  return await prisma.productCustomer.delete({ where: { custId, prodCustId } });
}
