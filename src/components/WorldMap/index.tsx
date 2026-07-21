import { useCallback, useEffect, useState } from 'react';

import type { RichIsland, RichMap, Settings } from '@/types';

import styles from '@/styles/map.module.scss';

import { LUXURY_RESOURCE_COUNTS } from '../Settings/constants';
import IslandCell from './IslandCell';
import { addRichData, parseMapData } from './utils';

interface Props {
    selectedIsland: RichIsland | null;
    setSelectedIsland: (island: RichIsland | null) => void;
    settings: Settings;
}

const WorldMap = ({ selectedIsland, setSelectedIsland, settings }: Props) => {
    const [worldMap, setWorldMap] = useState<RichMap | null>(null);

    useEffect(() => {
        fetch('data.json')
            .then((res) => res.json())
            .then(parseMapData)
            .then(addRichData)
            .then(setWorldMap);
    }, []);

    const getIsland = useCallback(
        (x: string, y: string) => {
            return worldMap && worldMap[x] ? worldMap[x][y] : null;
        },
        [worldMap],
    );

    const isValidMonument = (island: RichIsland): boolean =>
        settings.selectedMonuments.indexOf(island.monument) !== -1 &&
        (!settings.highlightMonumentOnlyInSelectedIslandGroup || isValidIsland(island));

    const isValidResource = (island: RichIsland): boolean =>
        settings.selectedResources.indexOf(island.resource) !== -1 &&
        (!settings.highlightResourcesOnlyInSelectedIslandGroup || isValidIsland(island));

    const isValidIsland = (island: RichIsland): boolean =>
        (settings.selectedIslandGroupSize === null || settings.selectedIslandGroupSize === island.neighborsCount) &&
        settings.minimumCounts['WINE'] <= island.neighborsResourceCounts.WINE &&
        settings.minimumCounts['MARBLE'] <= island.neighborsResourceCounts.MARBLE &&
        settings.minimumCounts['CRYSTAL_GLASS'] <= island.neighborsResourceCounts.CRYSTAL_GLASS &&
        settings.minimumCounts['SULPHUR'] <= island.neighborsResourceCounts.SULPHUR;

    const isIslandSettingsSelected = (): boolean =>
        settings.selectedIslandGroupSize !== null ||
        settings.minimumCounts['WINE'] > LUXURY_RESOURCE_COUNTS['WINE'][0] ||
        settings.minimumCounts['MARBLE'] > LUXURY_RESOURCE_COUNTS['MARBLE'][0] ||
        settings.minimumCounts['CRYSTAL_GLASS'] > LUXURY_RESOURCE_COUNTS['CRYSTAL_GLASS'][0] ||
        settings.minimumCounts['SULPHUR'] > LUXURY_RESOURCE_COUNTS['SULPHUR'][0];

    const getExtraClass = (island: RichIsland | null) =>
        island
            ? settings.highlightOnlyMachesWithBothSelected
                ? isValidMonument(island) && isValidResource(island)
                    ? styles.selectedBoth
                    : ''
                : isValidMonument(island)
                  ? styles.selectedMonument
                  : isValidResource(island)
                    ? styles.selectedResource
                    : isIslandSettingsSelected() && isValidIsland(island)
                      ? styles.selectedIslandGroup
                      : ''
            : '';

    return (
        <div className={styles.map}>
            {Array.from(Array(100)).map((_, i) => (
                <div key={i} className={styles.row}>
                    {Array.from(Array(100))
                        .map((_, j) => getIsland(String(j + 1), String(i + 1)))
                        .map((island, j) => (
                            <IslandCell
                                key={i * 100 + j}
                                extraClass={getExtraClass(island)}
                                island={island}
                                selected={island?.id ? island.id === selectedIsland?.id : false}
                                setSelectedIsland={setSelectedIsland}
                            />
                        ))}
                </div>
            ))}
        </div>
    );
};

export default WorldMap;
