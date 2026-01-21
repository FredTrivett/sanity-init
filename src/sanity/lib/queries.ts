import { defineQuery } from 'next-sanity'

// Query to fetch a page by slug (for page builder)
export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  seoTitle,
  seoDescription,
  sections[] {
    _key,
    _type,
    title,
    text,
    image {
      asset,
      alt
    },
    imagePosition,
    button {
      label,
      link
    }
  }
}`)

// Query to fetch all pages (for generating static paths)
export const PAGES_QUERY = defineQuery(`*[_type == "page"] {
  _id,
  title,
  "slug": slug.current
}`)
