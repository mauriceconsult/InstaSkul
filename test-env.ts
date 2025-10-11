import { config } from "dotenv";
config({ path: "./.env.local" });

console.log("MOMO_TARGET_ENVIRONMENT:", process.env.MOMO_TARGET_ENVIRONMENT);
console.log("MOMO_PRIMARY_KEY:", process.env.MOMO_PRIMARY_KEY);
console.log("MOMOUSER_ID:", process.env.MOMOUSER_ID);
console.log("MOMOUSER_SECRET:", process.env.MOMOUSER_SECRET);
console.log(
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:",
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
);
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);
console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
