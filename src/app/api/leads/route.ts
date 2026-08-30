import { handleReservationPost } from "@/lib/reservation";

export async function POST(request: Request) {
  return handleReservationPost(request);
}
