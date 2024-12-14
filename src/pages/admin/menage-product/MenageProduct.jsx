import Products from "@/components/Products";
import { useFetch } from "@/hooks/useFetch";

const MenageProduct = () => {
  const { data, loading } = useFetch("/product/get");
  return (
    <div>
      <Products isAdmin={true} data={data} />
    </div>
  );
};

export default MenageProduct;
