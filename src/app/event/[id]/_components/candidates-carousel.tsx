import ProfileImage from "@/assets/profile.png";
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
import VoteBtn from "./vote-btn";

import { Tables } from "@/types/supabase";
import Image from "next/image";

const CandidatesCarousel = ({
  candidates,
}: {
  candidates: Tables<"candidates">[];
}) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="px-2">
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
      <CardHeader className="select-none">
        <CardTitle>{candidate.name}</CardTitle>
        <CardDescription>{candidate.roll_no}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full relative aspect-square rounded-md overflow-hidden">
          <Image
            src={candidate.photo_url || ProfileImage}
            alt={candidate.name}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="gap-2 flex-col">
        <VoteBtn
          category={candidate.gender === "male" ? "king" : "queen"}
          candidate={candidate}
        />
        <VoteBtn
          category={candidate.gender === "male" ? "prince" : "princess"}
          candidate={candidate}
        />
      </CardFooter>
    </Card>
  );
};

export default CandidatesCarousel;
