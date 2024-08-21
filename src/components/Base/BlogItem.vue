<template>
  <div class="blog-item flex flex-col gap-2.5">
    <img :src="`src/assets/img/images/${blog.img}.png`" alt="" class="cursor-pointer" @click="$emit('openBlog', blog)">
    <BlogInfo :created-at="blog.createdAt" :comments="blog.comments.length" />
    <h3 class="title text-xl/5 leading-6 font-semibold" >{{ blog.title }}</h3>
    <h5 class="description text-base/4 leading-6">{{ blog.description }}</h5>
    <Tags class="gap-2.5 mt-auto" :tags="blog.tags" :tag-class="'text-sm'"/>
  </div>
</template>

<script setup>
import Tags from '@/components/Base/Tags.vue';
import BlogInfo from '@/components/Base/BlogInfo.vue';

const props = defineProps({
  blog: { type: Object }
});
</script>

<style lang="scss" scoped>
.blog-item {
  img {
    width: 100%;
    min-width: 325px;
  }
}
</style>
