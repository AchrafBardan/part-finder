import { beforeAll, describe, expect, it } from 'vitest'
import { getProducts } from '~~/api/utils/products'

type TestEvent = {
    query?: Record<string, unknown>
    context?: {
        params?: Record<string, string>
    }
}

beforeAll(() => {
    ; (globalThis as any).defineEventHandler = (handler: unknown) => handler
        ; (globalThis as any).getQuery = (event: TestEvent) => event.query ?? {}
        ; (globalThis as any).getRouterParam = (event: TestEvent, key: string) => event.context?.params?.[key]
        ; (globalThis as any).createError = ({ statusCode, message }: { statusCode: number; message: string }) => {
            const error = new Error(message) as Error & { statusCode: number }
            error.statusCode = statusCode
            return error
        }
})

async function loadIndexHandler() {
    const mod = await import('~~/api/products/index')
    return mod.default as (event: TestEvent) => ReturnType<typeof getProducts>
}

async function loadByIdHandler() {
    const mod = await import('~~/api/products/[id]')
    return mod.default as (event: TestEvent) => ReturnType<typeof getProducts>[number]
}

describe('GET /api/products', () => {
    it('returns all products when query is empty', async () => {
        const handler = await loadIndexHandler()
        const results = handler({ query: {} })

        expect(results).toHaveLength(getProducts().length)
    })

    it('applies search, filters, and sorting from query', async () => {
        const handler = await loadIndexHandler()
        const results = handler({
            query: {
                search: 'DAF XF 106',
                brand: 'DAF',
                condition: 'used',
                sort: 'price-asc',
            },
        })

        expect(results.length).toBeGreaterThan(0)
        expect(results.every(product => product.brand === 'DAF')).toBe(true)
        expect(results.every(product => product.condition === 'used')).toBe(true)

        const prices = results.map(product => product.price)
        const sorted = [...prices].sort((a, b) => a - b)
        expect(prices).toEqual(sorted)
    })
})

describe('GET /api/products/[id]', () => {
    it('returns a product for an existing id', async () => {
        const handler = await loadByIdHandler()
        const expected = getProducts()[0]

        const product = handler({
            context: {
                params: {
                    id: expected.id,
                },
            },
        })

        expect(product.id).toBe(expected.id)
        expect(product.name).toBe(expected.name)
    })

    it('throws a 404 error for a missing id', async () => {
        const handler = await loadByIdHandler()

        try {
            handler({
                context: {
                    params: {
                        id: 'missing-id',
                    },
                },
            })
            throw new Error('Expected handler to throw for missing id')
        }
        catch (error) {
            const typedError = error as Error & { statusCode?: number }
            expect(typedError.message).toBe('Product not found')
            expect(typedError.statusCode).toBe(404)
        }
    })
})
