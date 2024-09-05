import { memo } from 'react';

import styles from '../../styles/map.module.scss';
import { RichIsland } from '../../types';

interface Props {
    island: RichIsland | null;
    selected: boolean;
    setSelectedIsland: (island: RichIsland | null) => void;
}

const IslandCell = memo(
    ({ island, selected, setSelectedIsland }: Props) => {
        const handleMouseEnter = () => (island ? setSelectedIsland(island) : setSelectedIsland(null));

        return (
            <div
                className={`${styles.cell} ${island ? styles.land : styles.water} ${selected ? styles.selected : ''}`}
                onMouseEnter={handleMouseEnter}
            />
        );
    },
    (oldProps, newProps) => oldProps.island?.id === newProps.island?.id && oldProps.selected === newProps.selected,
);

export default IslandCell;
