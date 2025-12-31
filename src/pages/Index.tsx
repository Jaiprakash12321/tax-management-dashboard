import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { taxApi } from "@/api/taxApi";
import { TaxTable } from "@/components/TaxTable";
import { CountryFilter } from "@/components/CountryFilter";
// If you haven't created the toaster yet, you can comment this import out
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
    // State for the currently selected country filter
    const [selectedCountry, setSelectedCountry] = useState<string>("all");

    // 1. Fetch Taxes from API
    const { data: taxes = [], isLoading: taxesLoading, isError } = useQuery({
        queryKey: ["taxes"],
        queryFn: taxApi.getTaxes,
    });

    // 2. Fetch Countries from API
    const { data: countries = [], isLoading: countriesLoading } = useQuery({
        queryKey: ["countries"],
        queryFn: taxApi.getCountries,
    });

    // 3. Filter Logic (Frontend filtering)
    const filteredTaxes = selectedCountry === "all"
        ? taxes
        : taxes.filter((tax) => tax.country === selectedCountry);

    // Error State
    if (isError) {
        return <div className="p-10 text-red-500">Failed to load data from API.</div>;
    }

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tax Requests</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and track tax service requests.
                    </p>
                </div>

                {/* Country Filter Component */}
                <div className="w-full md:w-auto">
                    <CountryFilter
                        countries={countries}
                        selectedCountry={selectedCountry}
                        onSelectCountry={setSelectedCountry}
                    />
                </div>
            </div>

            {/* Main Table Area */}
            {taxesLoading || countriesLoading ? (
                <div className="flex justify-center items-center h-64 text-muted-foreground">
                    Loading data...
                </div>
            ) : (
                <div className="bg-card rounded-lg border shadow-sm">
                    <TaxTable data={filteredTaxes} />
                </div>
            )}

            {/* Optional: Toaster for notifications */}
            <Toaster />
        </div>
    );
};

export default Index;