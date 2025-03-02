<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { UsersRound } from 'lucide-vue-next';

interface Props {
    isFiltered?: boolean;
}

defineProps<Props>();

defineEmits<{
    (e: 'clearFilters'): void;
}>();
</script>

<template>
    <div class="flex min-h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <UsersRound class="h-10 w-10 text-muted-foreground" />
            </div>

            <h3 class="mt-4 text-lg font-semibold">No moderators found</h3>
            <p class="mb-4 mt-2 text-sm text-muted-foreground" v-if="isFiltered">
                No results match your current filters. Try adjusting your search criteria.
            </p>
            <p class="mb-4 mt-2 text-sm text-muted-foreground" v-else>
                Get started by adding your first moderator to the system.
            </p>

            <div class="flex gap-2">
                <Button v-if="isFiltered" variant="outline" @click="$emit('clearFilters')">
                    Clear filters
                </Button>
                <Button v-else>
                    Add moderator
                </Button>
            </div>
        </div>
    </div>
</template>