<template>
  <div class="search-empty w-full h-full flex items-center justify-center">
    <div class="search-empty-wrapper flex flex-col gap-2.5 items-center p-5">
      <img src="@/assets/img/svg/search-empty.svg" alt="search-empty">
      <div class="group flex flex-col gap-1 text-center">
        <div class="title text-sm/3.5 font-medium">Поиск не дал результатов</div>
        <div class="sub-title text-xs/5 font-medium">Повторите поиск или используйте фильтр для структуризации контента</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.search-empty-wrapper {
  max-width: 20.4375rem;
}

.title {
  color: #7E8299;
}

.sub-title{ 
  color: #A1A5B7;
}
</style>
