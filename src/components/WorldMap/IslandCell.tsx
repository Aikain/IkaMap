import { memo } from 'react';

import { RichIsland } from '@/types';

import styles from '@/styles/map.module.scss';

interface Props {
    extraClass?: string;
    island: RichIsland | null;
    selected: boolean;
    setSelectedIsland: (island: RichIsland | null) => void;
}

const IslandCell = memo(
    ({ extraClass, island, selected, setSelectedIsland }: Props) => {
        const handleMouseEnter = () => (island ? setSelectedIsland(island) : setSelectedIsland(null));

        return (
            <div
                className={`${styles.cell} ${island ? styles.land : styles.water} ${selected ? styles.selected : ''} ${extraClass}`}
                onMouseEnter={handleMouseEnter}
            />
        );
    },
    (oldProps, newProps) =>
        oldProps.island?.id === newProps.island?.id &&
        oldProps.selected === newProps.selected &&
        oldProps.extraClass === newProps.extraClass,
);

export default IslandCell;
