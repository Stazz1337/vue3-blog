<template>
  <button class="burger-btn flex" :class="{'active': isOpen}" @click="toggleBurger">
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue;
});

const toggleBurger = () => {
  isOpen.value = !isOpen.value;
  emit('update:modelValue', isOpen.value);
};
</script>

<style lang="scss" scoped>
.burger-btn{
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  
  z-index: 10;
}

.burger-btn span{
  width: 100%;
  border: 1px solid #FFFFFF;
  border-radius: 2px;
  background-color: #FFFFFF;

}
.burger-btn span:not(:last-of-type){
  margin-bottom: 6px;
}


.burger-btn span:nth-of-type(1){
  transform-origin: left;
  align-self: flex-start;

  transition: transform 0.2s linear, width 0.2s 0.2s linear;
}
.burger-btn span:nth-of-type(2){
  transform-origin: center;
  align-self: center;
  opacity: 0.3;
  transition: transform 0.2s 0.2s linear;
}
.burger-btn span:nth-of-type(3){
  transform-origin: right;
  align-self: flex-end;
  opacity: 0.3;
  transition: transform 0.2s linear, width 0.2s 0.2s linear;
}

.burger-btn.active span:nth-of-type(1){
  width: 35%;
  transform: rotate(45deg) translateY(-2px);
  transition: width 0.2s linear, transform 0.2s 0.2s linear;
  
}
.burger-btn.active span:nth-of-type(2){
  transform: rotate(-45deg);
  opacity: 1;
}
.burger-btn.active span:nth-of-type(3){
  width: 35%;
  transform: rotate(45deg) translateY(2px);
  opacity: 1;
  transition: width 0.2s linear, transform 0.2s 0.2s linear;
}
</style>
