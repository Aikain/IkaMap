import { useState } from 'react';

import { RichIsland, Settings as SettingsType } from '@/types';

import IslandDetails from '@/components/Info';
import Settings from '@/components/Settings';
import WorldMap from '@/components/WorldMap';

import styles from '@/styles/app.module.scss';

import { LUXURY_RESOURCE_COUNTS } from './components/Settings/constants';

const App = () => {
    const [selectedIsland, setSelectedIsland] = useState<RichIsland | null>(null);
    const [settings, setSettings] = useState<SettingsType>({
        highlightResourcesOnlyInSelectedIslandGroup: true,
        highlightMonumentOnlyInSelectedIslandGroup: true,
        highlightOnlyMachesWithBothSelected: false,
        selectedIslandGroupSize: null,
        selectedMonuments: [],
        selectedResources: [],
        minimumCounts: {
            WINE: LUXURY_RESOURCE_COUNTS['WINE'][0],
            MARBLE: LUXURY_RESOURCE_COUNTS['MARBLE'][0],
            CRYSTAL_GLASS: LUXURY_RESOURCE_COUNTS['CRYSTAL_GLASS'][0],
            SULPHUR: LUXURY_RESOURCE_COUNTS['SULPHUR'][0],
        },
    });

    return (
        <div className={styles.main}>
            <WorldMap selectedIsland={selectedIsland} setSelectedIsland={setSelectedIsland} settings={settings} />
            <div className={styles.sidePanel}>
                <IslandDetails island={selectedIsland} />
                <Settings settings={settings} setSettings={setSettings} />
            </div>
        </div>
    );
};

export default App;
