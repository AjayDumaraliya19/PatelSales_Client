export function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
