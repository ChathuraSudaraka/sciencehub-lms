import {
    LayoutGrid,
    Users,
    UserCog,
    BookOpen,
    CalendarCheck,
    CreditCard,
    GraduationCap,
    ClipboardList,
    Star,
    ShoppingBag,
    Package,
    FileText,
    Settings,
    BarChart,
    MessageCircle
} from "lucide-vue-next";
import type { NavSection } from "@/types/navigation";

export const coreNavItems: NavSection = {
    title: "Core",
    access: ['admin', 'moderator', 'student'],
    items: [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
            access: ['admin', 'moderator', 'student']
        },
        {
            title: 'Join Requests',
            href: '/join-requests',
            icon: Users,
            access: ['admin']
        },
        {
            title: 'Resources Hub',
            href: '/resources-hub',
            icon: MessageCircle,
            access: ['admin', 'moderator', 'student']
        }
    ]
};

export const academicNavItems: NavSection = {
    title: "Academic",
    access: ['admin', 'moderator', 'student'],
    items: [
        {
            title: 'Classes',
            href: '/classes',
            icon: BookOpen,
            access: ['admin', 'moderator', 'student']
        },
        {
            title: 'Attendance',
            href: '/attendance',
            icon: CalendarCheck,
            access: ['admin', 'moderator', 'student']
        },
        {
            title: 'Lessons',
            href: '/lessons',
            icon: GraduationCap,
            access: ['admin', 'moderator', 'student']
        },
        {
            title: 'Quizzes',
            href: '/quizzes',
            icon: ClipboardList,
            access: ['admin', 'moderator', 'student']
        }
    ]
};

export const adminNavItems: NavSection = {
    title: "Administration",
    access: ['admin', 'moderator'],
    items: [
        {
            title: 'Student Management',
            href: '/admin/students',
            icon: Users,
            access: ['admin', 'moderator']
        },
        {
            title: 'Moderator Management',
            href: '/admin/moderators',
            icon: UserCog,
            access: ['admin']
        },
        {
            title: 'Fees Management',
            href: '/admin/fees',
            icon: CreditCard,
            access: ['admin']
        },
        {
            title: 'Product Management',
            href: '/admin/products',
            icon: ShoppingBag,
            access: ['admin']
        }
    ]
};

export const allNavSections = [
    coreNavItems,
    academicNavItems,
    adminNavItems,
];