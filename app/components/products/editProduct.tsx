"use client";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

type Props = {
  productId: number;
};

const EditProduct = ({ productId }: Props) => {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const prisma = new PrismaClient();

      try {
        const data = await prisma.product.findUnique({
          where: {
            id: productId,
          },
          include: {
            categories: true,
          },
        });
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return <div>The product n°{productId} is not found !</div>;
  }

  return (
    <div>
      <h1>Edit Product Page n°{productId}</h1>
      <h1>Title: {product.title}</h1>
      <p>Description: {product.description}</p>

      <p>Quantity: {product.quantity}</p>

      <p>Categories:</p>
      <ul>
        {product.categories.map((category: any) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EditProduct;
