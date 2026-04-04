<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "~~/server/api/utils/products";

const props = defineProps<{
  product: Product;
}>();

const { addToCart } = useCart();

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
</script>

<template>
  <article
    class="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs transition hover:shadow-md"
  >
    <div class="aspect-4/3 overflow-hidden bg-muted">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>

    <div class="flex flex-1 flex-col space-y-3 p-4">
      <div class="space-y-1">
        <h3 class="line-clamp-2 text-sm font-semibold md:text-base">
          {{ product.name }}
        </h3>
        <p class="text-muted-foreground text-xs">OEM: {{ product.oem }}</p>
      </div>

      <div class="mt-auto space-y-3">
        <div class="flex items-center justify-between gap-2 text-sm">
          <span class="text-muted-foreground">Brand</span>
          <span class="font-medium">{{ product.brand }}</span>
        </div>

        <div class="flex items-center gap-2">
          <Badge variant="outline" class="capitalize">{{
            product.condition
          }}</Badge>
          <Badge :variant="product.inStock ? 'success' : 'destructive'">
            {{ product.inStock ? "In stock" : "Out of stock" }}
          </Badge>
        </div>

        <div class="flex items-center justify-between pt-1">
          <p class="text-lg font-bold">{{ formatPrice(product.price) }}</p>
          <NuxtLink :to="`/products/${product.id}`">
            <Button size="sm"> Details </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>
