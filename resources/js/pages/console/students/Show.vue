<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue';

defineProps<{
  student: {
    id: number
  }
}>()
</script>

<template>
  <Head title="Student Details" />

  <AppLayout>
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div>
        <div class="py-12">
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                  <h1 class="text-2xl font-semibold">Student Details</h1>
                  <div class="space-x-2">
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Edit</button>
                    <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
                  </div>
                </div>

                <!-- Student Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-lg font-medium mb-4">Personal Information</h3>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-sm font-medium text-gray-500">Full Name</label>
                        <div class="mt-1 text-sm">John Doe</div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500">Email</label>
                        <div class="mt-1 text-sm">john.doe@example.com</div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500">Phone</label>
                        <div class="mt-1 text-sm">+1234567890</div>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-lg font-medium mb-4">Academic Information</h3>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-sm font-medium text-gray-500">Current Class</label>
                        <div class="mt-1 text-sm">Grade 10-A</div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500">Enrollment Date</label>
                        <div class="mt-1 text-sm">2023-09-01</div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-500">Status</label>
                        <div class="mt-1">
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Recent Activity -->
                <div class="mt-8">
                  <h3 class="text-lg font-medium mb-4">Recent Activity</h3>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="space-y-4">
                      <div v-for="i in 3" :key="i" class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span class="text-blue-600">{{ i }}</span>
                          </div>
                        </div>
                        <div>
                          <p class="text-sm font-medium">Activity {{ i }}</p>
                          <p class="text-sm text-gray-500">Completed on Jan {{ i }}, 2024</p>
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