function MovieList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mx-auto grid max-w-sm grid-cols-1 gap-4 sm:max-w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </ul>
  );
}

export default MovieList;
