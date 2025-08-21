"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/products");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}