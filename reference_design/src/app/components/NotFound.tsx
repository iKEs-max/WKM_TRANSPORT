import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-onukpa-blue mb-4">404 - Not Found</h1>
      <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
      <Link 
        to="/"
        className="bg-onukpa-orange text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}
