"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, SendHorizonal } from "lucide-react";
import QrCodeScanner from "./qr-code-scanner";

import { useVoteContext } from "@/providers/vote-provider";
import { submitVote } from "@/server-actions/submit-vote";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { toast } from "sonner";

const SubmitBtn = ({ eventId }: { eventId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { votes } = useVoteContext();

  const handleSubmit = async (data: IDetectedBarcode) => {
    setOpen(false);
    setLoading(true);

    const { success, message } = await submitVote(
      {
        king: votes.king?.id,
        queen: votes.queen?.id,
        prince: votes.prince?.id,
        princess: votes.princess?.id,
      },
      eventId,
      data.rawValue
    );
    if (!success) {
      toast.error(message);
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <SendHorizonal />}{" "}
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>Please scan your student ID card.</DialogTitle>
        </DialogHeader>

        <QrCodeScanner update={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default SubmitBtn;
