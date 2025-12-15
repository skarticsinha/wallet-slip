"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner"; // Assuming sonner is used

interface AuthProviderProps {
    children: React.ReactNode;
}

const PUBLIC_ROUTES = ['/login', '/signup'];

export function AuthProvider({ children }: AuthProviderProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    useEffect(() => {
        if (!loading) {
            // Redirect unauthenticated users from protected routes
            if (!user && !isPublicRoute) {
                router.push('/login');
            }
            // Redirect logged-in users trying to access login/signup
            if (user && isPublicRoute) {
                router.push('/');
            }
        }
    }, [user, loading, pathname, router, isPublicRoute]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center text-xl text-primary">Loading Wallet...</div>;
    }
    
    // Render content if on a public route OR user is authenticated
    if (isPublicRoute || user) {
        return (
            <>
                {children}
                <Toaster />
            </>
        );
    }

    return null;
}