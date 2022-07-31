export type userDataType = {
  name: string;
  title: string;
  country?: number | null;
};

export type countryDataType = {
  id: number;
  name: string;
  country_code: string;
  population: number;
  area: number;
  currency: string;
  languages: number;
  flag: string;
  capital: string;
};
