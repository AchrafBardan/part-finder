<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

defineProps<{
  class?: HTMLAttributes["class"];
  modelValue?: string;
  type?: string;
  placeholder?: string;
  id?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    data-slot="input"
    :id="id"
    :type="type ?? 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    :class="
      cn(
        'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        $props.class,
      )
    "
    @input="onInput"
  />
</template>
