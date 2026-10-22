import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // `npm run build` runs OpenNext, so call Next directly to avoid recursion
  buildCommand: "npx next build",
};
