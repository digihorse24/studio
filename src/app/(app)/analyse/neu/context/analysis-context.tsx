"use client"

import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { HufAnalyse } from '@/lib/types';

type Action = { type: 'UPDATE_DATA', payload: Partial<HufAnalyse> } | { type: 'RESET_DATA' } | {type: 'SET_STATE', payload: HufAnalyse};

interface AnalysisContextType {
  state: HufAnalyse;
  dispatch: React.Dispatch<Action>;
}

const initialState: HufAnalyse = {
  id: '',
  pferd_id: '',
  datum: new Date().toISOString().split('T')[0],
  basics: {
    hufschmied: '',
    letzter_beschlag: '',
    hufgroesse_vl: '',
    hufgroesse_vr: '',
    hufgroesse_hl: '',
    hufgroesse_hr: '',
  },
  hoof_images: {},
  assessment: {},
  notes: '',
  dsgvo_accepted: false,
  signature: '',
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

const analysisReducer = (state: HufAnalyse, action: Action): HufAnalyse => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, ...action.payload };
    case 'RESET_DATA':
      return initialState;
    case 'SET_STATE':
        return action.payload;
    default:
      return state;
  }
};

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(analysisReducer, initialState);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('hufAnalyseState');
      if (storedState) {
        dispatch({ type: 'SET_STATE', payload: JSON.parse(storedState) });
      }
    } catch (error) {
      console.error("Could not load state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('hufAnalyseState', JSON.stringify(state));
    } catch (error) {
      console.error("Could not save state to localStorage", error);
    }
  }, [state]);

  return (
    <AnalysisContext.Provider value={{ state, dispatch }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
