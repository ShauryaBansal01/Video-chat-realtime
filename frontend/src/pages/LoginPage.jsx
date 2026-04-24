import { useState } from "react";
import { Link } from "react-router";
import { GlobeIcon, MailIcon, SparklesIcon } from "lucide-react";
import useLogin from "../hooks/useLogin";
import BrandMark from "../components/BrandMark";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="auth-shell" data-theme="streamify_daybreak">
      <div className="auth-card animate-rise">
        <section className="auth-editorial-side">
          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-12">
            <BrandMark />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.24em] text-neutral-content/80">
                <SparklesIcon className="size-4" />
                Conversation-first design
              </div>
              <h1 className="font-display text-5xl leading-[1.05] text-neutral-content xl:text-6xl">
                Return to the people helping you learn by speaking.
              </h1>
              <p className="max-w-xl text-base leading-8 text-neutral-content/75">
                Streamify turns language learning into an intimate social ritual, with warm spaces
                for discovery, friendship, and real-time practice.
              </p>
            </div>

            <div className="grid gap-4 text-sm text-neutral-content/75">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                Thoughtful matches, calmer pacing, and messaging that feels human instead of noisy.
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
                <GlobeIcon className="size-4" />
                Across cities, accents, and time zones
              </div>
            </div>
          </div>
        </section>

        <section className="auth-form-side">
          <div className="mx-auto max-w-lg space-y-8">
            <div className="lg:hidden">
              <BrandMark />
            </div>

            <div className="space-y-3">
              <p className="page-eyebrow">Welcome back</p>
              <h2 className="font-display text-4xl leading-tight">Sign in to your language circle</h2>
              <p className="text-sm leading-7 text-base-content/65">
                Pick up where your last conversation left off.
              </p>
            </div>

            {error ? (
              <div className="rounded-[1.4rem] border border-error/20 bg-error/10 px-4 py-4 text-sm text-error">
                {error.response?.data?.message || "Could not sign you in."}
              </div>
            ) : null}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="field-label">Email</label>
                <div className="relative">
                  <MailIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="soft-input pl-11"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="field-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="soft-input"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full rounded-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Signing you in...
                  </>
                ) : (
                  "Enter Streamify"
                )}
              </button>
            </form>

            <p className="text-sm text-base-content/65">
              Don&apos;t have an account yet?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
