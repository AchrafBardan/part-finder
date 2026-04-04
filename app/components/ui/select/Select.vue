<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";

defineProps<{
  class?: HTMLAttributes["class"];
  modelValue?: string;
  id?: string;
  name?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function onChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLSelectElement).value);
}
</script>

<template>
  <div class="relative">
    <select
      data-slot="select"
      :id="id"
      :name="name"
      :value="modelValue"
      :class="
        cn(
          'h-9 w-full appearance-none rounded-md border border-input bg-background px-3 pr-8 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          $props.class,
        )
      "
      @change="onChange"
    >
      <slot />
    </select>
    <ChevronDown
      class="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
    />
  </div>
</template>
