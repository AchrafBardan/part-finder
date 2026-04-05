import { useLocalStorage } from "@vueuse/core";
import type { Product } from "~~/server/api/utils/products";

export type CartLine = {
    product: Product
    quantity: number
    color?: string
}

function isSameVariant(line: CartLine, productId: string, color?: string) {
    return line.product.id === productId && (line.color ?? null) === (color ?? null)
}

export function useCart() {
    const store = useLocalStorage<CartLine[]>(
        'cart',
        []
    )

    function addToCart(product: Product, quantity = 1, color?: string) {
        const existingLine = store.value.find(line => isSameVariant(line, product.id, color))

        if (existingLine) {
            existingLine.quantity += quantity
        } else {
            store.value.push({ product, quantity, color })
        }
    }

    function removeFromCart(productId: string, color?: string) {
        store.value = store.value.filter(line => !isSameVariant(line, productId, color))
    }

    function increaseQuantity(productId: string, color?: string) {
        const line = store.value.find(line => isSameVariant(line, productId, color))
        if (line) {
            line.quantity++
        }
    }

    function decreaseQuantity(productId: string, color?: string) {
        const line = store.value.find(line => isSameVariant(line, productId, color))
        if (line) {
            if (line.quantity <= 1) {
                return;
            }
            line.quantity--
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