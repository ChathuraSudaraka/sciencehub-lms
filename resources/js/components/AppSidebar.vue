<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/vue3';
import AppLogo from './AppLogo.vue';
import NavUser from './NavUser.vue';
import NavSection from './NavSection.vue';
import { allNavSections } from '@/config/navigation';
import { filterNavigationByRole } from '@/types/navigation';
import type { UserRole } from '@/types/navigation';

// TODO: Get actual user role from auth store/context
const userRole: UserRole = 'admin';
const navigationSections = filterNavigationByRole(allNavSections, userRole);
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="route('console.dashboard')" class="flex items-start gap-2">
                            <img src="/logo.png" alt="ScienceHub Logo" class="h-8 w-auto" />
                            <div class="flex flex-col justify-start text-left">
                                <div class="text-sm font-semibold whitespace-nowrap">
                                    SCIENCE<span class="text-primary">HUB</span> LMS
                                </div>
                                <div class="text-xs text-muted-foreground whitespace-nowrap">
                                    {{ userRole }}
                                </div>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent class="space-y-6">
            <NavSection 
                v-for="section in navigationSections" 
                :key="section.title"
                :section="section" 
            />
        </SidebarContent>

        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
