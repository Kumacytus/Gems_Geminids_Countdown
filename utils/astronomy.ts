import { SOLAR_LONGITUDE_START, SOLAR_LONGITUDE_PEAK, SOLAR_LONGITUDE_END } from '../constants';
import { GeminidInfo } from '../types';

/**
 * Calculates Solar Longitude (Lambda) for a given date.
 * Based on low-precision formulae for J2000.
 * Sufficient for ~10-15 min precision for meteor showers.
 */
function getSolarLongitude(date: Date): number {
  const J2000 = 2451545.0;
  const JD = (date.getTime() / 86400000) + 2440587.5;
  const n = JD - J2000;

  // Mean Longitude (L)
  let L = 280.460 + 0.9856474 * n;
  L = L % 360;
  if (L < 0) L += 360;

  // Mean Anomaly (g)
  let g = 357.528 + 0.9856003 * n;
  g = g % 360;
  if (g < 0) g += 360;

  // Convert degrees to radians for Math functions
  const rad = (deg: number) => deg * Math.PI / 180;

  // Ecliptic Longitude (Lambda)
  // lambda = L + 1.915 * sin(g) + 0.020 * sin(2g)
  let lambda = L + 1.915 * Math.sin(rad(g)) + 0.020 * Math.sin(rad(2 * g));
  
  lambda = lambda % 360;
  if (lambda < 0) lambda += 360;

  return lambda;
}

/**
 * Binary search to find the exact Date when Solar Longitude equals a target degree.
 * Assumes the target is within December of the given year.
 */
function getDateForSolarLongitude(year: number, targetLongitude: number): Date {
  // Approximate range: Dec 1 to Dec 25 covers Geminids comfortably
  let start = new Date(Date.UTC(year, 11, 1)).getTime();
  let end = new Date(Date.UTC(year, 11, 25)).getTime();
  
  // 30 iterations gives << 1 second precision
  for (let i = 0; i < 30; i++) {
    const mid = start + (end - start) / 2;
    const date = new Date(mid);
    const long = getSolarLongitude(date);

    // Handle wrap-around if necessary (not needed for Geminids ~262 deg)
    if (long < targetLongitude) {
      start = mid;
    } else {
      end = mid;
    }
  }

  return new Date(start);
}

/**
 * Determines the current status of the Geminids relative to the current time.
 */
export function getCurrentGeminidInfo(): GeminidInfo {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentLong = getSolarLongitude(now);

  // We need to determine if we are:
  // 1. Before this year's window
  // 2. Inside this year's window
  // 3. After this year's window (so target next year)

  // Calculate critical timestamps for THIS year
  const dateStart = getDateForSolarLongitude(currentYear, SOLAR_LONGITUDE_START);
  const dateEnd = getDateForSolarLongitude(currentYear, SOLAR_LONGITUDE_END);
  
  // Note: Peak Date is used for Moon Phase calculations
  const datePeak = getDateForSolarLongitude(currentYear, SOLAR_LONGITUDE_PEAK);

  if (now.getTime() < dateStart.getTime()) {
    // Before the window -> WAITING for Start
    return {
      status: 'WAITING',
      targetDate: dateStart.toISOString(),
      peakDate: datePeak.toISOString(),
      year: currentYear
    };
  } else if (now.getTime() <= dateEnd.getTime()) {
    // Inside the window -> ACTIVE, Counting down to End
    return {
      status: 'ACTIVE',
      targetDate: dateEnd.toISOString(),
      peakDate: datePeak.toISOString(),
      year: currentYear
    };
  } else {
    // After the window -> WAITING for NEXT YEAR's Start
    const nextYear = currentYear + 1;
    const nextDateStart = getDateForSolarLongitude(nextYear, SOLAR_LONGITUDE_START);
    const nextDatePeak = getDateForSolarLongitude(nextYear, SOLAR_LONGITUDE_PEAK);

    return {
      status: 'WAITING',
      targetDate: nextDateStart.toISOString(),
      peakDate: nextDatePeak.toISOString(),
      year: nextYear
    };
  }
}