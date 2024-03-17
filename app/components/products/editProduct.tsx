"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  productId: number;
};

type Category = {
  id: number;
  name: string;
};

const EditProduct = ({ productId }: Props) => {
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    categories: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data.product);
        setFormData({
          title: data.product.title,
          description: data.product.description,
          quantity: data.product.quantity.toString(),
          categories: data.product.categories[0].name,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [productId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push("/dashboard/products");
      } else {
        console.error("Error updating product:", response);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.message);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (!product) {
    return <div>Product n°{productId} is not found !</div>;
  }

  return (
    <div>
      <section className="bg-black-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-gray-200 p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form action="#" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="sr-only">Title</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-black"
                    placeholder="Title"
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="Quantity" className="sr-only">
                      Quantity
                    </label>
                    <div className="flex justify-center">
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        placeholder="1"
                        className="w-80 h-12 px-4 rounded-lg text-center text-black border-gray-300  focus:border-black"
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <select
                      name="categories"
                      id="categories"
                      className="h-12 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                      required
                      value={formData.categories}
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Categories
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="sr-only">Description</label>
                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-black"
                    placeholder="Description"
                    rows={8}
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="flex justify-center space-x-80">
                  <button
                    className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                    type="submit"
                  >
                    <span className="absolute inset-0 border border-green-600 group-active:border-green-500"></span>
                    <span className="block border border-green-600 bg-green-600 px-12 py-3 transition-transform active:border-green-500 active:bg-green-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                      Update
                    </span>
                  </button>
                  <Link
                    className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                    href="/dashboard/products"
                  >
                    <span className="absolute inset-0 border border-red-600 group-active:border-red-500"></span>
                    <span className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                      Cancel
                    </span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProduct;
