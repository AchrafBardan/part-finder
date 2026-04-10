# Parts Finder

A modern B2B parts catalog and quote builder application designed for mechanics and workshops to quickly locate and compile parts for quotation.

## Overview

Parts Finder is a Nuxt 4 + Vue 3 application that simplifies the parts sourcing workflow. Users can search, filter, and sort through a comprehensive parts catalog, view detailed information, and build quote lists that persist across sessions.

## Features

### ✅ Core Features Implemented

- **Parts Overview Page**: Grid/list display of parts with essential information
  - Part name, OEM number, brand, condition, price
  - Stock indicator
  - Card-based responsive layout

- **Advanced Search & Filtering**
  - Search by part name or OEM number
  - Multi-select brand filter
  - Condition filter (new/used)
  - Price sorting (low to high / high to low)

- **Product Detail Page**
  - Extended part information
  - Larger product imagery
  - Add to Quote functionality

- **Quote List Management**
  - Drawer/sidebar interface for active quotes
  - Remove individual items from quote
  - **Persistent storage** using localStorage
  - Real-time quote totaling

- **Fully Responsive Design** built with Tailwind CSS

### 🎁 Bonus Features

- Color badge indicator for multi-color parts
- Color selection dropdown on detail page with visual UI feedback
- Comprehensive E2E test coverage with Cypress
- Unit tests with Vitest

## Tech Stack

- **Frontend Framework**: Nuxt 4, Vue 3
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-nuxt (Reka UI)
- **Testing**: Cypress (E2E), Vitest (Unit tests)
- **Icons**: Lucide Vue
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ (uses pnpm as package manager)
- pnpm 10.32.1+

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

Start the development server at `http://localhost:3000`:

```bash
pnpm dev
```

The application will hot-reload as you make changes.

## Usage Guide

### Browsing Parts

1. **Homepage**: View all available parts in a responsive grid layout
2. **Search**: Use the search box to find parts by name or OEM number
3. **Filter**:
   - Click brand filters to narrow results by manufacturer
   - Select condition (new/used) to filter parts
4. **Sort**: Use the sort dropdown to order by price (ascending/descending)

### Finding & Adding Parts to Quote

1. **Browse**: Scroll through the filtered results
2. **View Details**: Click a part card to see full details
3. **Select Options**:
   - Choose a color variant (if available) from the color dropdown
   - See visual feedback of selected color in the UI
4. **Add to Quote**: Click "Add to Quote" button
5. **Review Quote**: The quote drawer opens automatically showing items added

### Managing Your Quote

- **Open Quote**: Click the quote icon in the header or the quote drawer button
- **View Total**: See the calculated total price at the bottom of the quote
- **Remove Items**: Click the delete button next to any item
- **Persistence**: Your quote list automatically saves to browser localStorage and persists across sessions

## Project Structure

```
app/
├── components/          # Vue components
│   ├── Cart/           # Quote management components
│   ├── ProductCard/    # Product display component
│   └── ui/             # Reusable UI components (shadcn-nuxt)
├── composables/        # Vue composables (useCart for quote logic)
├── data/               # Mock data (products.json)
├── layouts/            # Nuxt layouts
├── lib/                # Utility functions
├── pages/              # Route pages
│   ├── index.vue       # Homepage
│   └── products/[id].vue  # Product detail page
└── assets/             # Stylesheets

server/
├── api/
│   ├── products/       # API endpoints
│   │   ├── index.ts    # List all products
│   │   └── [id].ts     # Get single product
│   └── utils/

tests/                  # Unit tests (Vitest)
cypress/
├── e2e/                # End-to-end tests
└── fixtures/           # Test data
```

## Running Tests

### Unit Tests

```bash
# Run tests once
pnpm run test:watch

# Watch mode
pnpm run test:watch
```

### End-to-End Tests

```bash
# Open Cypress test runner (interactive)
pnpm run cypress:open

# Run Cypress tests headless
pnpm run cypress:run

# Run dev server and Cypress tests together
pnpm run e2e
```

## API Specification

### Get All Products

**Endpoint**: `GET /api/products`

**Response**:

```json
[
  {
    "id": "2119711",
    "name": "DAF XF 106 Sideskirt set",
    "oem": "2119711",
    "brand": "DAF",
    "condition": "used",
    "price": 795,
    "inStock": true,
    "category": "Body",
    "image": "/img/placeholder-part.png",
    "colors": ["silver", "black"]
  }
]
```

### Get Single Product

**Endpoint**: `GET /api/products/:id`

**Response**: Same as above (single object)

## Key Implementation Details

### Quote Management (useCart Composable)

The `useCart.ts` composable handles:

- Adding/removing items from quote
- Calculating totals
- Managing localStorage persistence
- Reactive state management

### Search & Filter Logic

Implemented in `server/api/utils/filter-products.ts`:

- Supports partial name/OEM matching
- Multi-select brand filtering
- Condition filtering
- Sorting by price

### Responsive Design

All components built with Tailwind CSS using:

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interaction targets
- Drawer UI adapts to screen size

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- localStorage support for quote persistence

## Development Workflow

1. **Start dev server**: `pnpm dev`
2. **Make changes** to components/pages
3. **Open Cypress** in another terminal: `pnpm run cypress:open`
4. **Run unit tests** as needed: `pnpm run test:watch`
5. **Commit** changes with descriptive messages

## Notes for Reviewers

- The application uses a mock API (`/api/products`) - no real backend required
- UI Library: shadcn-nuxt provides accessible, unstyled components that we've customized with Tailwind
- Quote persistence uses browser localStorage - no server-side session needed
- All interactive features are fully tested with E2E tests
- The design is production-ready and fully responsive

---

For more information about Nuxt, check out the [official documentation](https://nuxt.com/docs/getting-started/introduction).
