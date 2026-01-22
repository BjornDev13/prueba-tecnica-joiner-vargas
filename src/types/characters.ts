import type { Character } from ".";

export interface CharacterFilters {
    filterName: string;
    setFilterName: (value: string) => void;
    filterRace: string;
    setFilterRace: (value: string) => void;
    filterKi: string;
    setFilterKi: (value: string) => void;
    filterAffiliation: string;
    setFilterAffiliation: (value: string) => void;
    filterGender: string;
    setFilterGender: (value: string) => void;
}

export interface CharacterGridProps {
    uniqueCharacters: Character[];
    handleEdit: (character: Character) => void;
    handleDelete: (character: Character) => void;
    user: { role: string } | null;
}

export interface ICharacterForm {
    id?: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    description: string;
    originPlanet: string;
    affiliation: string;
    image: string;
}