import { ReactNode } from "react";

type StatusMessageProps = {
  title: string;
  description: string;
  avatarIcon?: ReactNode;
};

const StatusMessage = ({
  avatarIcon,
  title,
  description,
}: StatusMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-44 h-44 mx-auto">
        <div className="absolute inset-0 rounded-full bg-blue-100/70" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[35%] w-40 h-16 rounded-2xl bg-white shadow-md opacity-80" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] w-44 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center">
          {avatarIcon}
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 text-center max-w-sm">
        {description}
      </p>
    </div>
  );
};

export default StatusMessage;
