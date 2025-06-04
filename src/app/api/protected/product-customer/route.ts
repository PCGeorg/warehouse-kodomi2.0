import { NextRequest, NextResponse } from "next/server";
import {
  getCustomerPrice,
  createCustomerPrice,
  updateCustomerPrice,
  deleteCustomerPrice,
} from "@/controllers/customerproductcontroller";

// ✅ GET: Fetch customer prices with optional filtering by custId
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const custId = searchParams.get("custId");
    const parsedCustId = custId ? parseInt(custId, 10) : undefined;

    const prices = await getCustomerPrice(parsedCustId);
    return NextResponse.json(prices);
  } catch (error) {
    console.error("❌ Failed to fetch customer prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch customer prices" },
      { status: 500 },
    );
  }
}

// ✅ POST: Create a new customer price entry
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const newEntry = await createCustomerPrice(formData);
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create customer price:", error);
    return NextResponse.json(
      { error: "Failed to create customer price" },
      { status: 500 },
    );
  }
}

// ✅ PUT: Update a customer price entry
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const custId = Number(formData.get("custId"));
    const prodCustId = Number(formData.get("prodCustId"));

    if (isNaN(custId) || isNaN(prodCustId)) {
      return NextResponse.json(
        { error: "Invalid custId or prodCustId" },
        { status: 400 },
      );
    }

    const updated = await updateCustomerPrice(custId, prodCustId, formData);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Failed to update customer price:", error);
    return NextResponse.json(
      { error: "Failed to update customer price" },
      { status: 500 },
    );
  }
}

// ✅ DELETE: Remove a customer price entry
export async function DELETE(req: NextRequest) {
  try {
    const { custId, prodCustId } = await req.json();

    const parsedCustId = Number(custId);
    const parsedProdCustId = Number(prodCustId);

    if (isNaN(parsedCustId) || isNaN(parsedProdCustId)) {
      return NextResponse.json(
        { error: "Invalid custId or prodCustId" },
        { status: 400 },
      );
    }

    await deleteCustomerPrice(parsedCustId, parsedProdCustId);
    return NextResponse.json({
      message: "Customer price deleted successfully",
    });
  } catch (error) {
    console.error("❌ Failed to delete customer price:", error);
    return NextResponse.json(
      { error: "Failed to delete customer price" },
      { status: 500 },
    );
  }
}
