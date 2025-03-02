<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus } from 'lucide-vue-next';
import type { BreadcrumbItem } from '@/types';
import type { Moderator } from '@/types/moderator';
import { filterModerators } from '@/types/moderator';
import { computed, ref } from 'vue';
import ModeratorFilters from '@/components/moderators/ModeratorFilters.vue';
import ModeratorTable from '@/components/moderators/ModeratorTable.vue';
import { useUrlFilters } from '@/composables/useUrlFilters';

// Mock data - replace with actual data from backend
const allModerators = ref<Moderator[]>([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    created_at: '2024-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    created_at: '2024-01-20',
    status: 'active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    created_at: '2024-01-25',
    status: 'inactive',
  }
]);

const { filters, isFiltered, clearFilters } = useUrlFilters({
  search: '',
  status: undefined,
  sortBy: undefined,
  sortDirection: undefined as 'asc' | 'desc' | undefined
});

const filteredModerators = computed(() => 
  filterModerators(allModerators.value, filters.value)
);

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Moderator Management',
    href: '/console/moderators',
  },
];
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbItems">
    <Head title="Moderator Management" />

    <div class="container space-y-6 p-6">
      <div class="flex items-center justify-between">
        <HeadingSmall 
          title="Moderator Management" 
          description="Manage all moderators in the system"
        />
        <Button>
          <Plus class="mr-2 h-4 w-4" />
          Add Moderator
        </Button>
      </div>

      <Card>
        <CardHeader>
          <ModeratorFilters
            v-model:filters="filters"
          />
        </CardHeader>
        <CardContent>
          <ModeratorTable
            :moderators="filteredModerators"
            :is-filtered="isFiltered"
            @clear-filters="clearFilters"
          />
        </CardContent>
      </Card>
    </div>
  </AppLayout>
</template>