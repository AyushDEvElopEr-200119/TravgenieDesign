import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/all-notifications")({
  beforeLoad: () => {
    throw redirect({ to: "/notifications" });
  },
});

