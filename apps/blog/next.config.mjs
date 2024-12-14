import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["next-mdx-remote"],
};

export default MillionLint.next({
  enabled: true,
  rsc: true,
})(nextConfig);
