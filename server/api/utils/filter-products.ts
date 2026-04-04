import type { Product } from "./products"

type QueryValue = string | string[] | null | undefined

type ProductQuery = {
    search?: QueryValue
    brand?: QueryValue
    brands?: QueryValue
    condition?: QueryValue
    sort?: QueryValue
}

type SortOrder = 'price-asc' | 'price-desc'

function toArray(value: QueryValue) {
    if (!value) {
        return []
    }

    const values = Array.isArray(value) ? value : [value]

    return values
        .flatMap(item => item.split(','))
        .map(item => item.trim())
        .filter(Boolean)
}

export function filterProductsByQuery(sourceProducts: Product[], query: ProductQuery) {
    const search = typeof query.search === 'string' ? query.search.trim().toLowerCase() : ''
    const brands = toArray(query.brand ?? query.brands).map(item => item.toLowerCase())
    const conditions = toArray(query.condition).map(item => item.toLowerCase())
    const sort = (typeof query.sort === 'string' ? query.sort : '') as SortOrder

    const filteredProducts = sourceProducts.filter((product) => {
        const matchesSearch =
            !search ||
            product.name.toLowerCase().includes(search) ||
            product.oem.toLowerCase().includes(search)

        const matchesBrand =
            brands.length === 0 || brands.includes(product.brand.toLowerCase())

        const matchesCondition =
            conditions.length === 0 || conditions.includes(product.condition.toLowerCase())

        return matchesSearch && matchesBrand && matchesCondition
    })

    filteredProducts.sort((left, right) => {
        if (sort === 'price-asc') {
            return left.price - right.price
        }

        if (sort === 'price-desc') {
            return right.price - left.price
        }

        return 0
    })

    return filteredProducts
}
