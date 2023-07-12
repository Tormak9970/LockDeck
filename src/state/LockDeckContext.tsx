import { createContext, FC, useContext, useEffect, useState } from "react";
import { LockDeckManager } from "./LockDeckManager";
import { Preset } from "../components/presets/Presets";

const LockDeckContext = createContext<PublicLockDeckContext>(null as any);
export const useLockDeckContext = () => useContext(LockDeckContext);

interface ProviderProps {
  lockDeckManager: LockDeckManager
}

interface PublicLockDeckManager {
  activePreset: string | null,
  presetsMap: Map<string, Preset>,
}
interface PublicLockDeckContext extends PublicLockDeckManager {
  lockDeckManager: LockDeckManager
}

export const LockDeckContextProvider: FC<ProviderProps> = ({ children, lockDeckManager }) => {
  const [publicState, setPublicState] = useState<PublicLockDeckManager>({
    ...lockDeckManager.getPresets(),
    activePreset: lockDeckManager.getActivePreset()
  });

  useEffect(() => {
    function onUpdate() {
      setPublicState({ ...lockDeckManager.getPresets(), activePreset: lockDeckManager.getActivePreset() });
    }

    lockDeckManager.eventBus.addEventListener("stateUpdate", onUpdate);

    return () => {
      lockDeckManager.eventBus.removeEventListener("stateUpdate", onUpdate);
    }
  }, []);

  return (
    <LockDeckContext.Provider
      value={{
        ...publicState,
        lockDeckManager
      }}
    >
      {children}
    </LockDeckContext.Provider>
  )
}
