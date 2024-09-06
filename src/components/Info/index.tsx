import { RichIsland } from '@/types';

import styles from '@/styles/info.module.scss';

import { translateMonument, translateResource } from './utils';

interface Props {
    island: RichIsland | null;
}

const IslandDetails = ({ island }: Props) => (
    <div className={styles.info}>
        <h2>
            [{island?.x ?? 'X'}:{island?.y ?? 'Y'}] {island?.name ?? '-'}
        </h2>
        <span>Resurssi: {island ? translateResource(island.resource) : '-'}</span>
        <span>Ihme: {island ? translateMonument(island.monument) : '-'}</span>
    </div>
);

export default IslandDetails;
