"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  productId: number;
};

const DeleteProduct = ({ productId }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }),
      });
      if (response.status === 201) {
        router.push("/dashboard/products");
        router.refresh;
      } else {
        console.error("Error deleting product:", response);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex justify-center mt-80">
      <div className="bg-white p-6 rounded-md w-96">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-black text-center">
          Do you want to delete the product?
        </p>
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
          <Link
            href="/dashboard/products"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
