const EmptyState = ({ icon: Icon, title, description, action, compact = false }) => {
  return (
    <div
      className={`editorial-card border border-base-300/70 bg-base-100/85 text-center ${
        compact ? "px-6 py-8" : "px-8 py-12"
      }`}
    >
      {Icon ? (
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-primary">
          <Icon className="size-7" />
        </div>
      ) : null}
      <h3 className="font-display text-2xl text-base-content">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-base-content/70">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
