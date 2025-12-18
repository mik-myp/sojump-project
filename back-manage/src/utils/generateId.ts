/**
 * Generate a reasonably unique id for client-side use.
 * Prefers crypto.randomUUID when available, falls back to time + random.
 */
const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  const timePart = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `id_${timePart}_${randomPart}`;
};

export default generateId;
