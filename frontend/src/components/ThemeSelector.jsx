import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost rounded-full border border-base-300/70 bg-base-100/60 px-4"
      >
        <PaletteIcon className="size-4" />
        <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] sm:inline">
          Theme
        </span>
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-3 w-72 rounded-[1.5rem] border border-base-300/70 bg-base-100/90 p-2 shadow-2xl backdrop-blur-xl"
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`flex w-full items-start gap-3 rounded-[1.25rem] px-4 py-3 text-left transition-colors ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-200/90"
              }`}
              onClick={() => setTheme(themeOption.name)}
            >
              <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-base-300/60 bg-base-100/80">
                <PaletteIcon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{themeOption.label}</p>
                <p className="mt-1 text-xs leading-5 text-base-content/60">
                  {themeOption.description}
                </p>
              </div>
              <div className="ml-auto flex gap-1 pt-2">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ThemeSelector;
