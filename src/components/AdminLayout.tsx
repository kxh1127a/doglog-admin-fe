// AdminLayout.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) router.push('/admin/login');
    }, []);

    return <>{children}</>;
}
