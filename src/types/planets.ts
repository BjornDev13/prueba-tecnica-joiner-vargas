export interface PlanetFilters {
    filterName: string;
    setFilterName: React.Dispatch<React.SetStateAction<string>>;
    filterDestroyed?: boolean;
    setFilterDestroyed: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}