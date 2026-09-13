// Theme/language remain usable when a browser blocks local storage.
export function readPreference(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
export function writePreference(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* Keep the in-memory preference. */ }
}
