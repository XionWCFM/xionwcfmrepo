"use client";

import { MdxViewer } from "@repo/mdx";

export default function Page() {
  return (
    <div>
      <MdxViewer
        source={`
## Hello World

\`\`\`js {highlight=1}
const foo = "bar";
console.log(foo);
\`\`\`
`}
      />
    </div>
  );
}
