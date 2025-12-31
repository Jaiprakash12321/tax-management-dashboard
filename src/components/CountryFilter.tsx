import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
// ✅ FIX 1: Added 'type' keyword here to satisfy 'verbatimModuleSyntax'
import type { Country } from "@/types";

// ✅ FIX 2: Interface matches exactly what Index.tsx is passing
interface CountryFilterProps {
    countries: Country[];
    selectedCountry: string;          // Expecting a single string, not an array
    onSelectCountry: (value: string) => void;
}

export function CountryFilter({
    countries,
    selectedCountry,
    onSelectCountry,
}: CountryFilterProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedCountry && selectedCountry !== "all"
                        ? countries.find((country) => country.name === selectedCountry)?.name
                        : "Filter by country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                value="all"
                                onSelect={() => {
                                    onSelectCountry("all");
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedCountry === "all" ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                All Countries
                            </CommandItem>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.id}
                                    value={country.name}
                                    onSelect={(currentValue) => {
                                        // Logic: if clicking the same country, reset to "all"
                                        onSelectCountry(
                                            currentValue === selectedCountry ? "all" : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedCountry === country.name
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {country.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}