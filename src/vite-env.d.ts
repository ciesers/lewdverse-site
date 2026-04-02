/// <reference types="vite/client" />

interface Window {
  Jupiter: {
    init: (config: {
      displayMode: string;
      integratedTargetId: string;
      formProps: {
        initialInputMint?: string;
        initialOutputMint?: string;
      };
      branding?: {
        logoUri?: string;
        name?: string;
      };
    }) => void;
  };
}