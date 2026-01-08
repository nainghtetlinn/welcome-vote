import { Button } from "@/components/ui/button";
import {
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

const CandidatesCarousel = ({
  candidates,
  handleVote,
}: {
  candidates: Tables<"candidates">[];
  handleVote: (c: Tables<"candidates">) => void;
}) => {
  return (
    <Carousel className="w-full overflow-hidden">
      <CarouselContent>
        {candidates.map((c) => (
          <CarouselItem
            key={c.id}
            className="basis-70"
          >
            <CandidateItem
              candidate={c}
              handleVote={() => handleVote(c)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 bg-primary text-primary-foreground" />
      <CarouselNext className="right-2 bg-primary text-primary-foreground" />
    </Carousel>
  );
};

const CandidateItem = ({
  candidate,
  handleVote,
}: {
  candidate: Tables<"candidates">;
  handleVote: () => void;
}) => {
  return (
    <div className="w-full space-y-2">
      <CardContent className="px-2">
        <div className="w-full relative aspect-square rounded-md overflow-hidden">
          <Image
            src={candidate.photo_url || "/profile.png"}
            alt={candidate.name}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardHeader className="select-none px-2">
        <CardTitle>{candidate.name}</CardTitle>
        <CardDescription>{candidate.roll_no}</CardDescription>
      </CardHeader>
      <CardFooter className="px-2">
        <Button
          className="w-full"
          onClick={handleVote}
        >
          Vote
        </Button>
      </CardFooter>
    </div>
  );
};

export default CandidatesCarousel;
