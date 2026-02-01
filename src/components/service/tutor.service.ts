export const tutorProfileService = {
  createTutorProfile: async function (payload: {
    bio: string;
    hourlyRate: number;
    status: string;
    categoryIds: number[];
  }) {
    try {
      const res = await fetch("http://localhost:5000/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: data };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Network error" } };
    }
  },
};
