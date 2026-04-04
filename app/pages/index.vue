<script setup lang="ts">
import ProductCard from "@/components/ProductCard/ProductCard.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { Product } from "~~/server/api/utils/products";

const search = ref("");
const selectedBrands = ref<string[]>([]);
const condition = ref("");
const sort = ref("price-desc");

const query = computed(() => {
  const cleanSearch = search.value.trim();

  return {
    ...(cleanSearch ? { search: cleanSearch } : {}),
    ...(selectedBrands.value.length > 0 ? { brand: selectedBrands.value } : {}),
    ...(condition.value ? { condition: condition.value } : {}),
    ...(sort.value ? { sort: sort.value } : {}),
  };
});

const {
  data: productsData,
  pending,
  error,
} = await useFetch<Product[]>("/api/products", {
  query,
  default: () => [],
});

const products = computed(() => productsData.value ?? []);

async function goToExactOemMatch() {
  const value = search.value.trim();
  if (!value) {
    return;
  }

  const normalizedValue = value.toLowerCase();

  const exactLoadedMatch = products.value.find(
    (product) => product.oem.toLowerCase() === normalizedValue,
  );
  if (exactLoadedMatch) {
    await navigateTo(`/products/${exactLoadedMatch.id}`);
    return;
  }

  try {
    const productsBySearch = await $fetch<Product[]>("/api/products", {
      query: { search: value },
    });
    const exactFetchedMatch = productsBySearch.find(
      (product) => product.oem.toLowerCase() === normalizedValue,
    );

    if (exactFetchedMatch) {
      await navigateTo(`/products/${exactFetchedMatch.id}`);
    }
  } catch {
    // Ignore fallback fetch errors and keep current search behavior.
  }
}

const availableBrands = computed(() => {
  const brands = new Set(products.value.map((product) => product.brand));
  return Array.from(brands).sort((left, right) => left.localeCompare(right));
});

const availableConditions = computed(() => {
  const conditions = new Set(
    products.value.map((product) => product.condition),
  );
  return Array.from(conditions).sort((left, right) =>
    left.localeCompare(right),
  );
});

function toggleBrand(brand: string, checked: boolean | "indeterminate") {
  if (checked === true) {
    if (!selectedBrands.value.includes(brand)) {
      selectedBrands.value = [...selectedBrands.value, brand];
    }
    return;
  }

  selectedBrands.value = selectedBrands.value.filter((item) => item !== brand);
}
</script>

<template>
  <main class="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6 md:py-8">
    <section
      class="relative overflow-hidden rounded-2xl border bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 p-5 text-white md:p-8"
    >
      <div
        class="pointer-events-none absolute -top-12 -right-10 h-40 w-40 rounded-full bg-amber-300/20 blur-2xl"
      />
      <div
        class="pointer-events-none absolute -bottom-14 left-6 h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl"
      />

      <div class="relative space-y-4">
        <div>
          <p class="text-xs font-medium tracking-wide text-white/70 uppercase">
            Truck Parts Search
          </p>
          <h1 class="mt-1 text-2xl font-bold md:text-3xl">
            Find parts by name or OEM number
          </h1>
        </div>

        <Input
          v-model="search"
          placeholder="Search by part name or OEM number"
          class="h-11 border-white/25 bg-white/10 text-white placeholder:text-white/70"
          @keydown.enter="goToExactOemMatch"
        />
      </div>
    </section>

    <section class="rounded-xl border bg-card p-4">
      <div class="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
        <div class="space-y-3">
          <p class="text-sm font-medium">Brand</p>
          <div class="flex flex-wrap gap-x-4 gap-y-2">
            <label
              v-for="brand in availableBrands"
              :key="brand"
              class="flex items-center gap-2 text-sm"
            >
              <Checkbox
                :model-value="selectedBrands.includes(brand)"
                @update:model-value="toggleBrand(brand, $event)"
              />
              <span>{{ brand }}</span>
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <label for="condition" class="text-sm font-medium">Condition</label>
          <Select id="condition" v-model="condition">
            <option value="">All conditions</option>
            <option
              v-for="item in availableConditions"
              :key="item"
              :value="item"
              class="capitalize"
            >
              {{ item }}
            </option>
          </Select>
        </div>

        <div class="space-y-2">
          <label for="sort" class="text-sm font-medium">Sort by price</label>
          <Select id="sort" v-model="sort">
            <option value="price-desc">High to low</option>
            <option value="price-asc">Low to high</option>
          </Select>
        </div>
      </div>
    </section>

    <section>
      <div
        v-if="pending"
        class="rounded-xl border bg-card p-10 text-center text-muted-foreground"
      >
        Loading products...
      </div>

      <div
        v-else-if="error"
        class="rounded-xl border border-destructive/50 bg-card p-10 text-center text-destructive"
      >
        Something went wrong while loading products.
      </div>

      <div
        v-else-if="products.length === 0"
        class="rounded-xl border bg-card p-10 text-center text-muted-foreground"
      >
        No products match your search and filters.
      </div>

      <div
        v-else
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </main>
</template>
