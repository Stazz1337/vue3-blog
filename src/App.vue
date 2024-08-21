<template>
  <div class="main">
    <Header />

    <div class="main-content flex justify-center mt-20 lg:mt-16">
      <router-view/>  
    </div>

  </div>
</template>

<script setup>
import Header from '@/components/Layout/Header/Header.vue';

</script>

<style lang="scss" scoped></style>
