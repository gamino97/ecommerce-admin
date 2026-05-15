import fs from 'fs';

export function getSecret(name: string): string {
  try {
    return fs.readFileSync(`/run/secrets/${name}`, 'utf8').trim();
  } catch {
    return process.env[name] || ''; // Fallback to standard env var
  }
}
