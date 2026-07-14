export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export const DEFAULT_CITIES: City[] = [
  { id: "denver", name: "Denver", latitude: 39.7392, longitude: -104.9847, country: "United States", admin1: "Colorado" }
];
