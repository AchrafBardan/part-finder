<template>
  <div class="min-h-screen bg-slate-50">
    <header
      class="relative overflow-hidden border-b border-slate-200 bg-linear-to-br from-white via-cyan-50 to-amber-50 text-slate-900 shadow-sm"
    >
      <div class="pointer-events-none absolute inset-0">
        <div
          class="absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl"
        />
        <div
          class="absolute -right-16 top-8 h-52 w-52 rounded-full bg-amber-300/20 blur-3xl"
        />
      </div>

      <div
        class="relative mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        <div class="flex items-center justify-between gap-4">
          <NuxtLink to="/" class="group inline-flex items-center gap-3">
            <div
              class="rounded-lg border border-cyan-200 bg-white px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 shadow-sm"
            >
              PF
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-slate-900">
                Part Finder
              </h1>
              <p class="text-xs text-slate-600">
                OEM and aftermarket parts, all in one place
              </p>
            </div>
          </NuxtLink>

          <Cart />
        </div>

        <nav class="flex items-center gap-2">
          <NuxtLink
            to="/"
            class="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Browse Parts
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Cart from "~/components/Cart/Cart.vue";
</script>

<style></style>
