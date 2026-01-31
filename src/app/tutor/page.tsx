"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BookOpen, Calendar, User } from "lucide-react";

export default function TutorDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">tutor Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming sessions
            </CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild variant="link" size="sm" className="p-0">
              <Link href="/dashboard/bookings">View all</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total bookings
            </CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profile
            </CardTitle>
            <User className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild variant="link" size="sm" className="p-0">
              <Link href="/dashboard/profile">Edit profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex gap-4">
        <Button asChild>
          <Link href="/tutors">Find a tutor</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/bookings">My bookings</Link>
        </Button>
      </div>
    </div>
  );
}
