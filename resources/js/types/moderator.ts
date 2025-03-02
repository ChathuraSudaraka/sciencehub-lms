export interface Moderator {
    id: number;
    name: string;
    email: string;
    created_at: string;
    status: ModeratorStatus;
}

export type ModeratorStatus = 'active' | 'inactive';

export interface ModeratorFilters {
    search?: string;
    status?: ModeratorStatus | ModeratorStatus[];
    sortBy?: keyof Moderator;
    sortDirection?: 'asc' | 'desc';
}

export const filterModerators = (moderators: Moderator[], filters: ModeratorFilters): Moderator[] => {
    return moderators
        .filter(moderator => {
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                return (
                    moderator.name.toLowerCase().includes(searchLower) ||
                    moderator.email.toLowerCase().includes(searchLower)
                );
            }
            return true;
        })
        .filter(moderator => {
            if (filters.status) {
                const statusArray = Array.isArray(filters.status) ? filters.status : [filters.status];
                return statusArray.includes(moderator.status);
            }
            return true;
        })
        .sort((a, b) => {
            if (filters.sortBy) {
                const aValue = a[filters.sortBy];
                const bValue = b[filters.sortBy];
                const direction = filters.sortDirection === 'desc' ? -1 : 1;
                
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return direction * aValue.localeCompare(bValue);
                }
                
                if (aValue < bValue) return -1 * direction;
                if (aValue > bValue) return 1 * direction;
            }
            return 0;
        });
};