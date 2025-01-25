import { getProductId } from "@/sanity/lib/product/getProductId";
import ProductPageClient from "./ProductPageClient";
import Newproduct from "@/components/relp";


async function ProductPage({params}:{params:Promise<{id:string}>}){
  const id = (await params).id

  // Fetch product on the server
  const product = await getProductId(id);

  if (!product) {
    return (
      <div className="text-center">
        <h1>Product not found</h1>
      </div>
    );
  }

  // Pass the fetched product to the client component
  return (
    <div>
      <ProductPageClient product={product} />
      <Newproduct />
    </div>
  );
}

export default ProductPage;
