import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tables } from "@/types/supabase";
import Link from "next/link";

export const EventCard = ({
  event,
}: {
  event: Tables<"events_with_counts">;
}) => {
  return (
    <Link href={`/admin/${event.name}`}>
      <Card className="hover:border-primary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{event.name}</span>
            {event.active ? (
              <Badge>Active</Badge>
            ) : (
              <Badge variant="secondary">Inactive</Badge>
            )}
          </CardTitle>
          <CardDescription>
            {event.candidates_count} candidates | {event.votes_count} voters
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </Link>
  );
};
