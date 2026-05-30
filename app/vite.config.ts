import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/sui-agent-payment-guard/",
  plugins: [react()],
});
