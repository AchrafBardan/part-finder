<script setup lang="ts">
import { ArrowLeft, Minus, Plus } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "~~/server/api/utils/products";
import { formatPrice } from "~/lib/price";
import { getHexFromColorName } from "~/lib/color";

const route = useRoute();
const id = computed(() => String(route.params.id ?? ""));

const {
  data: product,
  pending,
  error,
} = await useFetch<Product>(() => `/api/products/${id.value}`);

const { addToCart, cartLines } = useCart();

const selectedQuantity = ref(1);
const selectedColor = ref<string | undefined>(undefined);

watchEffect(() => {
  const colors = product.value?.colors ?? [];

  if (colors.length === 0) {
    selectedColor.value = undefined;
    return;
  }

  if (!selectedColor.value || !colors.includes(selectedColor.value)) {
    selectedColor.value = colors[0];
  }
});

const currentLine = computed(() =>
  cartLines.value.find(
    (line) =>
      line.product.id === product.value?.id &&
      (line.color ?? null) === (selectedColor.value ?? null),
  ),
);
const quantityInQuote = computed(() => currentLine.value?.quantity ?? 0);

function addCurrentProductToQuote() {
  if (!product.value || !product.value.inStock) {
    return;
  }

  addToCart(product.value, selectedQuantity.value, selectedColor.value);
}

function decreaseSelectedQuantity() {
  selectedQuantity.value = Math.max(1, selectedQuantity.value - 1);
}

function increaseSelectedQuantity() {
  selectedQuantity.value += 1;
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

          <div v-if="product.colors?.length" class="space-y-2">
            <p class="text-muted-foreground text-sm">Color</p>
            <Select v-model="selectedColor">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select color">
                  <div
                    v-if="selectedColor"
                    class="inline-block h-4 w-4 rounded-xs border"
                    :style="{
                      backgroundColor:
                        getHexFromColorName(selectedColor) ?? 'transparent',
                    }"
                  />
                  {{ selectedColor || "Select color" }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="color in product.colors"
                  :key="color"
                  :value="color"
                >
                  <div>
                    <span
                      class="inline-block h-4 w-4 rounded-xs border"
                      :style="{
                        backgroundColor:
                          getHexFromColorName(color) ?? 'transparent',
                      }"
                    />
                  </div>
                  {{ color }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div
              class="flex w-full items-center justify-between rounded-md border px-3 py-2 sm:w-32 sm:flex-none"
            >
              <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8 shrink-0"
                :disabled="selectedQuantity === 1"
                @click="decreaseSelectedQuantity"
              >
                <Minus class="h-4 w-4" />
                <span class="sr-only">Decrease quantity</span>
              </Button>

              <span class="min-w-8 text-center text-sm font-medium">
                {{ selectedQuantity }}
              </span>

              <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8 shrink-0"
                @click="increaseSelectedQuantity"
              >
                <Plus class="h-4 w-4" />
                <span class="sr-only">Increase quantity</span>
              </Button>
            </div>

            <Button
              class="w-full min-w-0 flex-1 h-12"
              :disabled="!product.inStock"
              @click="addCurrentProductToQuote"
            >
              {{ product.inStock ? "Add to quote list" : "Out of stock" }}
            </Button>
          </div>

          <p v-if="quantityInQuote > 0" class="text-muted-foreground text-sm">
            In your quote list{{ selectedColor ? ` (${selectedColor})` : "" }}:
            {{ quantityInQuote }}
          </p>
        </div>
      </div>
    </article>
  </section>
</template>
