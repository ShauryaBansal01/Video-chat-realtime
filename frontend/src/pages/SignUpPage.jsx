import { useState } from "react";
import { Link } from "react-router";
import { HeartHandshakeIcon, SparklesIcon } from "lucide-react";
import useSignUp from "../hooks/useSignUp";
import BrandMark from "../components/BrandMark";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="auth-shell" data-theme="streamify_daybreak">
      <div className="auth-card animate-rise">
        <section className="auth-editorial-side">
          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-12">
            <BrandMark />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.24em] text-neutral-content/80">
                <HeartHandshakeIcon className="size-4" />
                Start with warmth
              </div>
              <h1 className="font-display text-5xl leading-[1.05] text-neutral-content xl:text-6xl">
                Find people who make practice feel natural, not forced.
              </h1>
              <p className="max-w-xl text-base leading-8 text-neutral-content/75">
                Create your profile, share what you speak and what you’re learning, and we’ll shape
                a more human network around those details.
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-neutral-content/75">
              Less noise. Better introductions. Real-time conversation when you’re ready.
            </div>
          </div>
        </section>

        <section className="auth-form-side">
          <div className="mx-auto max-w-lg space-y-8">
            <div className="lg:hidden">
              <BrandMark />
            </div>

            <div className="space-y-3">
              <p className="page-eyebrow">New account</p>
              <h2 className="font-display text-4xl leading-tight">Create your Streamify identity</h2>
              <p className="text-sm leading-7 text-base-content/65">
                Build your first profile and step into a calmer social language app.
              </p>
            </div>

            {error ? (
              <div className="rounded-[1.4rem] border border-error/20 bg-error/10 px-4 py-4 text-sm text-error">
                {error.response?.data?.message || "Could not create your account."}
              </div>
            ) : null}

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="field-label">Full name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="soft-input"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="field-label">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="soft-input"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="field-label">Password</label>
                <input
                  type="password"
                  placeholder="Choose a secure password"
                  className="soft-input"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
                <p className="mt-2 text-sm text-base-content/55">
                  Use at least 6 characters so your account is ready for long-term use.
                </p>
              </div>

              <label className="editorial-card flex cursor-pointer items-start gap-3 px-4 py-4 text-sm text-base-content/70">
                <input type="checkbox" className="checkbox checkbox-sm mt-1" required />
                <span>
                  I agree to the terms of service and privacy policy so Streamify can create and
                  protect my account.
                </span>
              </label>

              <button className="btn btn-primary w-full rounded-full" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Creating your space...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="size-4" />
                    Create account
                  </>
                )}
              </button>
            </form>

            <p className="text-sm text-base-content/65">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUpPage;
