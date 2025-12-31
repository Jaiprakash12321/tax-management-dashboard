import type { Tax, Country, UpdateTaxPayload } from "@/types";

// 🔴 CHECK THESE LINKS: Ensure these match your Assignment URLs exactly.
const TAXES_API_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/taxes";
const COUNTRIES_API_URL = "https://685013d7e7c42cfd17974a33.mockapi.io/countries";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`API error ${res.status}`);
    }

    return (await res.json()) as T;
}

export const taxApi = {
    // GET /taxes (Fetches the list of requests)
    getTaxes: async () => {
        const data = await request<Tax[]>(TAXES_API_URL);
        // Optional: Log data to console so you can inspect it in the browser
        console.log("Fetched Taxes:", data);
        return data;
    },

    // GET /taxes/:id
    getTaxById: (id: string) => request<Tax>(`${TAXES_API_URL}/${id}`),

    // PUT /taxes/:id
    updateTax: (id: string, payload: UpdateTaxPayload) =>
        request<Tax>(`${TAXES_API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        }),

    // GET /countries
    getCountries: () => request<Country[]>(COUNTRIES_API_URL),
};