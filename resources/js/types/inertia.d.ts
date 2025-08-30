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
};

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, SharedData {}
}
