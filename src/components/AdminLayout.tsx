import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            try {
                const res = await fetch('/api/me', { credentials: 'include' });
                if (!res.ok) {
                    router.push('/admin/login');
                    return;
                }
                const data = await res.json();
                if (!data.user) {
                    router.push('/admin/login');
                    return;
                }
                setHasChecked(true);
            } catch (e) {
                router.push('/admin/login');
            }
        }
        checkLogin();
    }, [router]);

    // 토큰 검사 전까지는 빈 화면 보여주기 (또는 로딩 UI)
    if (!hasChecked) {
        return null;
    }

    // 토큰 검사 후 정상일 때만 children 렌더링
    return <>{children}</>;
}
