import { filterProductsByQuery } from '../utils/filter-products'
import { getProducts } from '../utils/products'

/**
 * GET /api/products
 * Supported query params:
 * - search: matches against part name and OEM number
 * - brand / brands: single or multi-select (repeat key or comma-separated values)
 * - condition: filter by condition value (for example: used or new)
 * - sort: price ordering (price-asc or price-desc)
 *
 * Example:
 * /api/products?search=21197&brand=DAF&brand=MAN&condition=used&sort=price-desc
 */
export default defineEventHandler((event) => {
    const query = getQuery(event)
    return filterProductsByQuery(getProducts(), query)
})