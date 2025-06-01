import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { rupiahFormat } from "@/lib/format-number";
import ProductActions from "./product-actions";

interface Product {
  productId: number;
  productName: string;
  productPrice: string;
  productStock: bigint;
}

export async function Products() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/protected/product`,
    {
      cache: "no-store", // Disable caching so data is always fresh
    },
  );

  const data: Product[] = await res.json();

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Products
        </h2>
        <ProductActions />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="pl-5">Nama Produk</TableHead>
            <TableHead>Harga Produk</TableHead>
            <TableHead className="pr-5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.productId}>
              <TableCell className="pl-5">{product.productName}</TableCell>
              <TableCell>
                {rupiahFormat(Number(product.productPrice))}
              </TableCell>
              <TableCell className="pr-5 text-right">
                <ProductActions product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
