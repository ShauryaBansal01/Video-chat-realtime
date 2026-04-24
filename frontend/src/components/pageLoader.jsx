import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import BrandMark from "./BrandMark";

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div className="app-frame flex min-h-screen items-center justify-center px-4" data-theme={theme}>
      <div className="editorial-card flex w-full max-w-md flex-col items-center gap-5 px-8 py-10 text-center">
        <BrandMark />
        <LoaderIcon className="size-10 animate-spin text-primary" />
        <div>
          <p className="font-display text-2xl">Preparing your circle</p>
          <p className="mt-2 text-sm leading-7 text-base-content/65">
            We&apos;re bringing your conversations, recommendations, and theme together.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PageLoader;
