import { LoaderCircle } from "lucide-react";

export function Loader() {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center">
      <LoaderCircle className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
}
