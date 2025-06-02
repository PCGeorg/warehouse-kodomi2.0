import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductPrice {
  prodCustId: number;
  productSellPrice: string;
  custProductId: number;
  custId: number;
}

interface Props {
  productPrices: ProductPrice[];
}

export async function ProductPriceTable({ productPrices }: Props) {
  if (productPrices.length === 0) {
    return (
      <p className="text-gray-500">
        No product prices found for this customer.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productPrices.map((price) => (
          <TableRow key={price.prodCustId}>
            <TableCell>{price.prodCustId}</TableCell>
            <TableCell>{price.productSellPrice}</TableCell>
            <TableCell>{price.custProductId}</TableCell>
            <TableCell>
              <button className="rounded border px-2 py-1 text-sm">Edit</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
