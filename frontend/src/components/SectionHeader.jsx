const SectionHeader = ({ eyebrow, title, description, action }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="page-eyebrow">{eyebrow}</p> : null}
        <h2 className="font-display text-3xl leading-tight text-base-content">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-base-content/68">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
};

export default SectionHeader;
