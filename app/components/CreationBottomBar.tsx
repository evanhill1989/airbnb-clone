import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreationSubmit } from "./SubmitButtons";

export function CreationBottomBar() {
  return (
    <div className="fixed bottom-0 w-full z-10 bg-white border-t h-24">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Button variant="secondary" size="lg" asChild>
          <Link href="/">Cancel</Link>
        </Button>

        <CreationSubmit />
      </div>
    </div>
  );
}