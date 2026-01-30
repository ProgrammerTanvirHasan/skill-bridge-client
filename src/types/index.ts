/**
 * Shared types for SkillBridge client.
 * Align with backend API and database schema.
 */

export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  banned?: boolean;
}

export interface TutorProfile {
  id: string;
  userId: string;
  headline?: string | null;
  bio?: string | null;
  hourlyRateCents?: number | null;
  categoryIds?: string[];
  averageRating?: number | null;
  totalReviews?: number;
  createdAt?: string;
  updatedAt?: string;
  user?: Pick<User, "id" | "name" | "image">;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
}

export type BookingStatus = "CONFIRMED" | "COMPLETED" | "CANCELLED";

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  tutorProfileId: string;
  status: BookingStatus;
  startAt: string;
  endAt: string;
  createdAt?: string;
  updatedAt?: string;
  student?: Pick<User, "id" | "name" | "email">;
  tutor?: TutorProfile & { user?: Pick<User, "id" | "name" | "image"> };
}

export interface Review {
  id: string;
  bookingId: string;
  studentId: string;
  tutorId: string;
  rating: number;
  comment?: string | null;
  createdAt?: string;
  student?: Pick<User, "id" | "name">;
}

/** Query params for GET /api/tutors */
export interface TutorsQuery {
  categoryId?: string;
  minRating?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}
