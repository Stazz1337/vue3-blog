<template>
  <div class="search px-2.5 flex gap-2.5 w-full items-center rounded-md h-10">
    <i class="icon icon-search text-sm"></i>
    <input 
      class="w-full bg-transparent" 
      type="text" 
      :value="modelValue" 
      @input="updateValue($event.target.value)"
      placeholder="Поиск"
    >
    <i 
      class="icon icon-cross-x text-sm cursor-pointer" 
      v-show="modelValue !== ''" 
      @click="clearValue"
    ></i>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'enter']);

const updateValue = (value) => {
  emit('update:modelValue', value);
};

const clearValue = () => {
  emit('update:modelValue', '');
};
</script>

<style lang="scss" scoped>
.search {
  background-color: #F9F9F9;

  input {
    &::placeholder {
      color: #D8D8E5;
    }
    &:focus-visible {
      outline: 0;
    }
  }
}
</style>
