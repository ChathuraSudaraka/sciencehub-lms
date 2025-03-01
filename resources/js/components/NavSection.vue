<script setup lang="ts">
import { computed } from 'vue';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/vue3';
import type { NavSection } from '@/types/navigation';

defineProps<{
    section: NavSection;
}>();

const { state } = useSidebar();
const isCollapsed = computed(() => state.value === 'collapsed');
const page = usePage();

const isActive = (href: string) => {
    return page.url === href;
};
</script>

<template>
    <div class="space-y-4">
        <h2 
            class="px-2 text-xs font-semibold tracking-tight text-foreground/70 transition-all duration-200"
            :class="{ 'h-0 opacity-0 overflow-hidden': isCollapsed }"
        >
            {{ section.title }}
        </h2>
        <SidebarMenu>
            <SidebarMenuItem v-for="item in section.items" :key="item.href">
                <SidebarMenuButton as-child>
                    <Link 
                        :href="item.href" 
                        :class="[
                            'flex items-center mx-auto transition-all duration-200 relative rounded-md px-2 py-1.5', 
                            isCollapsed ? 'justify-center' : 'gap-x-3',
                            isActive(item.href) 
                                ? 'text-primary bg-primary/10' 
                                : 'text-foreground/70 hover:text-primary hover:translate-x-1 hover:bg-muted/60'
                        ]"
                    >
                        <component 
                            :is="item.icon" 
                            :class="['h-4 w-4 transition-colors duration-200', isActive(item.href) ? 'text-primary' : '']" 
                        />
                        <!-- Hide title when collapsed -->
                        <span v-if="!isCollapsed">{{ item.title }}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </div>
</template>