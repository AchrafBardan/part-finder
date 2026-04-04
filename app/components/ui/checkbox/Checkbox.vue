<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Check } from "lucide-vue-next";
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui";
import { computed } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<
  CheckboxRootProps & {
    class?: HTMLAttributes["class"];
  }
>();

const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...rest } = props;
  return rest;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn(
        'peer h-4 w-4 shrink-0 rounded-lg border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        props.class,
      )
    "
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <Check class="h-3.5 w-3.5" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
