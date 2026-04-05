import products from '~/data/products.json'

export type Product = {
    id: string
    name: string
    oem: string
    brand: string
    condition: string
    price: number
    inStock: boolean
    category: string
    image: string
    colors?: string[]
}

export function getProducts(): Product[] {
    return products;
}