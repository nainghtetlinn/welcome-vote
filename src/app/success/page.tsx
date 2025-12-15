import { CircleCheck } from "lucide-react";

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg"></div>
      <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-12 w-75 text-center">
        <CircleCheck
          size={100}
          className="text-green-500"
        />
        <h1 className="font-bold text-3xl">Success!</h1>
        <h5>Your votes are successfully submitted.</h5>
      </div>
    </div>
  );
};

export default Success;
