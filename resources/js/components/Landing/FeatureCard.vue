<template>
  <div class="feature-card p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300" 
       data-aos="fade-up" 
       :data-aos-delay="delay">
    <div class="mb-6 relative">
      <img :src="image" 
           :alt="title" 
           class="w-full h-48 object-cover rounded-lg mb-6">
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-4 rounded-full">
        <component 
          :is="resolveIcon" 
          class="w-6 h-6 text-purple-600"
          :stroke-width="1.5"
          fill="currentColor"
        />
      </div>
    </div>
    <h3 class="text-xl font-display font-bold my-3">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
import * as icons from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  }
});

const resolveIcon = computed(() => {
  return icons[props.icon];
});
</script>

<style scoped>
.feature-card {
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
  backdrop-filter: blur(10px);
}
</style>
