import SunCalc from 'suncalc';
import { MOON_PHASE_ADVICE, MOON_PHASE_NAMES } from '../constants';
import { MoonPhaseInfo, MoonPhaseKey } from '../types';

/**
 * Calculates the moon phase and returns the description and specific advice
 * based on the year (deterministic rotation of advice).
 */
export const getMoonPhaseInfo = (dateString: string, year: number): MoonPhaseInfo => {
  const date = new Date(dateString);
  const illumination = SunCalc.getMoonIllumination(date);
  const phaseValue = illumination.phase; // 0.0 to 1.0

  let phaseKey: MoonPhaseKey;

  // Determining phase key based on value (Approximate ranges)
  // 0       : New Moon
  // 0 - 0.25: Waxing Crescent
  // 0.25    : First Quarter
  // 0.25-0.5: Waxing Gibbous
  // 0.5     : Full Moon
  // 0.5-0.75: Waning Gibbous
  // 0.75    : Last Quarter
  // 0.75-1.0: Waning Crescent
  
  // Using ranges to be more practical than exact astronomical points
  if (phaseValue < 0.03 || phaseValue > 0.97) {
    phaseKey = 'New';
  } else if (phaseValue < 0.22) {
    phaseKey = 'WaxingCrescent';
  } else if (phaseValue < 0.28) {
    phaseKey = 'FirstQuarter';
  } else if (phaseValue < 0.47) {
    phaseKey = 'WaxingGibbous';
  } else if (phaseValue < 0.53) {
    phaseKey = 'Full';
  } else if (phaseValue < 0.72) {
    phaseKey = 'WaningGibbous';
  } else if (phaseValue < 0.78) {
    phaseKey = 'LastQuarter';
  } else {
    phaseKey = 'WaningCrescent';
  }

  const name = MOON_PHASE_NAMES[phaseKey];
  const adviceList = MOON_PHASE_ADVICE[phaseKey];
  
  // Deterministic selection: Use year to select index
  // 2025 -> index 0, 2026 -> index 1 (if different phase or same), etc.
  // This ensures variety across years but stability for a specific year.
  const adviceIndex = year % adviceList.length;
  const advice = adviceList[adviceIndex];

  return {
    phase: phaseKey,
    description: name,
    advice: advice
  };
};