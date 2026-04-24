import { LoaderIcon } from "lucide-react";
import BrandMark from "./BrandMark";

function ChatLoader() {
  return (
    <div className="page-shell flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <div className="editorial-card flex w-full max-w-xl flex-col items-center gap-5 px-8 py-12 text-center">
        <BrandMark />
        <LoaderIcon className="size-10 animate-spin text-primary" />
        <div className="space-y-2">
          <p className="font-display text-3xl">Connecting your conversation</p>
          <p className="text-sm leading-7 text-base-content/68">
            Opening the room and syncing your shared space.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatLoader;
