import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  CompassIcon,
  MapPinIcon,
  SparklesIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { capitialize } from "../lib/utils";
import { getLanguageFlag } from "../lib/getLanguageFlag.jsx";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import PageShell from "../components/PageShell";
import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    outgoingFriendReqs.forEach((req) => {
      outgoingIds.add(req.recipient._id);
    });
    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingFriendReqs]);

  const metrics = [
    { label: "Friends", value: friends.length },
    { label: "Matches waiting", value: recommendedUsers.length },
    { label: "Requests sent", value: outgoingRequestsIds.size },
  ];

  return (
    <PageShell
      eyebrow="Editorial home"
      title="Build a practice circle that actually feels alive."
      description="Move between your existing language partners and new recommendations without the generic dashboard feel. This space is shaped around warm introductions, thoughtful discovery, and quick conversation starts."
      actions={
        <Link to="/notifications" className="btn btn-primary rounded-full px-6">
          <UsersIcon className="size-4" />
          Review requests
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <span className="metric-label">{metric.label}</span>
            <span className="metric-value">{metric.value}</span>
            <p className="text-sm leading-6 text-base-content/62">
              {metric.label === "Friends"
                ? "People you can message right away."
                : metric.label === "Matches waiting"
                  ? "Fresh recommendations based on your profile."
                  : "Open invitations already in motion."}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Your circle"
          title="Friends ready for conversation"
          description="These are the people already in your orbit. Jump back into a message whenever you want to practice."
        />

        {loadingFriends ? (
          <div className="editorial-card flex justify-center px-6 py-12">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Discovery"
          title="Recommended language partners"
          description="A warmer way to meet people aligned with your native language, goals, and location."
          action={
            <div className="pill-badge">
              <CompassIcon className="size-4 text-secondary" />
              Curated by profile fit
            </div>
          }
        />

        {loadingUsers ? (
          <div className="editorial-card flex justify-center px-6 py-12">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : recommendedUsers.length === 0 ? (
          <EmptyState
            icon={SparklesIcon}
            title="No fresh matches yet"
            description="We’ll surface more language partners as your network grows and more learners join your route."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {recommendedUsers.map((user) => {
              const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

              return (
                <article key={user._id} className="editorial-card flex flex-col gap-5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="avatar size-16 shrink-0 rounded-full">
                      <img src={user.profilePic} alt={user.fullName} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-display text-3xl leading-none">{user.fullName}</h3>
                      {user.location ? (
                        <div className="mt-2 flex items-center text-sm text-base-content/60">
                          <MapPinIcon className="mr-2 size-4 text-secondary" />
                          {user.location}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="pill-badge">
                      {getLanguageFlag(user.nativeLanguage)}
                      Native: {capitialize(user.nativeLanguage)}
                    </span>
                    <span className="pill-badge">
                      {getLanguageFlag(user.learningLanguage)}
                      Learning: {capitialize(user.learningLanguage)}
                    </span>
                  </div>

                  <p className="min-h-16 text-sm leading-7 text-base-content/68">
                    {user.bio || "Open to conversations, cultural exchange, and steady language practice."}
                  </p>

                  <button
                    className={`btn mt-auto w-full rounded-full ${
                      hasRequestBeenSent ? "btn-disabled border-none bg-base-200" : "btn-primary"
                    }`}
                    onClick={() => sendRequestMutation(user._id)}
                    disabled={hasRequestBeenSent || isPending}
                  >
                    {hasRequestBeenSent ? (
                      <>
                        <CheckCircleIcon className="size-4" />
                        Request sent
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="size-4" />
                        Invite to connect
                      </>
                    )}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default HomePage;
