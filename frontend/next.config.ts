import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./styles"],
    prependData: `@import "@/styles/utils/_variables.scss"; @import "@/styles/utils/_mixins.scss";`,
  },
};

export default nextConfig;
