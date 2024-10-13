import { createContext, useContext, useEffect, useRef } from "react";

const LocationContext = createContext<Location | null>(null);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>;
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};

const useLocation = () => {
  const location = useRef<Location | null>(null);
  useEffect(() => {
    function handlePopState(event: PopStateEvent) {
      location.current = window.location;
    }
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return location.current;
};
