import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { CartLine } from '../app/composables/useCart'

const cartStore = vi.hoisted(() => ({ value: [] as CartLine[] }))

vi.mock('@vueuse/core', () => ({
    useLocalStorage: vi.fn(() => cartStore),
}))

import { useCart } from '../app/composables/useCart'

const productA = {
    id: 'part-1',
    name: 'Front Bumper',
    oem: 'OEM-100',
    brand: 'DAF',
    condition: 'used',
    price: 1200,
    inStock: true,
    category: 'Body',
    image: 'https://example.com/part-1.jpg',
}

const productB = {
    id: 'part-2',
    name: 'Mirror Housing',
    oem: 'OEM-200',
    brand: 'MAN',
    condition: 'new',
    price: 450,
    inStock: true,
    category: 'Body',
    image: 'https://example.com/part-2.jpg',
}

describe('useCart', () => {
    beforeEach(() => {
        cartStore.value = []
    })

    it('starts with an empty cart', () => {
        const { cartLines } = useCart()

        expect(cartLines.value).toEqual([])
    })

    it('adds a new product to the cart', () => {
        const { addToCart, cartLines } = useCart()

        addToCart(productA)

        expect(cartLines.value).toEqual([
            { product: productA, quantity: 1 },
        ])
    })

    it('increments the quantity when the same product is added again', () => {
        const { addToCart, cartLines } = useCart()

        addToCart(productA)
        addToCart(productA, 2)

        expect(cartLines.value).toEqual([
            { product: productA, quantity: 3 },
        ])
    })

    it('keeps separate lines for different products', () => {
        const { addToCart, cartLines } = useCart()

        addToCart(productA)
        addToCart(productB, 2)

        expect(cartLines.value).toEqual([
            { product: productA, quantity: 1 },
            { product: productB, quantity: 2 },
        ])
    })

    it('increases quantity for a product in the cart', () => {
        const { addToCart, increaseQuantity, cartLines } = useCart()

        addToCart(productA)
        increaseQuantity(productA.id)

        expect(cartLines.value).toEqual([
            { product: productA, quantity: 2 },
        ])
    })

    it('decreases quantity and removes the line when it reaches zero', () => {
        const { addToCart, decreaseQuantity, cartLines } = useCart()

        addToCart(productA, 2)
        decreaseQuantity(productA.id)

        expect(cartLines.value).toEqual([
            { product: productA, quantity: 1 },
        ])

        decreaseQuantity(productA.id)

        expect(cartLines.value).toEqual([])
    })

    it('removes a product by id', () => {
        const { addToCart, removeFromCart, cartLines } = useCart()

        addToCart(productA)
        addToCart(productB)
        removeFromCart(productA.id)

        expect(cartLines.value).toEqual([
            { product: productB, quantity: 1 },
        ])
    })

    it('clears the cart', () => {
        const { addToCart, clearCart, cartLines } = useCart()

        addToCart(productA)
        addToCart(productB)
        clearCart()

        expect(cartLines.value).toEqual([])
    })
})
