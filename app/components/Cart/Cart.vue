<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CartLine from "@/components/Cart/CartLine.vue";
import { formatPrice } from "~/lib/price";

const { cartLines, clearCart } = useCart();

const itemCount = computed(() =>
  cartLines.value.reduce((count, line) => count + line.quantity, 0),
);
const subtotal = computed(() =>
  cartLines.value.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  ),
);
const total = computed(() => subtotal.value);

function printQuote() {
  window.print();
}
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">Quote ({{ itemCount }})</Button>
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full max-w-xl">
        <DrawerHeader>
          <DrawerTitle>Your Quote</DrawerTitle>
          <DrawerDescription>
            {{ itemCount }} item{{ itemCount === 1 ? "" : "s" }} in your cart.
          </DrawerDescription>
        </DrawerHeader>
        <div class="p-4">
          <div
            v-if="cartLines.length === 0"
            class="text-muted-foreground py-8 text-center"
          >
            Your list is empty.
          </div>

          <div v-else class="space-y-4">
            <div class="space-y-2">
              <CartLine
                v-for="line in cartLines"
                :key="`${line.product.id}-${line.color ?? 'default'}`"
                :line="line"
              />
            </div>

            <div class="rounded-md border p-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">Subtotal</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div
                class="mt-3 flex items-center justify-between border-t pt-3 font-semibold"
              >
                <span>Total</span>
                <span>{{ formatPrice(total) }}</span>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button :disabled="cartLines.length === 0" @click="printQuote">
            Print quote
          </Button>
          <Button
            variant="outline"
            :disabled="cartLines.length === 0"
            @click="clearCart"
          >
            Clear list
          </Button>
          <DrawerClose as-child>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>

<style scoped>
@media print {
  :deep(button),
  :deep([role="button"]),
  :deep(input[type="button"]),
  :deep(input[type="submit"]),
  :deep(input[type="reset"]) {
    display: none !important;
  }
}
</style>
