<template>
  <div class="comment-item flex gap-3">
    <div class="img rounded-full"><img :src="`src/assets/img/users/user${comment.userId}.jpg`" class="w-full h-full" alt="user"></div>
    <div class="content flex flex-col gap-1.5">
      <div class="name text-base/3 font-semibold">{{ comment.userName }}</div>
      <div class="message text-sm/3 font-medium">{{ comment.message }}</div>
      <div class="date text-xs font-medium">{{ comment.date }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  comment: { type: Object }
});
</script>

<style lang="scss" scoped>
.comment-item {
  .img {
    width: 2.375rem;
    height: 2.375rem;
    img {
      border-radius: 50%;
    }
  }
}
</style>
