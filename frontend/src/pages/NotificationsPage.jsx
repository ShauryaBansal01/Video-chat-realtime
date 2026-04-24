import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BellIcon,
  Clock3Icon,
  MessageSquareHeartIcon,
  UserCheckIcon,
} from "lucide-react";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import NoNotificationsFound from "../components/NoNotificationsFound";
import PageShell from "../components/PageShell";
import SectionHeader from "../components/SectionHeader";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <PageShell
      eyebrow="Activity inbox"
      title="Keep up with the people reaching for conversation."
      description="Every invite, new connection, and moment of momentum lands here so you can keep your language exchange moving."
    >
      {isLoading ? (
        <div className="editorial-card flex justify-center px-6 py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <div className="space-y-8">
          {incomingRequests.length > 0 ? (
            <section className="space-y-5">
              <SectionHeader
                eyebrow="Pending"
                title="Friend requests"
                description="People who want to start practicing with you."
                action={
                  <div className="pill-badge">
                    <UserCheckIcon className="size-4 text-primary" />
                    {incomingRequests.length} waiting
                  </div>
                }
              />

              <div className="grid gap-4">
                {incomingRequests.map((request) => (
                  <article
                    key={request._id}
                    className="editorial-card flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="avatar size-16">
                        <img src={request.sender.profilePic} alt={request.sender.fullName} />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl leading-none">
                          {request.sender.fullName}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="pill-badge">Native: {request.sender.nativeLanguage}</span>
                          <span className="pill-badge">
                            Learning: {request.sender.learningLanguage}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary rounded-full px-6"
                      onClick={() => acceptRequestMutation(request._id)}
                      disabled={isPending}
                    >
                      Accept request
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {acceptedRequests.length > 0 ? (
            <section className="space-y-5">
              <SectionHeader
                eyebrow="New connections"
                title="Recently accepted"
                description="Warm starts for conversations that just opened up."
                action={
                  <div className="pill-badge">
                    <BellIcon className="size-4 text-secondary" />
                    Fresh activity
                  </div>
                }
              />

              <div className="grid gap-4">
                {acceptedRequests.map((notification) => (
                  <article
                    key={notification._id}
                    className="editorial-card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="avatar size-14">
                        <img
                          src={notification.recipient.profilePic}
                          alt={notification.recipient.fullName}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{notification.recipient.fullName}</h3>
                        <p className="mt-1 text-sm leading-7 text-base-content/68">
                          {notification.recipient.fullName} accepted your request. Your next great
                          conversation can start now.
                        </p>
                        <div className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-base-content/45">
                          <Clock3Icon className="size-4" />
                          Recently
                        </div>
                      </div>
                    </div>

                    <div className="pill-badge">
                      <MessageSquareHeartIcon className="size-4 text-primary" />
                      New friend
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {incomingRequests.length === 0 && acceptedRequests.length === 0 ? (
            <NoNotificationsFound />
          ) : null}
        </div>
      )}
    </PageShell>
  );
};

export default NotificationsPage;
