import DisplayProducts from "@/app/components/products/displayProducts";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div>
      <DisplayProducts />
      <div className="flex justify-center my-5">
        <Link
          className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
          href="products/create"
        >
          Create Product
        </Link>
      </div>
    </div>
  );
}
