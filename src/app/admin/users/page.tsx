"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemoUser } from "@/lib/demo-context";
import { allUsersForAdmin } from "@/lib/demo-data";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const { demoUser } = useDemoUser();
  const [users, setUsers] = useState(allUsersForAdmin);

  const toggleBan = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, banned: !u.banned } : u))
    );
    toast.success("User status updated (demo).");
  };

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
      <h1 className="text-3xl font-bold text-foreground">Users</h1>
      <p className="mt-2 text-muted-foreground">Manage students and tutors (ban/unban).</p>

      <Card className="mt-6 overflow-hidden">
        <CardHeader>
          <CardTitle>All users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-medium">Name</th>
                  <th className="p-4 text-left font-medium">Email</th>
                  <th className="p-4 text-left font-medium">Role</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-muted-foreground">{u.email}</td>
                    <td className="p-4">
                      <Badge variant="secondary">{u.role}</Badge>
                    </td>
                    <td className="p-4">
                      {u.banned ? (
                        <Badge variant="destructive">Banned</Badge>
                      ) : (
                        <Badge variant="outline">Active</Badge>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant={u.banned ? "outline" : "destructive"}
                        size="sm"
                        onClick={() => toggleBan(u.id)}
                      >
                        {u.banned ? "Unban" : "Ban"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/admin">Back to dashboard</Link>
      </Button>
    </div>
  );
}
