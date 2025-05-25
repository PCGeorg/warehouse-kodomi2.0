import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCustomer(custid?: number) {
  const whereCondition: any = {};

  if (custid) {
    whereCondition.custId = custid; // ✅ Filter by customer ID if provided
  }

  const customer = await prisma.customer.findMany({
    where: whereCondition, // ✅ Only applies the filter when categoryId is provided
  });

  // ✅ Transform the result to match your expected structure
  return customer;
}
// ✅ Create a new customer
export async function createCustomer(data: FormData) {
  try {
    const result = await prisma.customer.create({
      data: {
        custName: String(data.get("name")),
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
export async function updateCustomer(custId: number, data: FormData) {
  const file = data.get("file") as File | null;

  try {
    return await prisma.customer.update({
      where: { custId },
      data: {
        custName: data.get("name") as string,
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
export async function deleteCustomer(custId: number) {
  return await prisma.customer.delete({ where: { custId } });
}
