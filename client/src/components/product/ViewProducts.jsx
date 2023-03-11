import { useEffect, useState } from "react";
import { getProducts } from "../../helper/API";
import ProductCard from "./ProductCard.jsx";
import { SimpleGrid } from "@chakra-ui/react";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const products = await getProducts({});
      setProducts(products);
    };
    load();
  }, []);
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
    >
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </SimpleGrid>
  );
};

export default ViewAllProducts;
