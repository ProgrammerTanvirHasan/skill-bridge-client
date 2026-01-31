"use client";

import Link from "next/link";
import { Card,  CardHeader, CardTitle } from "@/components/ui/card";
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
              Bookings (demo)
            </CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
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
