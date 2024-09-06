import { Monument, Resource } from '@/types';

export const translateMonument = (monument: Monument): string => {
    switch (monument) {
        case 'HEPHAESTUS_FORGE':
            return 'Hephaistoksen paja';
        case 'HADES_HOLY_GROVE':
            return 'Hadesin pyhä lehto';
        case 'DEMETERS_GARDENS':
            return 'Demeterin puutarhat';
        case 'ATHENAS_PARTHENON':
            return 'Athenen temppeli';
        case 'TEMPLE_OF_HERMES':
            return 'Hermeksen temppeli';
        case 'ARES_STRONGHOLD':
            return 'Aresin linnake';
        case 'TEMPLE_OF_POSEIDON':
            return 'Poseidonin temppeli';
        case 'COLOSSUS':
            return 'Kolossus';
    }
};

export const translateResource = (resource: Resource): string => {
    switch (resource) {
        case 'BUILDING_MATERIAL':
            return 'Rakennusmateriaali';
        case 'WINE':
            return 'Viini';
        case 'MARBLE':
            return 'Marmori';
        case 'CRYSTAL_GLASS':
            return 'Kristallilasi';
        case 'SULPHUR':
            return 'Rikki';
    }
};
