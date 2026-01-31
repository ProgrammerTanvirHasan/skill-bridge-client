"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDemoUser } from "@/lib/demo-context";
import { useDemo } from "@/lib/demo-context";
import { allUsersForAdmin } from "@/lib/demo-data";
import { Users, BookOpen, FolderOpen, LayoutDashboard } from "lucide-react";

export default function AdminDashboardPage() {
  const { demoUser } = useDemoUser();
  const ctx = useDemo();
  const bookings = ctx?.demoBookings ?? [];
  const users = allUsersForAdmin;
  const studentCount = users.filter((u) => u.role === "STUDENT").length;
  const tutorCount = users.filter((u) => u.role === "TUTOR").length;

  if (!demoUser) {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">Please log in.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  if (demoUser.role !== "ADMIN") {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">This area is for admins.</p>
        <Button asChild variant="link">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Platform statistics and overview.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total users</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students</CardTitle>
            <LayoutDashboard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{studentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tutors</CardTitle>
            <LayoutDashboard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{tutorCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bookings (demo)</CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/admin/users">Manage users</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/bookings">View bookings</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/categories">Manage categories</Link>
        </Button>
      </div>
    </div>
  );
}
