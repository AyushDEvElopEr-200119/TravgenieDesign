import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/travel-policies")({
  beforeLoad: () => {
    throw redirect({ to: "/policies" });
  },
});

