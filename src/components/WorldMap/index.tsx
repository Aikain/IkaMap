import { useCallback, useEffect, useState } from 'react';

import styles from '../../styles/map.module.scss';
import { RichIsland, RichMap } from '../../types';
import IslandCell from './IslandCell';
import { addRichData, parseMapData } from './utils';

interface Props {
    selectedIsland: RichIsland | null;
    setSelectedIsland: (island: RichIsland | null) => void;
}

const WorldMap = ({ selectedIsland, setSelectedIsland }: Props) => {
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

    return (
        <div className={styles.map}>
            {Array.from(Array(100)).map((_, i) => (
                <div key={i} className={styles.row}>
                    {Array.from(Array(100))
                        .map((_, j) => getIsland(String(j + 1), String(i + 1)))
                        .map((island, j) => (
                            <IslandCell
                                key={i * 100 + j}
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
