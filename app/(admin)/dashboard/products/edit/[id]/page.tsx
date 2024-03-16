import EditProduct from "@/app/components/products/editProduct";

type Props = {
  params: {
    id: number;
  };
};

const EditProductPage = ({ params }: Props) => {
  return (
    <div>
      <EditProduct productId={params.id} />
    </div>
  );
};

export default EditProductPage;
