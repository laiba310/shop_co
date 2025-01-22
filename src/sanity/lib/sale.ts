

import { client } from "./client";


export const Sale = async () => {
  const query =  `
*[_type == "product"] | order(_createdAt desc)[5...10] {
  _id,
  name,
  price,
  description,
  image {
    asset-> {
      url
    }
  }
}

`;
  return await client.fetch(query);
};
