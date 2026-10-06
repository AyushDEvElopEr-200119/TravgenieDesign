import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/my-trips")({
  beforeLoad: () => {
    throw redirect({ to: "/trips" });
  },
});

