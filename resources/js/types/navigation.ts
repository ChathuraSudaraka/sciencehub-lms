export type UserRole = 'admin' | 'moderator' | 'student';

export interface NavItem {
    title: string;
    href: string;
    icon: any;
    access: UserRole[];
}

export interface NavSection {
    title: string;
    items: NavItem[];
    access: UserRole[];
}

export const filterNavigationByRole = (sections: NavSection[], role: UserRole): NavSection[] => {
    return sections
        .filter(section => section.access.includes(role))
        .map(section => ({
            ...section,
            items: section.items.filter(item => item.access.includes(role))
        }))
        .filter(section => section.items.length > 0);
};