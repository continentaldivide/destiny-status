import { renderHook } from '@testing-library/react';
import { useManifestStatus } from './useManifestStatus';

describe('useManifestStatus', () => {
  it('avoids issues with fetch API being inaccessible while testing', () => {
    const manifestStatus = renderHook(() => useManifestStatus());
  });
});
