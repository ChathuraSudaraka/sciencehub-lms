import { useUrlSearchParams } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';

export function useUrlFilters<T extends Record<string, any>>(defaultFilters: T) {
    const searchParams = useUrlSearchParams();
    const filters = ref<T>({ ...defaultFilters });

    // Safe type checking functions
    const isBoolean = (value: unknown): value is boolean => 
        typeof value === 'boolean' || value === 'true' || value === 'false';
    
    const parseValue = (value: unknown, defaultValue: unknown) => {
        if (value === null || value === undefined) return defaultValue;
        
        // Handle array values
        if (Array.isArray(defaultValue)) {
            if (Array.isArray(value)) return value;
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    return Array.isArray(parsed) ? parsed : [value];
                } catch {
                    return [value];
                }
            }
            return [value];
        }

        // Handle boolean values
        if (typeof defaultValue === 'boolean') {
            return value === 'true';
        }

        // Handle numeric values
        if (typeof defaultValue === 'number') {
            const num = Number(value);
            return isNaN(num) ? defaultValue : num;
        }

        return value;
    };

    // Initialize filters from URL
    Object.keys(defaultFilters).forEach(key => {
        const value = searchParams[key];
        if (value !== undefined) {
            filters.value[key] = parseValue(value, defaultFilters[key]);
        }
    });

    // Update URL when filters change
    watch(filters, (newFilters) => {
        const query = Object.fromEntries(
            Object.entries(newFilters)
                .filter(([_, value]) => {
                    if (Array.isArray(value)) return value.length > 0;
                    if (typeof value === 'boolean') return true;
                    return value !== undefined && value !== '' && value !== null;
                })
                .map(([key, value]) => [
                    key,
                    Array.isArray(value) ? JSON.stringify(value) : value
                ])
        ) as Record<string, string>;

        router.get(
            window.location.pathname,
            query,
            {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            }
        );
    }, { deep: true });

    const isFiltered = computed(() => 
        Object.entries(filters.value).some(([key, value]) => {
            if (Array.isArray(value)) return value.length > 0;
            if (typeof value === 'boolean') return value !== defaultFilters[key];
            return value !== undefined && value !== '' && value !== null && value !== defaultFilters[key];
        })
    );

    const clearFilters = () => {
        filters.value = { ...defaultFilters };
        // Clean up URL by explicitly setting empty values
        router.get(
            window.location.pathname,
            {},
            {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return {
        filters,
        isFiltered,
        clearFilters,
    };
}