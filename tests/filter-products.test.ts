import { describe, expect, it } from 'vitest'
import { filterProductsByQuery } from '~~/api/utils/filter-products'

const fixtureProducts = [
    {
        id: '1',
        name: 'DAF XF 106 Front Bumper',
        oem: '2119703',
        brand: 'DAF',
        condition: 'used',
        price: 1200,
        inStock: true,
        category: 'Body',
        image: 'https://example.com/1.jpg',
    },
    {
        id: '2',
        name: 'MAN TGX Mirror Housing',
        oem: 'MAN-8891',
        brand: 'MAN',
        condition: 'new',
        price: 450,
        inStock: true,
        category: 'Body',
        image: 'https://example.com/2.jpg',
    },
    {
        id: '3',
        name: 'Volvo FH Fog Lamp',
        oem: 'VOL-7788',
        brand: 'Volvo',
        condition: 'used',
        price: 180,
        inStock: true,
        category: 'Lighting',
        image: 'https://example.com/3.jpg',
    },
]

describe('filterProductsByQuery', () => {
    it('returns all products when no query is provided', () => {
        const results = filterProductsByQuery(fixtureProducts, {})
        expect(results).toHaveLength(3)
    })

    it('matches search on part name', () => {
        const results = filterProductsByQuery(fixtureProducts, { search: 'mirror' })
        expect(results.map(product => product.id)).toEqual(['2'])
    })

    it('matches search on OEM number', () => {
        const results = filterProductsByQuery(fixtureProducts, { search: '2119703' })
        expect(results.map(product => product.id)).toEqual(['1'])
    })

    it('filters by single brand', () => {
        const results = filterProductsByQuery(fixtureProducts, { brand: 'MAN' })
        expect(results.map(product => product.id)).toEqual(['2'])
    })

    it('filters by multiple brands via comma-separated query', () => {
        const results = filterProductsByQuery(fixtureProducts, { brand: 'DAF,Volvo' })
        expect(results.map(product => product.id)).toEqual(['1', '3'])
    })

    it('filters by multiple brands via repeated query keys', () => {
        const results = filterProductsByQuery(fixtureProducts, { brand: ['DAF', 'MAN'] })
        expect(results.map(product => product.id)).toEqual(['1', '2'])
    })

    it('filters by condition', () => {
        const results = filterProductsByQuery(fixtureProducts, { condition: 'new' })
        expect(results.map(product => product.id)).toEqual(['2'])
    })

    it('sorts by price ascending', () => {
        const results = filterProductsByQuery(fixtureProducts, { sort: 'price-asc' })
        expect(results.map(product => product.price)).toEqual([180, 450, 1200])
    })

    it('sorts by price descending', () => {
        const results = filterProductsByQuery(fixtureProducts, { sort: 'price-desc' })
        expect(results.map(product => product.price)).toEqual([1200, 450, 180])
    })

    it('supports combined filters and sorting', () => {
        const results = filterProductsByQuery(fixtureProducts, {
            search: 'f',
            brand: ['DAF', 'Volvo'],
            condition: 'used',
            sort: 'price-asc',
        })

        expect(results.map(product => product.id)).toEqual(['3', '1'])
    })
})
