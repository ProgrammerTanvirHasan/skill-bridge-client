"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BookOpen, Calendar, User } from "lucide-react";

export default function TutorDashboardPage() {
  return (
    <div className="py-8 px-6">
      {/* Top Header */}
      <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Overview of your teaching activity.
      </p>

      {/* Top Cards (Full Width) */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profile Status
            </CardTitle>
            <User className="size-4 text-muted-foreground" />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rating
            </CardTitle>
            <User className="size-4 text-muted-foreground" />
          </CardHeader>
        </Card>
      </div>

      {/* Spacer */}
      <div className="mt-12 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 border-r p-6 space-y-4">
          <h2 className="text-xl font-bold mb-6">Tutor Panel</h2>

          <Link href="/tutor/bookingSession">
            <Button variant="ghost" className="w-full justify-start">
              Booking status
            </Button>
          </Link>

          <Link href="/tutor/profile">
            <Button variant="ghost" className="w-full justify-start">
              Edit Profile
            </Button>
          </Link>
          <Link href="/tutor/availability">
            <Button variant="ghost" className="w-full justify-start">
              Set availability
            </Button>
          </Link>
          <Link href="/tutor/teachingSession">
            <Button variant="ghost" className="w-full justify-start">
              View teaching sessions
            </Button>
          </Link>
          <Link href="/tutor/rating&reviews">
            <Button variant="ghost" className="w-full justify-start">
              See ratings and reviews
            </Button>
          </Link>
        </aside>

        {/* Right Content Placeholder */}
        <div className="flex-1 text-muted-foreground">
          Select an option from Tutor Panel.
        </div>
      </div>
    </div>
  );
}
