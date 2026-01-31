"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MyBookingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
      <p className="mt-1 text-muted-foreground">
        Upcoming and past tutoring sessions.
      </p>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
