import { Island, LuxuryResource, Monument, ParsedMap, RawIsland, RawMap, RichIsland, RichMap } from '@/types';

const parseResource = (resourceNumber: string): LuxuryResource => {
    switch (resourceNumber) {
        case '1':
            return 'WINE';
        case '2':
            return 'MARBLE';
        case '3':
            return 'CRYSTAL_GLASS';
        case '4':
        default:
            return 'SULPHUR';
    }
};

const parseMonument = (monumentNumber: string): Monument => {
    switch (monumentNumber) {
        case '1':
            return 'HEPHAESTUS_FORGE';
        case '2':
            return 'HADES_HOLY_GROVE';
        case '3':
            return 'DEMETERS_GARDENS';
        case '4':
            return 'ATHENAS_PARTHENON';
        case '5':
            return 'TEMPLE_OF_HERMES';
        case '6':
            return 'ARES_STRONGHOLD';
        case '7':
            return 'TEMPLE_OF_POSEIDON';
        case '8':
        default:
            return 'COLOSSUS';
    }
};

const parseIslandData = (data: RawIsland): Island => ({
    id: data[0],
    name: data[1],
    resource: parseResource(data[2]),
    monument: parseMonument(data[3]),
});

export const parseMapData = (data: RawMap): ParsedMap =>
    Object.keys(data).reduce((total, x) => {
        total[x] = Object.keys(data[x]).reduce(
            (total, y) => {
                total[y] = parseIslandData(data[x][y]);
                return total;
            },
            {} as Record<string, Island>,
        );
        return total;
    }, {} as ParsedMap);

const getIsland = (map: ParsedMap, x: string, y: string) => (map && map[x] ? map[x][y] : null);

const getNeighboursData = (
    map: ParsedMap,
    x: string,
    y: string,
): Pick<RichIsland, 'neighborsCount' | 'neighborsResourceCounts'> => {
    const neighborsResourceCounts: RichIsland['neighborsResourceCounts'] = {
        WINE: 0,
        MARBLE: 0,
        CRYSTAL_GLASS: 0,
        SULPHUR: 0,
    };

    const island = getIsland(map, x, y);
    if (!island) return { neighborsCount: -1, neighborsResourceCounts: neighborsResourceCounts };

    const checked: string[] = [island.id];
    neighborsResourceCounts[island.resource] += 1;

    const innerCheck = (x: string, y: string) => {
        let tmp = getIsland(map, String(parseInt(x) - 1), y);
        if (tmp && checked.indexOf(tmp.id) === -1) {
            checked.push(tmp.id);
            neighborsResourceCounts[tmp.resource] += 1;
            innerCheck(String(parseInt(x) - 1), y);
        }
        tmp = getIsland(map, String(parseInt(x) + 1), y);
        if (tmp && checked.indexOf(tmp.id) === -1) {
            checked.push(tmp.id);
            neighborsResourceCounts[tmp.resource] += 1;
            innerCheck(String(parseInt(x) + 1), y);
        }
        tmp = getIsland(map, x, String(parseInt(y) - 1));
        if (tmp && checked.indexOf(tmp.id) === -1) {
            checked.push(tmp.id);
            neighborsResourceCounts[tmp.resource] += 1;
            innerCheck(x, String(parseInt(y) - 1));
        }
        tmp = getIsland(map, x, String(parseInt(y) + 1));
        if (tmp && checked.indexOf(tmp.id) === -1) {
            checked.push(tmp.id);
            neighborsResourceCounts[tmp.resource] += 1;
            innerCheck(x, String(parseInt(y) + 1));
        }
    };

    innerCheck(x, y);

    return {
        neighborsCount: checked.length,
        neighborsResourceCounts,
    };
};

const addRichIslandData = (island: Island, map: ParsedMap, x: string, y: string): RichIsland => ({
    ...island,
    x,
    y,
    ...getNeighboursData(map, x, y),
});

export const addRichData = (map: ParsedMap): RichMap =>
    Object.keys(map).reduce((total, x) => {
        total[x] = Object.keys(map[x]).reduce(
            (total, y) => {
                total[y] = addRichIslandData(map[x][y], map, x, y);
                return total;
            },
            {} as Record<string, RichIsland>,
        );
        return total;
    }, {} as RichMap);
