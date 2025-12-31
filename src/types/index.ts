export interface Tax {
  id: string;
  name: string;
  // The API has both 'country' (raw input) and 'normalizedCountry' (clean input)
  country: string;
  normalizedCountry?: string;
  gender: string;
  entity: string;
  requestDate: string;
  createdAt: string;
  tax?: number;
  date?: string;
  countryId?: string;
}

export interface Country {
  id: string;
  name: string;
}

export interface UpdateTaxPayload {
  name?: string;
  entity?: string;
  gender?: string;
  country?: string;
  requestDate?: string;
}