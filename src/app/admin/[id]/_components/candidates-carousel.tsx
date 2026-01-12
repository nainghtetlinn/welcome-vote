import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Tables } from "@/types/supabase";
import Image from "next/image";
import { DeleteCandidateBtn } from "./delete-candidate-btn";

const CandidatesCarousel = ({
  candidates,
}: {
  candidates: Tables<"candidates">[];
}) => {
  return (
    <Carousel className="w-full overflow-hidden">
      <CarouselContent>
        {candidates.map((c) => (
          <CarouselItem
            key={c.id}
            className="basis-70"
          >
            <CandidateItem candidate={c} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 bg-primary text-primary-foreground" />
      <CarouselNext className="right-2 bg-primary text-primary-foreground" />
    </Carousel>
  );
};

const CandidateItem = ({ candidate }: { candidate: Tables<"candidates"> }) => {
  return (
    <Card>
      <CardContent>
        <div className="w-full relative aspect-square rounded-md overflow-hidden">
          <Image
            src={candidate.photo_url || "/profile.png"}
            alt={candidate.name}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardHeader className="select-none">
        <CardTitle>{candidate.name}</CardTitle>
        <CardDescription>{candidate.roll_no}</CardDescription>
      </CardHeader>
      <CardFooter>
        <DeleteCandidateBtn id={candidate.id} />
      </CardFooter>
    </Card>
  );
};

export default CandidatesCarousel;
