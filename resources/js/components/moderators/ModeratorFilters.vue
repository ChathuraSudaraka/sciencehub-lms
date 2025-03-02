<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { XCircle, ChevronsUpDown, Search, SlidersHorizontal } from 'lucide-vue-next';
import type { ModeratorFilters, ModeratorStatus } from '@/types/moderator';
import { computed } from 'vue';
import { Transition } from 'vue';

interface Props {
    filters: ModeratorFilters;
}

interface FilterBadge {
    type: 'search' | 'status' | 'sort';
    value: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:filters', filters: ModeratorFilters): void;
}>();

const updateFilter = (key: keyof ModeratorFilters, value: any) => {
    emit('update:filters', {
        ...props.filters,
        [key]: value,
    });
};

const clearFilters = () => {
    emit('update:filters', {});
};

const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' },
    { value: 'inactive', label: 'Inactive', color: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20' }
] as const;

const selectedStatuses = computed(() => {
    if (!props.filters.status) return [];
    return Array.isArray(props.filters.status) ? props.filters.status : [props.filters.status];
});

const hasActiveFilters = computed(() => 
    Object.values(props.filters).some(value => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== undefined && value !== '';
    })
);

const toggleStatus = (status: ModeratorStatus) => {
    const current = selectedStatuses.value;
    const newStatuses = current.includes(status)
        ? current.filter(s => s !== status)
        : [...current, status];
    updateFilter('status', newStatuses.length ? newStatuses : undefined);
};

const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'created_at-desc', label: 'Newest First' },
    { value: 'created_at-asc', label: 'Oldest First' },
] as const;

const currentSort = computed(() => {
    if (!props.filters.sortBy) return undefined;
    return `${props.filters.sortBy}-${props.filters.sortDirection}`;
});

const getSortLabel = (value: string | undefined) => {
    if (!value) return 'Sort by';
    return sortOptions.find(opt => opt.value === value)?.label || 'Sort by';
};

const badges = computed<FilterBadge[]>(() => [
    ...(props.filters.search ? [{ type: 'search' as const, value: props.filters.search }] : []),
    ...selectedStatuses.value.map(status => ({ type: 'status' as const, value: status })),
    ...(props.filters.sortBy ? [{ type: 'sort' as const, value: currentSort.value ?? '' }] : [])
]);
</script>

<template>
    <div class="space-y-4">
        <!-- Search and Filters Bar -->
        <div class="flex flex-wrap items-center gap-4">
            <div class="flex-1 min-w-[250px] relative group">
                <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                <Input 
                    placeholder="Search moderators..."
                    :value="filters.search"
                    class="pl-8 transition-shadow focus-visible:ring-2"
                    @input="(e: Event) => updateFilter('search', (e.target as HTMLInputElement).value)"
                />
            </div>

            <!-- Status Filter -->
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="min-w-[140px] justify-between gap-2 transition-all" :class="{ 'ring-2 ring-ring': selectedStatuses.length }">
                        <div class="flex items-center gap-2">
                            <SlidersHorizontal class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-[-45deg]': selectedStatuses.length }" />
                            <span class="truncate">
                                {{ selectedStatuses.length ? `${selectedStatuses.length} selected` : 'Status' }}
                            </span>
                        </div>
                        <ChevronsUpDown class="h-4 w-4 opacity-50 transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-[200px]">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div class="p-2">
                        <div class="space-y-2">
                            <label 
                                v-for="status in statusOptions" 
                                :key="status.value"
                                class="flex items-center space-x-2 rounded-sm px-2 py-1.5 cursor-pointer hover:bg-accent"
                            >
                                <input 
                                    type="checkbox"
                                    :checked="selectedStatuses.includes(status.value)"
                                    @change="toggleStatus(status.value)"
                                    class="rounded border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                <span class="flex items-center gap-2">
                                    <span 
                                        class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                                        :class="status.color"
                                    >
                                        {{ status.label }}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="updateFilter('status', undefined)">
                        Reset status filter
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <!-- Sort Dropdown -->
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="min-w-[140px] justify-between transition-all" :class="{ 'ring-2 ring-ring': filters.sortBy }">
                        <span>{{ getSortLabel(currentSort) }}</span>
                        <ChevronsUpDown class="h-4 w-4 opacity-50 transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-[200px]">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        v-for="option in sortOptions"
                        :key="option.value"
                        @click="() => {
                            const [field, direction] = option.value.split('-');
                            updateFilter('sortBy', field);
                            updateFilter('sortDirection', direction);
                        }"
                        :class="{ 'bg-accent': currentSort === option.value }"
                    >
                        {{ option.label }}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                        @click="() => {
                            updateFilter('sortBy', undefined);
                            updateFilter('sortDirection', undefined);
                        }"
                    >
                        Reset sort
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Transition
                enter-active-class="transition-opacity duration-200 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-150 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <Button 
                    v-if="hasActiveFilters"
                    variant="ghost" 
                    size="icon"
                    @click="clearFilters"
                    class="shrink-0"
                >
                    <XCircle class="h-5 w-5" />
                </Button>
            </Transition>
        </div>

        <!-- Active Filters -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
        >
            <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2">
                <span class="text-sm text-muted-foreground">Active filters:</span>
                <div class="flex flex-wrap gap-2">
                    <Badge 
                        v-for="(badge, index) in badges"
                        :key="badge.type + badge.value"
                        variant="secondary"
                        class="gap-1 transition-all hover:pr-1.5"
                        :style="{
                            animationDelay: `${index * 50}ms`,
                            animationName: 'slideIn'
                        }"
                    >
                        <span class="truncate">
                            <template v-if="badge.type === 'search'">Search: "{{ badge.value }}"</template>
                            <template v-else-if="badge.type === 'status'">Status: {{ badge.value }}</template>
                            <template v-else>{{ getSortLabel(badge.value) }}</template>
                        </span>
                        <button 
                            class="ml-1 rounded-full outline-none ring-offset-background transition-all hover:bg-muted focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            @click="() => {
                                if (badge.type === 'search') updateFilter('search', undefined);
                                else if (badge.type === 'status') toggleStatus(badge.value as ModeratorStatus);
                                else {
                                    updateFilter('sortBy', undefined);
                                    updateFilter('sortDirection', undefined);
                                }
                            }"
                        >
                            <XCircle class="h-3 w-3" />
                        </button>
                    </Badge>
                </div>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    class="h-7 px-2 text-xs transition-colors"
                    @click="clearFilters"
                >
                    Clear all
                </Button>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.badge {
    animation: slideIn 0.2s ease-out forwards;
}
</style>