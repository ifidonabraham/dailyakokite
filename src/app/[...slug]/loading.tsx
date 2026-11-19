// Shown instantly when a reader taps a story, while the article streams in.
export default function ArticleLoading() {
  return (
    <main id="main" aria-busy="true" aria-label="Loading story">
      <div className="site-container py-8 md:py-12">
        <div className="reading-column animate-pulse">
          <div className="h-3 w-28 bg-black/10 mb-8" />
          <div className="border-y border-black/10 py-3 mb-8 flex justify-between">
            <div className="h-3 w-40 bg-black/10" />
            <div className="h-3 w-16 bg-black/10" />
          </div>
          <div className="space-y-3 mb-8">
            <div className="h-10 md:h-12 w-full bg-black/10" />
            <div className="h-10 md:h-12 w-4/5 bg-black/10" />
          </div>
          <div className="h-5 w-3/4 bg-black/[0.07] mb-10" />
          <div className="aspect-[16/9] w-full bg-black/[0.07] mb-10" />
          <div className="space-y-3">
            {[100, 96, 92, 98, 70].map((w, i) => (
              <div key={i} className="h-4 bg-black/[0.07]" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
