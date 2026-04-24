import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, MessageCircleHeartIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import BrandMark from "./BrandMark";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="shell-topbar">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          {isChatPage ? (
            <BrandMark compact />
          ) : (
            <div>
              <p className="page-eyebrow">Conversation-first network</p>
              <p className="mt-1 text-sm text-base-content/60">
                Build your circle and keep the language flowing.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/notifications"
            className="btn btn-ghost rounded-full border border-base-300/70 bg-base-100/60 px-4"
          >
            <BellIcon className="size-4" />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] sm:inline">
              Inbox
            </span>
          </Link>

          <button className="hidden rounded-full border border-base-300/70 bg-base-100/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-base-content/65 md:inline-flex md:items-center md:gap-2">
            <MessageCircleHeartIcon className="size-4 text-secondary" />
            {isChatPage ? "Live chat" : "Practice mode"}
          </button>

          <ThemeSelector />

          <div className="hidden items-center gap-3 rounded-full border border-base-300/70 bg-base-100/65 px-2.5 py-2 sm:flex">
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-primary/15">
                <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
              </div>
            </div>
            <div className="pr-1">
              <p className="text-sm font-semibold leading-none">{authUser?.fullName}</p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-base-content/50">
                Ready to connect
              </p>
            </div>
          </div>

          <button
            className="btn btn-ghost rounded-full border border-base-300/70 bg-base-100/60 px-4"
            onClick={logoutMutation}
          >
            <LogOutIcon className="size-4" />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] sm:inline">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
