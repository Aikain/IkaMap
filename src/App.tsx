import { useState } from 'react';

import IslandDetails from './components/Info';
import WorldMap from './components/WorldMap';
import styles from './styles/app.module.scss';
import { RichIsland } from './types.ts';

const App = () => {
    const [selectedIsland, setSelectedIsland] = useState<RichIsland | null>(null);

    return (
        <div className={styles.main}>
            <WorldMap selectedIsland={selectedIsland} setSelectedIsland={setSelectedIsland} />
            <IslandDetails island={selectedIsland} />
        </div>
    );
};

export default App;
