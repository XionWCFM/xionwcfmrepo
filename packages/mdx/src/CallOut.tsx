type CallOutProps = {
  variant?: "info" | "success" | "warning" | "error";
  children: React.ReactNode;
};

export const CallOut = ({ variant, children }: CallOutProps) => {
  return (
    <div
      className={`px-32 py-24 flex bg-primary-alpha-50 text-primary-600 rounded-md flex-col gap-y-16 list-disc font-regular`}
    >
      {variant} {children}
    </div>
  );
};
