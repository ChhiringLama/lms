import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-blue-500 font-mono">
      <h1 className="text-4xl mb-4">[404]</h1>
      <p className="text-lg">The page you’re looking for doesn’t exist...</p>
      <a
        href="/"
        className="mt-6 text-green-400 underline hover:text-green-300"
      >
        <Button>
        Return Home
        </Button>
      </a>
    </div>
  );
};

export default NotFound;
