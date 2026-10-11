import type { CobaltSettings } from "$lib/types/settings";

enum ReliGoResponseType {
    Error = 'error',
    Picker = 'picker',
    Redirect = 'redirect',
    Tunnel = 'tunnel',
    LocalProcessing = 'local-processing',
}

export type ReliGoErrorResponse = {
    status: ReliGoResponseType.Error,
    error: {
        code: string,
        context?: {
            service?: string,
            limit?: number,
        }
    },
};

type ReliGoPartialURLResponse = {
    url: string,
    filename: string,
}

type ReliGoPickerResponse = {
    status: ReliGoResponseType.Picker
    picker: {
        type: 'photo' | 'video' | 'gif',
        url: string,
        thumb?: string,
    }[];
    audio?: string,
    audioFilename?: string,
};

type ReliGoRedirectResponse = {
    status: ReliGoResponseType.Redirect,
} & ReliGoPartialURLResponse;

type ReliGoTunnelResponse = {
    status: ReliGoResponseType.Tunnel,
} & ReliGoPartialURLResponse;

export const ReliGoFileMetadataKeys = [
    'album',
    'composer',
    'genre',
    'copyright',
    'title',
    'artist',
    'album_artist',
    'track',
    'date',
    'sublanguage',
];

export type ReliGoFileMetadata = Record<
    typeof ReliGoFileMetadataKeys[number], string | undefined
>;

export type ReliGoLocalProcessingType = 'merge' | 'mute' | 'audio' | 'gif' | 'remux' | 'proxy';

export type ReliGoLocalProcessingResponse = {
    status: ReliGoResponseType.LocalProcessing,

    type: ReliGoLocalProcessingType,
    service: string,
    tunnel: string[],

    output: {
        type: string, // mimetype
        filename: string,
        metadata?: ReliGoFileMetadata,
        subtitles?: boolean,
    },

    audio?: {
        copy: boolean,
        format: string,
        bitrate: string,
        cover?: boolean,
        cropCover?: boolean,
    },

    isHLS?: boolean,
}

export type ReliGoFileUrlType = "redirect" | "tunnel";

export type ReliGoSession = {
    token: string,
    exp: number,
}

export type ReliGoServerInfo = {
    religo: {
        version: string,
        url: string,
        startTime: string,
        turnstileSitekey?: string,
        services: string[]
    },
    git: {
        branch: string,
        commit: string,
        remote: string,
    }
}

// TODO: strict partial
// this allows for extra properties, which is not ideal,
// but i couldn't figure out how to make a strict partial :(
export type ReliGoSaveRequestBody =
    { url: string } & Partial<Omit<CobaltSettings['save'], 'savingMethod'>>;

export type ReliGoSessionResponse = ReliGoSession | ReliGoErrorResponse;
export type ReliGoServerInfoResponse = ReliGoServerInfo | ReliGoErrorResponse;

export type ReliGoAPIResponse = ReliGoErrorResponse
                              | ReliGoPickerResponse
                              | ReliGoRedirectResponse
                              | ReliGoTunnelResponse
                              | ReliGoLocalProcessingResponse;
