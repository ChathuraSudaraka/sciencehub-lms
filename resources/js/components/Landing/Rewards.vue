<template>
  <section class="bg-white py-16 relative overflow-hidden">
    <!-- Blob Elements -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-[20%] left-[5%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl animate-blob"></div>
    </div>
    <!-- Existing content with added z-index -->
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col md:flex-row items-center gap-12">
        <Motion
          :initial="{ opacity: 0, x: -50 }"
          :in-view="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.7, ease: 'easeOut' }"
          class="md:w-1/2"
        >
          <div class="inline-block font-bold px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm mb-4">
            Rewards
          </div>
          <h2 class="text-4xl font-display font-bold mb-4">Earn Rewards for Learning</h2>
          <p class="text-gray-600 mb-8">
            Turn your quiz performance into rewards! Earn stars for every quiz you complete
            and redeem them for exciting gifts. The better you perform, the more you earn.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-4 pt-4">
            <Motion 
              :initial="{ opacity: 0, y: 30 }" 
              :in-view="{ opacity: 1, y: 0 }" 
              :transition="{ delay: 0.2, duration: 0.5, ease: 'easeOut' }"
              class="p-6 pt-14 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow relative"
            >
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div class="w-20 h-20 rounded-full bg-white border border-purple-100 flex items-center justify-center">
                  <Star class="w-8 h-8 text-purple-600" fill="currentColor" />
                </div>
              </div>
              <h3 class="text-lg font-bold text-center mb-2">Earn Stars</h3>
              <p class="text-gray-600 text-sm text-center mb-4">
                Complete quizzes to accumulate Science Stars and unlock amazing rewards.
              </p>
            </Motion>
            <Motion 
              :initial="{ opacity: 0, y: 30 }" 
              :in-view="{ opacity: 1, y: 0 }" 
              :transition="{ delay: 0.4, duration: 0.5, ease: 'easeOut' }"
              class="p-6 pt-14 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow relative"
            >
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div class="w-20 h-20 rounded-full bg-white border border-purple-100 flex items-center justify-center">
                  <Trophy class="w-8 h-8 text-purple-600" fill="currentColor"/>
                </div>
              </div>
              <h3 class="text-lg font-bold text-center mb-2">Redeem Rewards</h3>
              <p class="text-gray-600 text-sm text-center mb-4">
                Use your Science Stars to choose from a variety of exciting gifts.
              </p>
            </Motion>
          </div>
        </Motion>
        <Motion
          :initial="{ opacity: 0, x: 50 }"
          :in-view="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.7, ease: 'easeOut', delay: 0.3 }"
          class="md:w-1/2"
        >
          <img
            src="/images/image01.jpg"
            alt="Rewards System"
            class="rounded-lg shadow-lg w-full"
          />
        </Motion>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Star, Trophy } from 'lucide-vue-next';
import { Motion } from 'motion-v';
</script>

<style scoped>
@keyframes blob {
  0% { transform: scale(1); }
  33% { transform: scale(1.1); }
  66% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
