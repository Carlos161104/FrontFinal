import Link from "next/link";
import ProductCard from "./ProductCard";

const ProductList = ({ productList, show }) => {
  return (
    <div>
      {show &&
        productList.map((product) => {
          return (
            <Link
              key={product.id}
              href={{ pathname: `/dashboard/products/${product.id}` }}
              className="block"
            >
              <ProductCard product={product} />
            </Link>
          );
        })}
    </div>
  );
};

export default ProductList;
