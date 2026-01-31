"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCategoryName } from "@/lib/demo-data";
import type { TutorProfile } from "@/types";
import { Star } from "lucide-react";

type TutorWithUser = TutorProfile & { user?: { id: string; name: string; image?: string | null } };

export function TutorCard({ tutor, showBook = true }: { tutor: TutorWithUser; showBook?: boolean }) {
  const name = tutor.user?.name ?? "Tutor";
  const rate = tutor.hourlyRateCents != null ? `$${(tutor.hourlyRateCents / 100).toFixed(0)}/hr` : "—";
  const categories = (tutor.categoryIds ?? []).map(getCategoryName).filter(Boolean);
  const rating = tutor.averageRating ?? 0;
  const reviewCount = tutor.totalReviews ?? 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="outline" className="shrink-0">
            {rate}
          </Badge>
        </div>
        {tutor.headline && (
          <p className="text-sm text-muted-foreground">{tutor.headline}</p>
        )}
        <div className="flex flex-wrap gap-1">
          {categories.map((c) => (
            <Badge key={c} variant="secondary" className="text-xs">
              {c}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(1)}</span>
          {reviewCount > 0 && <span>({reviewCount} reviews)</span>}
        </div>
      </CardHeader>
      {tutor.bio && (
        <CardContent className="py-0">
          <p className="line-clamp-2 text-sm text-muted-foreground">{tutor.bio}</p>
        </CardContent>
      )}
      {showBook && (
        <CardFooter>
          <Button asChild size="sm" className="w-full">
            <Link href={`/tutors/${tutor.id}`}>View profile & book</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
