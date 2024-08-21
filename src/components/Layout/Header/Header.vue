<template>
  <header class="header w-full flex fixed left-0 top-0 z-20 h-20 lg:h-16 items-center" :class="{'border-b-2': showBurgerMenu}">
    <div class="container-wr">
      <div class="group flex gap-4 lg:justify-between lg:gap-2 items-center">
        <BurgerButton class="lg:hidden" v-model="showBurgerMenu" />
        <img
          src="@/assets/img/svg/logo.svg"
          alt="logo"
          class="logo cursor-pointer"
          @click="router.push('/')"
        >
        <nav
          class="menu gap-x-5 gap-y-2 flex fixed left-0 top-20 h-full w-full p-4 bg-black flex-col -translate-x-full ease-in-out duration-500 transition-translate-x lg:flex lg:static lg:h-auto lg:p-0 lg:bg-none lg:w-auto lg:flex-row lg:translate-x-0"
          :class="{'active': showBurgerMenu}"
        >
          <a class="menu-item text-base/4 py-2 px-3.5 rounded-md cursor-pointer font-semibold"
           :class="{ 'active': isActive(item.link) }"
           @click="pushAndCloseBurger(item.link)"
           v-for="item in menu" :key="item.key">{{ item.name }}</a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BurgerButton from '@/components/Layout/Header/BurgerButton.vue';

const router = useRouter();
const route = useRoute();

const menu = [
  { name: 'Главная', key: 'home', link: '' },
  { name: 'Блог', key: 'blog', link: 'blog' },
];
const showBurgerMenu = ref(false);

const isActive = (link) => {
  return route.path === `/${link}`;
}

const pushAndCloseBurger = (link) => {
  router.push('/' + link);
  showBurgerMenu.value = false
};
</script>

<style lang="scss" scoped>
.header {
  padding: 0.9375rem 1.875rem;
  background-color: #000000;

  .group {
    width: 100%;
    max-width: 25.5625rem;

    .menu {
      &.active {
        transform: translateX(0);
      }
      &-item {
        color: #F9F9F9;
        background: transparent;
        &.active {
          color: #3E97FF;
          background: #FFFFFF1A;
        }
      }
    }
  }
}
</style>