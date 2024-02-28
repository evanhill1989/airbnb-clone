import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

export default function AddressRoute() {
  const { getAllCountries } = useCountries();
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your home located?
        </h2>
      </div>

      <form action="">
        <div className="w-3/5 mx-auto">
          <div className="mb-5">
            <Select required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.flag}
                      {country.label}
                      {country.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </>
  );
}
