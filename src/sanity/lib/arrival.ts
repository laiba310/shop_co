

import { client } from "./client";


export const Arrival = async () => {
  const query =  `
*[_type == "product"] | order(_createdAt desc)[0...5] {
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
