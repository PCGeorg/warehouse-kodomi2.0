import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProduct(productId?: number) {
  const whereCondition: any = {};

  if (productId) {
    whereCondition.productId = productId; // ✅ Filter by product ID if provided
  }

  const products = await prisma.product.findMany({
    where: whereCondition, // ✅ Only applies the filter when categoryId is provided
  });
  // ✅ Transform the result to match your expected structure

  const alterProducts = products.map((prod) => ({
    ...prod,
    productStock: prod.productStock.toString(),
  }));

  return alterProducts;
}
// ✅ Create a new product
export async function createProduct(data: FormData) {
  try {
    const result = await prisma.product.create({
      data: {
        productName: String(data.get("Productname")),
        productPrice: String(data.get("Productprice")),
        productStock: Number(data.get("Productstock")),
        create_by: data.get("createdBy") as string,
        update_by: data.get("updateBy") as string,
        create_date: new Date(),
        update_date: new Date(),
      },
    });
    return result;
  } catch (error: any) {
    console.error("❌ Failed to create product:", error.message || error);
    throw error;
  }
}

// ✅ Update a product
export async function updateProduct(productId: number, data: FormData) {
  const file = data.get("file") as File | null;

  try {
    return await prisma.product.update({
      where: { productId },
      data: {
        productName: String(data.get("Productname")),
        productPrice: String(data.get("Productprice")),
        productStock: Number(data.get("Productstock")),
        update_by: data.get("updateBy") as string,
        update_date: new Date(), // ✅ Correct way to set the current timestamp
      },
    });
  } catch (error: any) {
    console.error("❌ Failed to update product:", error.message || error);
    throw error;
  }
}

// ✅ Delete a product
export async function deleteProduct(productId: number) {
  return await prisma.product.delete({ where: { productId } });
}
