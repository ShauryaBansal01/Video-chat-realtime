import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  Globe2Icon,
  HomeIcon,
  MessageSquareQuoteIcon,
  UsersIcon,
} from "lucide-react";
import BrandMark from "./BrandMark";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: "/", label: "Home", icon: HomeIcon, match: currentPath === "/" },
    { to: "/friends", label: "Friends", icon: UsersIcon, match: currentPath === "/friends" },
    {
      to: "/notifications",
      label: "Notifications",
      icon: BellIcon,
      match: currentPath === "/notifications",
    },
  ];

  return (
    <aside className="nav-rail sticky top-0 h-screen">
      <div className="space-y-8">
        <BrandMark />

        <div className="editorial-card bg-neutral text-neutral-content">
          <div className="space-y-4 p-5">
            <p className="text-xs uppercase tracking-[0.32em] text-neutral-content/60">
              Global exchange
            </p>
            <h2 className="font-display text-3xl leading-tight">
              Find your people. Keep the conversation alive.
            </h2>
            <p className="text-sm leading-7 text-neutral-content/72">
              Move from introductions to real-time practice in a space built for language rituals.
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${item.match ? "nav-link-active" : ""}`}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="editorial-card mt-auto p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring-2 ring-primary/20">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-success">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>

        <div className="space-y-3 rounded-[1.4rem] border border-base-300/60 bg-base-200/60 p-4 text-sm text-base-content/70">
          <div className="flex items-center gap-3">
            <Globe2Icon className="size-4 text-secondary" />
            <span>Meet native speakers across time zones.</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquareQuoteIcon className="size-4 text-primary" />
            <span>Turn matches into daily conversation habits.</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
