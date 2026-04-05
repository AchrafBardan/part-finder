<script setup lang="ts">
import { toRef } from "vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHexFromColorName } from "~/lib/color";
import { formatPrice } from "~/lib/price";
import type { Product } from "~~/server/api/utils/products";

const props = defineProps<{
  product: Product;
}>();

const product = toRef(props, "product");

const previewColors = computed(() => product.value.colors ?? []);
const visibleColors = computed(() => previewColors.value.slice(0, 4));
const remainingColors = computed(() =>
  Math.max(0, previewColors.value.length - visibleColors.value.length),
);
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

        <div
          v-if="previewColors.length"
          class="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2"
        >
          <p
            class="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
          >
            Colors
          </p>

          <div class="flex items-center gap-1.5">
            <span
              v-for="color in visibleColors"
              :key="color"
              class="h-6 w-6 rounded-full border border-gray shadow-sm ring-1 ring-background"
              :title="color"
              :style="{
                backgroundColor: getHexFromColorName(color) ?? '#D1D5DB',
              }"
            />
            <span
              v-if="remainingColors > 0"
              class="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-card bg-background px-1.5 text-[10px] font-semibold text-muted-foreground shadow-sm ring-1 ring-background"
            >
              +{{ remainingColors }}
            </span>
          </div>
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
