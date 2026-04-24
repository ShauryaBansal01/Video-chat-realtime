import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import { VideoIcon } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../lib/api";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData = {} } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !callId) return;

      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="app-frame flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="editorial-card w-full max-w-7xl overflow-hidden">
        <div className="border-b border-base-300/70 bg-base-100/80 px-6 py-5">
          <p className="page-eyebrow">Call room</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-4xl leading-tight">Speak face to face</h1>
              <p className="mt-1 text-sm text-base-content/65">
                Streamify keeps the call wrapped in the same warm visual language as the rest of
                your exchange.
              </p>
            </div>
            <div className="pill-badge">
              <VideoIcon className="size-4 text-primary" />
              Live session
            </div>
          </div>
        </div>

        <div className="bg-base-200/55 p-3 sm:p-5">
          {client && call ? (
            <div className="overflow-hidden rounded-[1.7rem] border border-base-300/70 bg-base-100">
              <StreamVideo client={client}>
                <StreamCall call={call}>
                  <CallContent />
                </StreamCall>
              </StreamVideo>
            </div>
          ) : (
            <div className="flex min-h-[60vh] items-center justify-center px-6 py-16 text-center">
              <div>
                <p className="font-display text-3xl">Could not initialize the call</p>
                <p className="mt-3 text-sm leading-7 text-base-content/65">
                  Please refresh the page or try again in a moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
