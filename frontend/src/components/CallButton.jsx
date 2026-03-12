import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute right-4 top-3 z-10">
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-sm gap-1 text-white shadow-md hover:shadow-lg transition-all duration-200"
      >
        <VideoIcon className="size-5" />
      </button>
    </div>
  );
}

export default CallButton;