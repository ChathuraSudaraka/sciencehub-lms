<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Moderator } from '@/types/moderator';
import ModeratorEmptyState from '@/components/moderators/ModeratorEmptyState.vue';
import { computed } from 'vue';

interface Props {
    moderators: Moderator[];
    isFiltered?: boolean;
}

const props = defineProps<Props>();

defineEmits<{
    (e: 'clearFilters'): void;
}>();

const hasData = computed(() => props.moderators.length > 0);
</script>

<template>
    <div>
        <ModeratorEmptyState
            v-if="!hasData"
            :is-filtered="isFiltered"
            @clear-filters="$emit('clearFilters')"
        />
        
        <Table v-else>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead class="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="moderator in moderators" :key="moderator.id">
                    <TableCell class="font-medium">{{ moderator.name }}</TableCell>
                    <TableCell>{{ moderator.email }}</TableCell>
                    <TableCell>{{ new Date(moderator.created_at).toLocaleDateString() }}</TableCell>
                    <TableCell>
                        <span 
                            class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                            :class="{
                                'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20': moderator.status === 'active',
                                'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20': moderator.status === 'inactive'
                            }"
                        >
                            {{ moderator.status }}
                        </span>
                    </TableCell>
                    <TableCell class="text-right space-x-2">
                        <Button variant="ghost" size="sm">
                            Edit
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>