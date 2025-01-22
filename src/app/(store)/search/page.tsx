import ProductGrid from "@/components/productgrid";
import { searchProductsByName } from "@/sanity/lib/product/searchProductByName";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  // Await the promise to get the actual `query` object
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8">
        <div className="rounded-lg shadow-md w-full max-w-4xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">
            No products found for: {query}
          </h1>
          <p className="text-gray-600 text-center">
            Try searching with different keywords.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8">
      <div className="">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search results for: {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;
