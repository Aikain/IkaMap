import { RichIsland } from '@/types';

import styles from '@/styles/info.module.scss';

import { translateMonument, translateResource } from './utils';

interface Props {
    island: RichIsland | null;
}

const IslandDetails = ({ island }: Props) => (
    <div className={styles.info}>
        <h2>
            {`[${island?.x ?? 'X'}:${island?.y ?? 'Y'}] ${island?.name ?? '-'} ${island ? ` - ${translateResource(island.resource)}` : ''} ${island ? ` - ${translateMonument(island.monument)}` : ''}`}
        </h2>
    </div>
);

export default IslandDetails;
