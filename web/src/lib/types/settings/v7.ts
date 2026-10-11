import type { CobaltSettingsV6 } from "$lib/types/settings/v6";

export type CobaltSettingsV7 = Omit<CobaltSettingsV6, "schemaVersion" | "accessibility"> & {
    schemaVersion: 7;
    accessibility: CobaltSettingsV6["accessibility"] & {
        enableNotifications: boolean;
    };
};
