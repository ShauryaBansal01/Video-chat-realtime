const PageShell = ({ eyebrow, title, description, actions, children }) => {
  return (
    <div className="page-shell">
      <section className="page-hero animate-rise">
        <div className="space-y-4">
          {eyebrow ? <p className="page-eyebrow">{eyebrow}</p> : null}
          <div className="space-y-3">
            <h1 className="font-display text-4xl leading-tight text-base-content sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="max-w-2xl text-sm leading-7 text-base-content/70 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </section>

      <div className="space-y-8">{children}</div>
    </div>
  );
};

export default PageShell;
