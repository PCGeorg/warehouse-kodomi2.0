import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductPrice {
  prodCustId: number; //primary-key
  productSellPrice: string;
  custProductId: number;
  productName: String;
  custId: number;
}

interface Props {
  productPrices: ProductPrice[];
}

export function ProductPriceTable({ productPrices }: Props) {
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
            <TableCell>{price.productName}</TableCell>
            <TableCell>
              <button className="rounded border px-2 py-1 text-sm">Edit</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
