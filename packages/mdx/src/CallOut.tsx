type CallOutProps = {
  variant?: "info" | "success" | "warning" | "error";
  children: React.ReactNode;
};

export const CallOut = ({ variant, children }: CallOutProps) => {
  return (
    <div
      className={`px-32 py-24 flex  bg-success-600 rounded-md flex-col gap-y-16 list-disc font-regular text-neutral-600`}
    >
      {variant} {children}
    </div>
  );
};
