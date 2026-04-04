import { getProducts } from "../utils/products"

export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id')
    const product = getProducts().find(p => p.id === id)

    if (!product) {
        throw createError({
            statusCode: 404,
            message: 'Product not found'
        })
    }

    return product
})