<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "~~/server/api/utils/products";

const route = useRoute();
const id = computed(() => String(route.params.id ?? ""));

const {
  data: product,
  pending,
  error,
} = await useFetch<Product>(() => `/api/products/${id.value}`);

const { addToCart, cartLines } = useCart();

const currentLine = computed(() =>
  cartLines.value.find((line) => line.product.id === product.value?.id),
);
const quantityInQuote = computed(() => currentLine.value?.quantity ?? 0);

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function addCurrentProductToQuote() {
  if (!product.value || !product.value.inStock) {
    return;
  }

  addToCart(product.value);
}
</script>

<template>
  <section class="space-y-6">
    <NuxtLink
      to="/"
      class="text-muted-foreground inline-flex items-center gap-2 text-sm transition hover:text-foreground"
    >
      <ArrowLeft class="h-4 w-4" />
      Back to products
    </NuxtLink>

    <div
      v-if="pending"
      class="rounded-xl border bg-card p-10 text-center text-muted-foreground"
    >
      Loading product details...
    </div>

    <div
      v-else-if="error || !product"
      class="rounded-xl border border-destructive/50 bg-card p-10 text-center"
    >
      <p class="font-medium text-destructive">Product not found.</p>
      <p class="text-muted-foreground mt-2 text-sm">
        This part may have been removed or the link is incorrect.
      </p>
      <NuxtLink to="/" class="mt-5 inline-flex">
        <Button variant="outline" size="sm">Return to catalog</Button>
      </NuxtLink>
    </div>

    <article
      v-else
      class="grid gap-6 rounded-2xl border bg-card p-4 sm:p-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8"
    >
      <div class="overflow-hidden rounded-xl border bg-muted">
        <img
          :src="product.image"
          :alt="product.name"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="space-y-5">
        <div class="space-y-2">
          <p class="text-muted-foreground text-sm">OEM: {{ product.oem }}</p>
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
            {{ product.name }}
          </h1>
          <div class="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{{ product.brand }}</Badge>
            <Badge variant="outline" class="capitalize">{{
              product.condition
            }}</Badge>
            <Badge :variant="product.inStock ? 'success' : 'destructive'">
              {{ product.inStock ? "In stock" : "Out of stock" }}
            </Badge>
          </div>
        </div>

        <div
          class="grid gap-3 rounded-xl border bg-muted/40 p-4 text-sm sm:grid-cols-2"
        >
          <div>
            <p class="text-muted-foreground">Category</p>
            <p class="font-medium">{{ product.category }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Part ID</p>
            <p class="font-medium">{{ product.id }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Condition</p>
            <p class="font-medium capitalize">{{ product.condition }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Brand</p>
            <p class="font-medium">{{ product.brand }}</p>
          </div>
        </div>

        <div class="space-y-4 rounded-xl border p-4">
          <div class="flex items-end justify-between gap-3">
            <p class="text-muted-foreground text-sm">Unit price</p>
            <p class="text-2xl font-bold">{{ formatPrice(product.price) }}</p>
          </div>

          <Button
            class="w-full"
            :disabled="!product.inStock"
            @click="addCurrentProductToQuote"
          >
            {{ product.inStock ? "Add to quote list" : "Out of stock" }}
          </Button>

          <p v-if="quantityInQuote > 0" class="text-muted-foreground text-sm">
            In your quote list: {{ quantityInQuote }}
          </p>
        </div>
      </div>
    </article>
  </section>
</template>
