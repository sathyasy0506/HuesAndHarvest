const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--bg-color)]">
      <div className="relative w-10 h-10 animate-sk-chase">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-sk-chase-dot"
            style={{ animationDelay: `${-1.1 + i * 0.1}s` }}
          >
            <div
              className="w-1/4 h-1/4 rounded-full bg-[var(--primary-color)] animate-sk-chase-dot-before"
              style={{ animationDelay: `${-1.1 + i * 0.1}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
