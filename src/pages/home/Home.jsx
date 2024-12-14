import { request } from "@/api";
import React, { useEffect, useState } from "react";
import Products from "@/components/Products";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    request.get("/product/get").then((res) => setProducts(res.data));

  }, []);
  return (
    <div>
      <Products isAdmin={false} data={products} />
    </div>
  );
};

export default Home;
