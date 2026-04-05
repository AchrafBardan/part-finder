<script setup lang="ts">
import { Minus, Plus, Trash2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import type { CartLine as CartLineType } from "@/composables/useCart";
import { formatPrice } from "~/lib/price";

const props = defineProps<{
  line: CartLineType;
}>();

const lineTotal = computed(
  () => props.line.product.price * props.line.quantity,
);

const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
</script>

<template>
  <div class="flex items-center justify-between rounded-md border p-3">
    <div class="min-w-0 flex-1">
      <p class="truncate font-medium">{{ line.product.name }}</p>
      <p v-if="line.color" class="text-muted-foreground text-sm">
        Color: {{ line.color }}
      </p>
      <p class="text-muted-foreground text-sm">{{ line.product.brand }}</p>
      <p class="text-sm font-semibold">{{ formatPrice(lineTotal) }}</p>
    </div>

    <div class="ml-4 flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        @click="decreaseQuantity(line.product.id, line.color)"
      >
        <Minus class="h-4 w-4" />
        <span class="sr-only">Decrease quantity</span>
      </Button>

      <span class="w-6 text-center text-sm font-medium">{{
        line.quantity
      }}</span>

      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        @click="increaseQuantity(line.product.id, line.color)"
      >
        <Plus class="h-4 w-4" />
        <span class="sr-only">Increase quantity</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        @click="removeFromCart(line.product.id, line.color)"
      >
        <Trash2 class="h-4 w-4" />
        <span class="sr-only">Remove item</span>
      </Button>
    </div>
  </div>
</template>
