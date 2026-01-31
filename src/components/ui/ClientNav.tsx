"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClientNavbar({ user }: { user: any }) {
  const router = useRouter();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link href="/" className="font-bold text-xl">
        SkillBridge
      </Link>

      <div className="flex gap-3 items-center">
        <Link href="/">Home</Link>
        <Link href="/tutors">Tutors</Link>

        {user ? (
          <>
            {user.role === "ADMIN" && (
              <Link href="/admin">Admin Dashboard</Link>
            )}
            {user.role === "TUTOR" && (
              <Link href="/tutor">Tutor Dashboard</Link>
            )}
            {user.role === "STUDENT" && (
              <Link href="/dashboard">Student Dashboard</Link>
            )}

            <span className="font-semibold">{user.name}</span>
            <button
              onClick={logout}
              className="ml-4 px-3 py-1 border rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
