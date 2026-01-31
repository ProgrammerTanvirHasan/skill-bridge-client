"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemoUser, useDemo } from "@/lib/demo-context";
import { toast } from "sonner";

export default function MyBookingsPage() {
  const { demoUser } = useDemoUser();
  const ctx = useDemo();
  const bookings = ctx?.demoBookings ?? [];

  if (!demoUser) {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">Please log in to view your bookings.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  if (demoUser.role !== "STUDENT") {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">This page is for students.</p>
        <Button asChild variant="link">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    );
  }

  const handleCancel = (id: string) => {
    ctx?.cancelDemoBooking(id);
    toast.success("Booking cancelled.");
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
      <p className="mt-2 text-muted-foreground">Upcoming and past tutoring sessions.</p>

      <div className="mt-6 space-y-4">
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No bookings yet. <Link href="/tutors" className="text-primary underline">Find a tutor</Link> to book a session.
            </CardContent>
          </Card>
        ) : (
          bookings.map((b) => (
            <Card key={b.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{b.tutor?.user?.name ?? "Tutor"}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(b.startAt).toLocaleString()} · {b.categoryName ?? "Session"}
                  </p>
                </div>
                <Badge
                  variant={
                    b.status === "CONFIRMED"
                      ? "default"
                      : b.status === "COMPLETED"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {b.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {new Date(b.startAt).toLocaleDateString()} at {new Date(b.startAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                {b.status === "CONFIRMED" && (
                  <Button variant="destructive" size="sm" onClick={() => handleCancel(b.id)}>
                    Cancel
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
