import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";

const BrandMark = ({ to = "/", compact = false }) => {
  return (
    <Link to={to} className="inline-flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-soft">
        <ShipWheelIcon className="size-5" />
      </div>
      <div className={compact ? "hidden sm:block" : ""}>
        <p className="font-display text-2xl leading-none tracking-[0.08em] text-base-content">
          Streamify
        </p>
        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.35em] text-base-content/50">
          Language circles
        </p>
      </div>
    </Link>
  );
};

export default BrandMark;
