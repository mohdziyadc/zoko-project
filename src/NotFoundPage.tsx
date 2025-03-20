import { Ban } from "lucide-react";
import React from "react";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-screen">
      <div>
        <Ban className="h-32 w-32 text-primary" />
      </div>
      <div className="text-4xl text-primary font-bold">404 Not Found</div>
    </div>
  );
};

export default NotFoundPage;
