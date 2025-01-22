import ImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";


import { client } from './client';

// https://www.sanity.io/docs/image-url
const builder = ImageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}