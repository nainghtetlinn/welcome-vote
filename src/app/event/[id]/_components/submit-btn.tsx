"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, SendHorizonal } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { useVoteContext } from "@/providers/vote-provider";
import { submitVote } from "@/server-actions/submit-vote";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const SubmitBtn = ({ eventId }: { eventId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState<string>();
  const [captchaToken, setCaptchaToken] = useState<string>();
  const captchaRef = useRef<HCaptcha>(null);
  const { votes } = useVoteContext();

  const supabase = createClient();

  const handleSubmit = async () => {
    if (!votes.king || !votes.queen || !votes.prince || !votes.princess) return;

    setLoading(true);
    setSuccess(false);

    const { success, message } = await submitVote(
      {
        king: votes.king.id,
        queen: votes.queen.id,
        prince: votes.prince.id,
        princess: votes.princess.id,
      },
      eventId
    );
    if (!success) {
      toast.error(message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  const handleVerify = async (token: string) => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      console.log("User not found. Login anonymously.");
      const auth = await supabase.auth.signInAnonymously({
        options: {
          captchaToken: token,
        },
      });

      if (!auth.data.user) {
        toast.error("Cheating detected. You can no longer vote.");
      } else {
        console.log("Success.");
        setUserId(auth.data.user?.id);
      }
    } else {
      console.log("User found.");
      setUserId(data.user.id);
    }
    setCaptchaToken(token);
  };

  useEffect(() => {
    if (success) {
      captchaRef.current?.resetCaptcha();
    }
  }, [success]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (state) {
          if (!votes.king || !votes.queen || !votes.prince || !votes.princess) {
            toast.error("All votes are required");
            return;
          }
          setUserId("");
        }
        setOpen(state);
      }}
    >
      <DialogTrigger asChild>
        <Button disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <SendHorizonal />}
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please confirm</DialogTitle>
        </DialogHeader>

        <div className="w-full overflow-hidden">
          <HCaptcha
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_SITEKEY!}
            onVerify={handleVerify}
          />
        </div>

        <DialogFooter className="justify-end">
          <Button
            variant={"secondary"}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading || !captchaToken || !userId}
            onClick={handleSubmit}
          >
            Confirm {loading && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitBtn;
