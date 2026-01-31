"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BookOpen, Calendar, User } from "lucide-react";

export default function StudentDashboardPage() {
  // const bookings = ctx?.demoBookings ?? [];
  // const upcoming = bookings.filter((b) => b.status === "CONFIRMED");
  // const nextBooking = upcoming[0];

  // if (!demoUser) {
  //   return (
  //     <div className="py-8">
  //       <p className="text-muted-foreground">Please log in to view your dashboard.</p>
  //       <Button asChild className="mt-4">
  //         <Link href="/login">Log in</Link>
  //       </Button>
  //     </div>
  //   );
  // }

  // if (demoUser.role !== "STUDENT") {
  //   return (
  //     <div className="py-8">
  //       <p className="text-muted-foreground">This dashboard is for students.</p>
  //       <Button asChild variant="link" className="mt-2">
  //         <Link href="/">Go home</Link>
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
      {/* <p className="mt-2 text-muted-foreground">Welcome back, {demoUser.name}.</p> */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming sessions
            </CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* <p className="text-2xl font-bold">{upcoming.length}</p> */}
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
          <CardContent>
            {/* <p className="text-2xl font-bold">{bookings.length}</p> */}
          </CardContent>
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
      {/* {nextBooking && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Next session</CardTitle>
            <CardContent className="p-0 pt-2">
              <p className="font-medium">{nextBooking.tutor?.user?.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(nextBooking.startAt).toLocaleString()} · {nextBooking.categoryName ?? "Session"}
              </p>
              <Button asChild size="sm" className="mt-2">
                <Link href="/dashboard/bookings">View booking</Link>
              </Button>
            </CardContent>
          </CardHeader>
        </Card>
      )} */}
      <div className="mt-8 flex gap-4">
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
