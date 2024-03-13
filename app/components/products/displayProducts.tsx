import BodyProduct from "./bodyProduct";

const DisplayProducts = () => {
  const hasProducts = true;

  return (
    <div className="overflow-x-auto my-5">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Description
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Quantity
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Categories
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Actions
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        {hasProducts ? (
          <BodyProduct />
        ) : (
          <tr>
            <td className="px-4 py-2">
              <h1 className="text-center">No products found!</h1>
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default DisplayProducts;
