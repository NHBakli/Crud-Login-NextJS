import DeleteProduct from "@/app/components/products/deleteProduct";

type Props = {
  params: {
    id: number;
  };
};

const deleteProductPage = ({ params }: Props) => {
  return (
    <div>
      <DeleteProduct productId={params.id} />
    </div>
  );
};

export default deleteProductPage;
