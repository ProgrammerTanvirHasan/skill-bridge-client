"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTutorById, getReviewsForTutor, getCategoryName } from "@/lib/demo-data";
import { useDemo } from "@/lib/demo-context";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function TutorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const ctx = useDemo();
  const tutor = getTutorById(id);
  const reviews = tutor ? getReviewsForTutor(tutor.id) : [];

  if (!tutor) {
    return (
      <div className="py-8">
        <p className="text-muted-foreground">Tutor not found.</p>
        <Button asChild variant="link" className="mt-2">
          <Link href="/tutors">Back to tutors</Link>
        </Button>
      </div>
    );
  }

  const rate = tutor.hourlyRateCents != null ? `$${(tutor.hourlyRateCents / 100).toFixed(0)}/hr` : "—";
  const categories = (tutor.categoryIds ?? []).map(getCategoryName).filter(Boolean);
  const rating = tutor.averageRating ?? 0;
  const reviewCount = tutor.totalReviews ?? 0;

  function handleBook() {
    if (!ctx) return;
    if (!ctx.demoUser) {
      toast.info("Log in or use a demo account to book a session.");
      router.push("/login");
      return;
    }
    if (ctx.demoUser.role !== "STUDENT") {
      toast.info("Only students can book sessions. Switch to a student demo account.");
      return;
    }
    ctx.addDemoBooking({
      id: `demo-${Date.now()}`,
      studentId: ctx.demoUser.id,
      tutorId: tutor.userId,
      tutorProfileId: tutor.id,
      status: "CONFIRMED",
      startAt: new Date(Date.now() + 86400000).toISOString(),
      endAt: new Date(Date.now() + 86400000 + 3600000).toISOString(),
      tutor,
      categoryName: categories[0],
    });
    toast.success("Session booked! Check My Bookings.");
    router.push("/dashboard/bookings");
  }

  return (
    <div className="py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/tutors">← Back to tutors</Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <CardTitle className="text-2xl">{tutor.user?.name}</CardTitle>
                <Badge className="text-base">{rate}</Badge>
              </div>
              {tutor.headline && (
                <p className="text-muted-foreground">{tutor.headline}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Badge key={c} variant="secondary">
                    {c}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Star className="size-5 fill-amber-400 text-amber-400" />
                <span className="font-medium">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({reviewCount} reviews)</span>
              </div>
            </CardHeader>
            {tutor.bio && (
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground">{tutor.bio}</p>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{r.student?.name ?? "Student"}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`size-4 ${i <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    {r.comment && <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Book a session</CardTitle>
              <p className="text-sm text-muted-foreground">
                1-hour session with {tutor.user?.name}
              </p>
            </CardHeader>
            <CardContent>
              <Button onClick={handleBook} className="w-full" size="lg">
                Book now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
