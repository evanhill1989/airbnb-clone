import { SelectCategory } from "@/app/components/SelectCategory";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createCategoryPage } from "@/app/actions";
import { CreationSubmit } from "@/app/components/SubmitButtons";
export default function StructureRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectCategory />
        <div className="fixed bottom-0 w-full z-10 bg-white border-t h-24">
          <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/">Cancel</Link>
            </Button>

            <CreationSubmit />
          </div>
        </div>
      </form>
    </>
  );
}
