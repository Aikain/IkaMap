export type Resource = 'BUILDING_MATERIAL' | LuxuryResource;
export type LuxuryResource = 'WINE' | 'MARBLE' | 'CRYSTAL_GLASS' | 'SULPHUR';
export type Monument =
    | 'HEPHAESTUS_FORGE'
    | 'HADES_HOLY_GROVE'
    | 'DEMETERS_GARDENS'
    | 'ATHENAS_PARTHENON'
    | 'TEMPLE_OF_HERMES'
    | 'ARES_STRONGHOLD'
    | 'TEMPLE_OF_POSEIDON'
    | 'COLOSSUS';

export type RawIsland = [
    string, // ID
    string, // Name
    string, // Resources
    string, // Monuments
    null, // string, // ???
    string, // Shape
    null, // string, // ???
    null, // string, // Town count
    null, // number, // Pirate flag, 1 => not in range, 2 => in range
    null, // string, // Helios
    null, // string, // Red vs Blue
    null, // string, // Red vs Blue
];

export type Island = {
    id: string;
    name: string;
    resource: LuxuryResource;
    monument: Monument;
};

export type RichIsland = Island & {
    x: string;
    y: string;
    neighborsCount: number;
};

export type RawMap = Record<string, Record<string, RawIsland>>;
export type ParsedMap = Record<string, Record<string, Island>>;
export type RichMap = Record<string, Record<string, RichIsland>>;
