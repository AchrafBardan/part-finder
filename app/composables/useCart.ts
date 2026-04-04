import { useLocalStorage } from "@vueuse/core";
import type { Product } from "~~/server/api/utils/products";

export type CartLine = {
    product: Product
    quantity: number
}

export function useCart() {
    const store = useLocalStorage<CartLine[]>(
        'cart',
        []
    )

    function addToCart(product: Product, quantity = 1) {
        const existingLine = store.value.find(line => line.product.id === product.id)

        if (existingLine) {
            existingLine.quantity += quantity
        } else {
            store.value.push({ product, quantity })
        }
    }

    function removeFromCart(productId: string) {
        store.value = store.value.filter(line => line.product.id !== productId)
    }

    function increaseQuantity(productId: string) {
        const line = store.value.find(line => line.product.id === productId)
        if (line) {
            line.quantity++
        }
    }

    function decreaseQuantity(productId: string) {
        const line = store.value.find(line => line.product.id === productId)
        if (line) {
            line.quantity--
            if (line.quantity <= 0) {
                removeFromCart(productId)
            }
        }
    }

    function clearCart() {
        store.value = []
    }

    return {
        cartLines: store,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity
    }
}