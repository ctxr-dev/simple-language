import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HERE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const LEDGER_FILE = path.join(HERE, 'sources.md');
export const INSTANCES_FILE = path.join(HERE, 'instances.md');
export const CANDIDATES_DIR = path.join(HERE, 'candidates');
