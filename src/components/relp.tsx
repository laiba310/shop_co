
import { client } from "@/sanity/lib/client";
import Related from "../app/(store)/related/realated";


 // Import the Client Component

// This will be a Server Component that fetches data
export default async function Newproduct() {
  const NEW_PRODUCT_QUERY = '*[_type == "product"] | order(_createdAt desc)[10...14]'; // Modify the query as needed

  // Fetching data from Sanity (this is an async operation)
  const products = await client.fetch(NEW_PRODUCT_QUERY);

  return <Related products={products} />;

}
