import type { CobaltSettingsV6 } from "$lib/types/settings/v6";

export type CobaltSettingsV7 = Omit<CobaltSettingsV6, "schemaVersion" | "accessibility" | "appearance"> & {
    schemaVersion: 7;
    appearance: CobaltSettingsV6["appearance"] & {
        uiDensity: "compact" | "comfortable" | "spacious";
    };
    accessibility: CobaltSettingsV6["accessibility"] & {
        enableNotifications: boolean;
    };
};
