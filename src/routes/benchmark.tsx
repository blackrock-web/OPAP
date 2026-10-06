import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/benchmark")({
  beforeLoad: () => {
    throw redirect({ to: "/batch-lab" });
  },
  component: () => null,
});
