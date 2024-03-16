"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  title: string;
  categories: { id: number; name: string }[];
  quantity: number;
  description: string;
};

type Props = {
  params: {
    id: string;
  };
};

const ProductPage = ({ params }: Props) => {
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const id = +params.id;
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error display product:", error);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (error) {
    return <div>Error !</div>;
  }

  if (!product) {
    return <div>The product is not found !</div>;
  }

  return (
    <div>
      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm dark:border-gray-700">
        <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
            <dt className="font-medium text-gray-900 dark:text-white">Title</dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              {product.title}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
            <dt className="font-medium text-gray-900 dark:text-white">
              Category
            </dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              {product.categories.map((category) => (
                <p key={category.id}>{category.name}</p>
              ))}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
            <dt className="font-medium text-gray-900 dark:text-white">
              Quantity
            </dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              {product.quantity}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
            <dt className="font-medium text-gray-900 dark:text-white">
              Description
            </dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              {product.description}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-center">
        <Link
          href="/dashboard/products"
          className="group inline-block text-black rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        >
          <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
            Back to products
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProductPage;
