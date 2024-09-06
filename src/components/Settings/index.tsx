import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import styles from '../../styles/settings.module.scss';
import { Monument, Resource, Settings as SettingsType } from '../../types.ts';
import { translateMonument, translateResource } from '../Info/utils.ts';

interface Props {
    settings: SettingsType;
    setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const Settings = ({ settings, setSettings }: Props) => {
    const handleResourceToggle = (resource: Resource): void => {
        setSettings((settings: SettingsType) => ({
            ...settings,
            selectedResources:
                settings.selectedResources.indexOf(resource) !== -1
                    ? settings.selectedResources.filter((r) => r !== resource)
                    : [...settings.selectedResources, resource],
        }));
    };

    const handleHighlightResourcesOnlyInSelectedIslandGroupToggle = () =>
        setSettings((settings) => ({
            ...settings,
            highlightResourcesOnlyInSelectedIslandGroup: !settings.highlightResourcesOnlyInSelectedIslandGroup,
        }));

    const handleMonumentToggle = (monument: Monument): void => {
        setSettings((settings: SettingsType) => ({
            ...settings,
            selectedMonuments:
                settings.selectedMonuments.indexOf(monument) !== -1
                    ? settings.selectedMonuments.filter((r) => r !== monument)
                    : [...settings.selectedMonuments, monument],
        }));
    };

    const handleHighlightMonumentsOnlyInSelectedIslandGroupToggle = () =>
        setSettings((settings) => ({
            ...settings,
            highlightMonumentOnlyInSelectedIslandGroup: !settings.highlightMonumentOnlyInSelectedIslandGroup,
        }));

    const handleIslandGroupSizeChange = (e: ChangeEvent<HTMLInputElement>) =>
        setSettings((settings) => ({
            ...settings,
            selectedIslandGroupSize: parseInt(e.target.value) >= 8 ? parseInt(e.target.value) : null,
        }));

    return (
        <div className={styles.settings}>
            <div>
                <h3>Korosta valitut resurssit</h3>
                {(['WINE', 'MARBLE', 'CRYSTAL_GLASS', 'SULPHUR'] as Resource[]).map((resource) => (
                    <div key={resource}>
                        <input
                            type='checkbox'
                            id={`resource-${resource}`}
                            checked={settings.selectedResources.indexOf(resource) !== -1}
                            onChange={() => handleResourceToggle(resource)}
                        />
                        <label htmlFor={`resource-${resource}`}>{translateResource(resource)}</label>
                    </div>
                ))}
                <div className={styles.highlightOption}>
                    <input
                        type='checkbox'
                        id='highlight-resources-only-in-selected-island-group'
                        checked={settings.highlightResourcesOnlyInSelectedIslandGroup}
                        onChange={handleHighlightResourcesOnlyInSelectedIslandGroupToggle}
                    />
                    <label htmlFor='highlight-resources-only-in-selected-island-group'>
                        Korosta vain valitussa saarirykelmässä
                    </label>
                </div>
            </div>

            <div>
                <h3>Korosta valitut ihmeet</h3>
                {(
                    [
                        'ARES_STRONGHOLD',
                        'ATHENAS_PARTHENON',
                        'COLOSSUS',
                        'DEMETERS_GARDENS',
                        'HADES_HOLY_GROVE',
                        'HEPHAESTUS_FORGE',
                        'TEMPLE_OF_HERMES',
                        'TEMPLE_OF_POSEIDON',
                    ] as Monument[]
                ).map((monument) => (
                    <div key={monument}>
                        <input
                            type='checkbox'
                            id={`resource-${monument}`}
                            checked={settings.selectedMonuments.indexOf(monument) !== -1}
                            onChange={() => handleMonumentToggle(monument)}
                        />
                        <label htmlFor={`resource-${monument}`}>{translateMonument(monument)}</label>
                    </div>
                ))}
                <div className={styles.highlightOption}>
                    <input
                        type='checkbox'
                        id='highlight-monuments-only-in-selected-island-group'
                        checked={settings.highlightMonumentOnlyInSelectedIslandGroup}
                        onChange={handleHighlightMonumentsOnlyInSelectedIslandGroupToggle}
                    />
                    <label htmlFor='highlight-monuments-only-in-selected-island-group'>
                        Korosta vain valitussa saarirykelmässä
                    </label>
                </div>
            </div>

            <div>
                <h3>Korosta saarirykelmä koon mukaan</h3>
                <input
                    type='range'
                    min='7'
                    max='16'
                    value={settings.selectedIslandGroupSize ?? 7}
                    onChange={handleIslandGroupSizeChange}
                />
                <span>Valittu koko: {settings.selectedIslandGroupSize ?? '-'}</span>
            </div>
        </div>
    );
};

export default Settings;
