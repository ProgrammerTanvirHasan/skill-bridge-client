"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemoUser } from "@/lib/demo-context";
import { useDemo } from "@/lib/demo-context";
import { Calendar, DollarSign, BookOpen, User } from "lucide-react";

const MOCK_TUTOR_SESSIONS = [
  { id: "ts1", studentName: "Alex M.", subject: "Mathematics", startAt: new Date(Date.now() + 86400000).toISOString(), status: "CONFIRMED" },
  { id: "ts2", studentName: "Jordan K.", subject: "Physics", startAt: new Date(Date.now() + 86400000 * 2).toISOString(), status: "CONFIRMED" },
  { id: "ts3", studentName: "Sam L.", subject: "Programming", startAt: new Date(Date.now() - 86400000).toISOString(), status: "COMPLETED" },
];

export default function TutorDashboardPage() {
  const { demoUser } = useDemoUser();
  const ctx = useDemo();
  const bookings = ctx?.demoBookings ?? [];
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;

  if (!demoUser) {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">Please log in to view your dashboard.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  if (demoUser.role !== "TUTOR") {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">This dashboard is for tutors.</p>
        <Button asChild variant="link">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Tutor Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome back, {demoUser.name}.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{MOCK_TUTOR_SESSIONS.filter((s) => s.status === "CONFIRMED").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{MOCK_TUTOR_SESSIONS.filter((s) => s.status === "COMPLETED").length + completedCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Earnings (demo)</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profile</CardTitle>
            <User className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild variant="link" size="sm" className="p-0">
              <Link href="/tutor/profile">Edit profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Upcoming sessions</CardTitle>
          <CardDescription className="sr-only">Demo sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {MOCK_TUTOR_SESSIONS.filter((s) => s.status === "CONFIRMED").map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{s.studentName}</p>
                <p className="text-sm text-muted-foreground">{s.subject} · {new Date(s.startAt).toLocaleString()}</p>
              </div>
              <Badge>{s.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/tutor/availability">Set availability</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tutor/profile">Edit profile</Link>
        </Button>
      </div>
    </div>
  );
}
