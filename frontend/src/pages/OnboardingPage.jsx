import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  CameraIcon,
  LoaderIcon,
  MapPinIcon,
  ShuffleIcon,
  SparklesIcon,
} from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { completeOnboarding } from "../lib/api";
import { LANGUAGES } from "../constants";
import BrandMark from "../components/BrandMark";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Could not complete onboarding.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="auth-shell">
      <div className="editorial-card grid w-full max-w-6xl overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="bg-neutral px-8 py-10 text-neutral-content sm:px-10 lg:px-12">
          <div className="space-y-8">
            <BrandMark />
            <div className="space-y-5">
              <p className="page-eyebrow text-primary-content/70">Guided setup</p>
              <h1 className="font-display text-5xl leading-[1.05]">
                Shape the profile people will want to message.
              </h1>
              <p className="max-w-md text-sm leading-8 text-neutral-content/74">
                A few small details help us match you more thoughtfully and make your first
                conversations feel easier.
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-content/55">
                What this unlocks
              </p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-content/75">
                <p>Better recommendations based on what you speak and what you’re learning.</p>
                <p>A more expressive first impression when new partners discover your profile.</p>
                <p>Faster transitions from matching into messaging and calls.</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="bg-base-100/90 px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <p className="page-eyebrow">Complete profile</p>
              <h2 className="font-display text-4xl leading-tight">Make your introduction feel personal</h2>
              <p className="text-sm leading-7 text-base-content/65">
                Thoughtful details create warmer matches and faster conversation starts.
              </p>
            </div>

            <div className="editorial-panel flex flex-col items-center gap-5 px-6 py-7 text-center sm:flex-row sm:text-left">
              <div className="relative">
                <div className="flex size-28 items-center justify-center overflow-hidden rounded-full border border-base-300/70 bg-base-100">
                  {formState.profilePic ? (
                    <img
                      src={formState.profilePic}
                      alt="Profile Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <CameraIcon className="size-10 text-base-content/35" />
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-3xl">Portrait and presence</h3>
                <p className="max-w-md text-sm leading-7 text-base-content/65">
                  Choose a friendly avatar so new partners feel like they’re meeting a real person.
                </p>
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent rounded-full">
                  <ShuffleIcon className="size-4" />
                  Generate avatar
                </button>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="field-label">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="soft-input"
                  placeholder="Your full name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="field-label">Bio</label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="soft-textarea"
                  placeholder="Tell people what you’re learning, what kind of conversations you enjoy, or the cultural exchange you’re looking for."
                />
              </div>

              <div>
                <label className="field-label">Native language</label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="soft-select"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="field-label">Learning language</label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="soft-select"
                >
                  <option value="">Select the language you&apos;re learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="field-label">Location</label>
                <div className="relative">
                  <MapPinIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="soft-input pl-11"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-full rounded-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <SparklesIcon className="size-4" />
                  Complete onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="size-4 animate-spin" />
                  Finishing your profile...
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default OnboardingPage;
