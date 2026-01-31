"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDemoUser } from "@/lib/demo-context";
import { useDemo } from "@/lib/demo-context";

export default function AdminBookingsPage() {
  const { demoUser } = useDemoUser();
  const ctx = useDemo();
  const bookings = ctx?.demoBookings ?? [];

  if (!demoUser || demoUser.role !== "ADMIN") {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">Admin only.</p>
        <Button asChild variant="link">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
      <p className="mt-2 text-muted-foreground">
        View all platform bookings (demo).
      </p>

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>All bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {bookings.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">
              No bookings in demo.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-medium">Tutor</th>
                    <th className="p-4 text-left font-medium">Start</th>
                    <th className="p-4 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/admin">Back to dashboard</Link>
      </Button>
    </div>
  );
}
