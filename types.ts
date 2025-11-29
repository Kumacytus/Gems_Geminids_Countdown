export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export type MoonPhaseKey = 
  | 'New' 
  | 'WaxingCrescent' 
  | 'FirstQuarter' 
  | 'WaxingGibbous' 
  | 'Full' 
  | 'WaningGibbous' 
  | 'LastQuarter' 
  | 'WaningCrescent';

export interface MoonPhaseInfo {
  phase: MoonPhaseKey;
  description: string; // Chinese name (e.g., 满月)
  advice: string; // The selected advice text
}

export type GeminidStatusType = 'WAITING' | 'ACTIVE';

export interface GeminidInfo {
  status: GeminidStatusType;
  targetDate: string; // The date we are counting down to (Start of window or End of window)
  peakDate: string;   // The true peak (262.2 deg) used for moon phase calc
  year: number;       // The year of the event
}