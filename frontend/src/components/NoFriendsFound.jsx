import { Globe2Icon } from "lucide-react";
import EmptyState from "./EmptyState";

const NoFriendsFound = () => {
  return (
    <EmptyState
      icon={Globe2Icon}
      title="Your circle starts here"
      description="You haven’t added any practice partners yet. Explore thoughtful matches below and start building a language circle that feels personal."
      compact
    />
  );
};

export default NoFriendsFound;
