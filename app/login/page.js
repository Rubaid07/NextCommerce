"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Shield, ShoppingBag, Mail } from "lucide-react";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/products");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Checking authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-121px)] bg-gradient-to-br from-blue-50 via-white to-purple-50 loginbg flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light opacity-70 animate-float animation-delay-2000"></div>
                <div className="absolute top-1/2 -right-8 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light opacity-70 animate-float animation-delay-4000"></div>
                <div className="absolute bottom-8 left-1/4 w-64 h-64 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light opacity-70 animate-float"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/80 login-card-bg backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-400/30 p-8">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                                <ShoppingBag className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500">
                            Sign in to access your account and continue shopping
                        </p>
                    </div>

                    {/* google sign in */}
                    <div className="space-y-4">
                        <button
                            onClick={() => signIn("google")}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white toggle border border-gray-300 inputborder rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                    </div>

                    <div className="mt-8 p-4 dark:bg-blue-500/20 rounded-xl border border-blue-800/30">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium">
                                    Secure & Private
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Your information is protected with industry-standard encryption
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-10px) scale(1.05); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}