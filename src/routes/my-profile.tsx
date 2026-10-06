import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/my-profile")({
  beforeLoad: () => {
    throw redirect({ to: "/profile" });
  },
});

