<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue';

defineProps<{
  class: {
    id: number
  }
}>()
</script>

<template>
  <Head title="Class Details" />

  <AppLayout>
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div>
        <div class="py-12">
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                  <h1 class="text-2xl font-semibold">Grade 10-A Science</h1>
                  <div class="space-x-2">
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Edit Class</button>
                    <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete Class</button>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <!-- Class Overview -->
                  <div class="lg:col-span-2 space-y-6">
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <h3 class="text-lg font-medium mb-4">Class Information</h3>
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-500">Subject</label>
                          <div class="mt-1 text-sm">Science</div>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-500">Grade Level</label>
                          <div class="mt-1 text-sm">Grade 10</div>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-500">Schedule</label>
                          <div class="mt-1 text-sm">Mon, Wed, Fri (10:00 AM - 11:30 AM)</div>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-500">Room</label>
                          <div class="mt-1 text-sm">Lab 101</div>
                        </div>
                      </div>
                    </div>

                    <!-- Class Progress -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <h3 class="text-lg font-medium mb-4">Class Progress</h3>
                      <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                          <div>
                            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                              Progress
                            </span>
                          </div>
                          <div class="text-right">
                            <span class="text-xs font-semibold inline-block text-blue-600">
                              65%
                            </span>
                          </div>
                        </div>
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                          <div style="width:65%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Student List -->
                  <div class="lg:col-span-1">
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-medium">Students</h3>
                        <button class="text-sm text-indigo-600 hover:text-indigo-900">Add Student</button>
                      </div>
                      <div class="space-y-3">
                        <div v-for="i in 5" :key="i" class="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                          <div class="flex items-center">
                            <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                              S{{ i }}
                            </div>
                            <span class="ml-3 text-sm">Student {{ i }}</span>
                          </div>
                          <a href="#" class="text-sm text-indigo-600 hover:text-indigo-900">View</a>
                        </div>
                      </div>
                      <div class="mt-4 text-center">
                        <a href="#" class="text-sm text-indigo-600 hover:text-indigo-900">View All Students</a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Recent Activity -->
                <div class="mt-6">
                  <h3 class="text-lg font-medium mb-4">Recent Activity</h3>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="space-y-4">
                      <div v-for="i in 3" :key="i" class="flex items-start space-x-4">
                        <div class="flex-shrink-0">
                          <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span class="text-indigo-600">{{ i }}</span>
                          </div>
                        </div>
                        <div>
                          <p class="text-sm font-medium">Class Activity {{ i }}</p>
                          <p class="text-sm text-gray-500">Updated {{ i }} hour(s) ago</p>
                        </div>
                      </div>
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