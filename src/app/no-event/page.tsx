import { CircleCheck } from "lucide-react";

const NoEvent = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg"></div>
      <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-12 text-center">
        <CircleCheck
          size={100}
          className="text-green-500"
        />
        <h1 className="font-bold text-3xl">Voting event has ended.</h1>
        <p>Results will be announced soon. Thank you for participating.</p>
      </div>
    </div>
  );
};

export default NoEvent;
