"use client";

import { useState } from "react";

export const PosthogDevTools = () => {
  const [_flags, _setFlags] = useState(null);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  return (
    <div className=" fixed bottom-[16px] right-[16px] z-20">
      <div className=" max-w-[300px] w-full bg-gray-100 px-[16px] py-[12px] rounded-[12px]"></div>
    </div>
  );
};
