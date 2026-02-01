"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Users, BookOpen, LayoutDashboard } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Platform statistics and overview.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total users
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Students
            </CardTitle>
            <LayoutDashboard className="size-4 text-muted-foreground" />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tutors
            </CardTitle>
            <LayoutDashboard className="size-4 text-muted-foreground" />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bookings
            </CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
        </Card>
      </div>

      {/* Sidebar */}

      <aside className="w-64 border-r p-6 space-y-16 ">
        <h2 className="text-xl font-bold mb-6 mt-4">Admin Panel</h2>

        <Link href="/admin/users">
          <Button variant="ghost" className="w-full justify-start">
            Manage User Status
          </Button>
        </Link>

        <Link href="/admin/bookings">
          <Button variant="ghost" className="w-full justify-start">
            View Bookings
          </Button>
        </Link>

        <Link href="/admin/categories">
          <Button variant="ghost" className="w-full justify-start">
            Manage Categories
          </Button>
        </Link>

        <Link href="/admin/allUsers">
          <Button variant="ghost" className="w-full justify-start">
            View All Users
          </Button>
        </Link>
      </aside>
    </div>
  );
}
