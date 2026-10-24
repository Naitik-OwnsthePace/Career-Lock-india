import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CAREERS, type Career } from "@/data/careersData";
import type { ExplorerSearch } from "@/lib/explorer";

export interface AppState {
  explorerFilters: ExplorerSearch | null;
  modalCareer: Career | null;
  roadmapCareer: Career | null;
  ctcCareer: Career | null;
  diagnosticOpen: boolean;
  diagnosticCareer: Career | null;
  diagnosticCheckedItems: string[];
  diagnosticScore: number;
  setExplorerFilters: (filters: ExplorerSearch) => void;
  viewInExplorer: (filters: ExplorerSearch) => void;
  openCareerModal: (career: Career) => void;
  closeCareerModal: () => void;
  setRoadmapCareer: (career: Career) => void;
  loadRoadmap: (career: Career) => void;
  simulateCTC: (career: Career) => void;
  openDiagnostic: () => void;
  openDiagnosticFromRoadmap: (career: Career, checkedItems: string[], score: number) => void;
  closeDiagnostic: () => void;
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [explorerFilters, setExplorerFiltersState] = useState<ExplorerSearch | null>(null);
  const [modalCareer, setModalCareer] = useState<Career | null>(null);
  const [roadmapCareer, setRoadmapCareerState] = useState<Career | null>(CAREERS[0] ?? null);
  const [ctcCareer, setCtcCareer] = useState<Career | null>(null);
  const [diagnosticOpen, setDiagnosticOpen] = useState<boolean>(false);
  const [diagnosticCareer, setDiagnosticCareer] = useState<Career | null>(CAREERS[0] ?? null);
  const [diagnosticCheckedItems, setDiagnosticCheckedItems] = useState<string[]>([]);
  const [diagnosticScore, setDiagnosticScore] = useState<number>(42);

  const setExplorerFilters = useCallback((filters: ExplorerSearch) => {
    setExplorerFiltersState({ ...filters });
  }, []);

  const viewInExplorer = useCallback(
    (filters: ExplorerSearch) => {
      setExplorerFiltersState({ ...filters });
      void navigate({ to: "/explore" });
    },
    [navigate]
  );

  const loadRoadmap = useCallback(
    (career: Career) => {
      setRoadmapCareerState(career);
      void navigate({ to: "/roadmap" });
    },
    [navigate]
  );

  const simulateCTC = useCallback(
    (career: Career) => {
      setCtcCareer(career);
      void navigate({ to: "/ctc-simulator" });
    },
    [navigate]
  );

  const value = useMemo<AppState>(
    () => ({
      explorerFilters,
      modalCareer,
      roadmapCareer,
      ctcCareer,
      diagnosticOpen,
      diagnosticCareer,
      diagnosticCheckedItems,
      diagnosticScore,
      setExplorerFilters,
      viewInExplorer,
      openCareerModal: (career: Career) => setModalCareer(career),
      closeCareerModal: () => setModalCareer(null),
      setRoadmapCareer: (career: Career) => setRoadmapCareerState(career),
      loadRoadmap,
      simulateCTC,
      openDiagnostic: () => {
        setDiagnosticCareer(roadmapCareer ?? CAREERS[0] ?? null);
        setDiagnosticOpen(true);
      },
      openDiagnosticFromRoadmap: (career: Career, checkedItems: string[], score: number) => {
        setDiagnosticCareer(career);
        setDiagnosticCheckedItems(checkedItems);
        setDiagnosticScore(score);
        setDiagnosticOpen(true);
      },
      closeDiagnostic: () => setDiagnosticOpen(false),
    }),
    [
      explorerFilters,
      modalCareer,
      roadmapCareer,
      ctcCareer,
      diagnosticOpen,
      diagnosticCareer,
      diagnosticCheckedItems,
      diagnosticScore,
      setExplorerFilters,
      viewInExplorer,
      loadRoadmap,
      simulateCTC,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within an <AppStateProvider>");
  }
  return ctx;
}

export function useOptionalAppState(): AppState | null {
  return useContext(AppStateContext);
}
