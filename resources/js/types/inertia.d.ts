import { PageProps as InertiaPageProps } from '@inertiajs/core';

export type User = {
    id: number;
    name: string;
    email: string;
};

export type SharedData = {
    auth: {
        user: User | null;
    };
    props: {
        totalLinks: number;
        totalClicks: number;
        recentLinks: {
            id: number;
            unique_code: string;
            target_url: string;
            clicks_count: number;
        }[];
        clicksLast7Days: {
            day: string;
            clicks: number;
        }[];
    };
};

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, SharedData {}
}
