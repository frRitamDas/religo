import { existsSync }  from 'node:fs';
import { join, parse } from 'node:path';
import { cwd }         from 'node:process';
import { readFile }    from 'node:fs/promises';

const DEFAULT_REMOTE = 'frRitamDas/religo';

const findFile = (file) => {
    let dir = cwd();

    while (dir !== parse(dir).root) {
        if (existsSync(join(dir, file))) {
            return dir;
        }
        dir = join(dir, '../');
    }
};

const root = findFile('.git');
const pack = findFile('package.json');

const readGit = async (filename) => {
    if (!root) return undefined;
    try {
        return await readFile(join(root, filename), 'utf8');
    } catch {
        return undefined;
    }
};

export const getCommit = async () => {
    const log = await readGit('.git/logs/HEAD');
    return log?.split('\n').filter(Boolean).pop()?.split(' ')[1]
        || process.env.GIT_COMMIT
        || 'unknown';
};

export const getBranch = async () => {
    if (process.env.CF_PAGES_BRANCH) return process.env.CF_PAGES_BRANCH;
    if (process.env.WORKERS_CI_BRANCH) return process.env.WORKERS_CI_BRANCH;

    const head = await readGit('.git/HEAD');
    return head?.replace(/^ref: refs\/heads\//, '').trim()
        || process.env.GIT_BRANCH
        || 'main';
};

export const getRemote = async () => {
    const config = await readGit('.git/config');
    let remote = config?.split('\n')
        .find(line => line.trim().startsWith('url = '))
        ?.split('url = ')[1]?.trim();

    if (remote?.startsWith('git@')) {
        remote = remote.split(':').slice(1).join(':');
    } else if (remote?.startsWith('http')) {
        try {
            remote = new URL(remote).pathname.substring(1);
        } catch {
            remote = undefined;
        }
    }

    remote = remote?.replace(/\.git$/, '').replace(/\/$/, '');
    return remote || process.env.GIT_REMOTE || DEFAULT_REMOTE;
};

export const getVersion = async () => {
    if (!pack) return 'unknown';

    try {
        const { version } = JSON.parse(
            await readFile(join(pack, 'package.json'), 'utf8')
        );
        return version || 'unknown';
    } catch {
        return 'unknown';
    }
};
