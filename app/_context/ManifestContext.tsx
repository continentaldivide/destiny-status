import { usePlayerContext } from './PlayerContext';

// Manifest definitions used to be downloaded in full by the browser and held in
// IndexedDB.  They now arrive alongside the profile they describe, scoped to
// just the hashes that profile references, so this is a thin read over
// PlayerContext rather than a provider of its own.  The hook keeps its original
// name and return type so the components consuming it are unaffected.
export function useManifestContext() {
  const { definitions } = usePlayerContext();
  if (!definitions) {
    throw new Error('Context must be used within a Provider');
  }
  return definitions;
}
