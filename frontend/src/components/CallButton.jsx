import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute right-4 top-4 z-10">
      <button
        onClick={handleVideoCall}
        className="btn btn-primary btn-sm gap-2 rounded-full border-none px-4 shadow-glow"
      >
        <VideoIcon className="size-4" />
        Start call
      </button>
    </div>
  );
}

export default CallButton;
