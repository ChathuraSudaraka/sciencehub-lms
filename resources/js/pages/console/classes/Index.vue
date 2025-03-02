<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue';
</script>

<template>
  <Head title="Classes" />

  <AppLayout>
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6">
              <h1 class="text-2xl font-semibold mb-6">Classes</h1>

              <div class="space-y-4">
                <!-- Actions Bar -->
                <div class="flex justify-between items-center">
                  <div class="flex space-x-4">
                    <input type="text" placeholder="Search classes..." class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Search</button>
                  </div>
                  <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Create New Class</button>
                </div>

                <!-- Class Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <div v-for="i in 6" :key="i" class="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-lg font-medium text-gray-900">Grade {{ i }}-A</h3>
                        <p class="text-sm text-gray-500 mt-1">Science Class</p>
                      </div>
                      <span class="px-2 py-1 text-xs font-semibold rounded-full" :class="i % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                        {{ i % 2 === 0 ? 'Active' : 'Upcoming' }}
                      </span>
                    </div>

                    <div class="mt-4">
                      <div class="flex items-center text-sm text-gray-500">
                        <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {{ 20 + i }} Students
                      </div>
                      <div class="flex items-center text-sm text-gray-500 mt-2">
                        <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Mon, Wed, Fri
                      </div>
                    </div>

                    <div class="mt-6 flex justify-end space-x-2">
                      <a href="#" class="text-sm text-indigo-600 hover:text-indigo-900">View Details</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>