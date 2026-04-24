import { BellIcon } from "lucide-react";
import EmptyState from "./EmptyState";

function NoNotificationsFound() {
  return (
    <EmptyState
      icon={BellIcon}
      title="Your inbox is calm"
      description="Friend requests, new connections, and future activity will land here when someone reaches out."
    />
  );
}

export default NoNotificationsFound;
