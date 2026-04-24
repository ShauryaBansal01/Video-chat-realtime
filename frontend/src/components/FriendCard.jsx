import { MessageCircleIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router";
import { getLanguageFlag } from "../lib/getLanguageFlag.jsx";

const FriendCard = ({ friend }) => {
  return (
    <div className="editorial-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="avatar size-14 shrink-0">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-2xl">{friend.fullName}</h3>
            <p className="mt-1 text-sm text-base-content/60">
              Ready for your next practice session.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="pill-badge">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="pill-badge">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.22em] text-base-content/50 sm:flex">
            <SparklesIcon className="size-4 text-accent" />
            Active match
          </div>
          <Link to={`/chat/${friend._id}`} className="btn btn-primary ml-auto rounded-full px-5">
            <MessageCircleIcon className="size-4" />
            Message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
