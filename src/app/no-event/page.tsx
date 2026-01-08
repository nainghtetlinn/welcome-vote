import { CircleX } from "lucide-react";

const NoEvent = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg"></div>
      <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-12 w-75 text-center">
        <CircleX
          size={100}
          className="text-red-500"
        />
        <h1 className="font-bold text-3xl">Opps!</h1>
        <h5>There is no event.</h5>
      </div>
    </div>
  );
};

export default NoEvent;
