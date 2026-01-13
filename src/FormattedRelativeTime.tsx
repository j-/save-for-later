import { useMemo, type FC } from 'react';
import { useIntl, type FormatRelativeTimeOptions } from 'react-intl';

type RelativeTimeFormatUnit = Parameters<Intl.RelativeTimeFormat['format']>[1];

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;
const SECONDS_IN_MONTH = 30 * SECONDS_IN_DAY;
const SECONDS_IN_YEAR = 365 * SECONDS_IN_DAY;

/**
 * Roughly aligned with human-friendly thresholds.
 * @see https://date-fns.org/v4.1.0/docs/formatDistance
 */
const bestFitUnit = (diffSeconds: number): { unit: RelativeTimeFormatUnit; unitSeconds: number } => {
  const absS = Math.abs(diffSeconds);

  if (absS < 45) return { unit: 'second', unitSeconds: 1 };
  if (absS < 90) return { unit: 'minute', unitSeconds: SECONDS_IN_MINUTE };

  const absMinutes = absS / SECONDS_IN_MINUTE;
  if (absMinutes < 45) return { unit: 'minute', unitSeconds: SECONDS_IN_MINUTE };
  if (absMinutes < 90) return { unit: 'hour', unitSeconds: SECONDS_IN_HOUR };

  const absHours = absS / SECONDS_IN_HOUR;
  if (absHours < 22) return { unit: 'hour', unitSeconds: SECONDS_IN_HOUR };
  if (absHours < 36) return { unit: 'day', unitSeconds: SECONDS_IN_DAY };

  const absDays = absS / SECONDS_IN_DAY;
  if (absDays < 25) return { unit: 'day', unitSeconds: SECONDS_IN_DAY };
  if (absDays < 45) return { unit: 'month', unitSeconds: SECONDS_IN_MONTH };

  if (absDays < 345) return { unit: 'month', unitSeconds: SECONDS_IN_MONTH };
  if (absDays < 545) return { unit: 'year', unitSeconds: SECONDS_IN_YEAR };

  return { unit: 'year', unitSeconds: SECONDS_IN_YEAR };
};

export const useRelativeTime = (value: Date, now: Date): string => {
  const intl = useIntl();

  /** Positive = in the future, negative = in the past. */
  const diffSeconds = (value.getTime() - now.getTime()) / 1e3;
  const { unit, unitSeconds } = bestFitUnit(diffSeconds);

  // Convert to chosen unit and round to an
  // integer for `Intl.RelativeTimeFormat`.
  const valueInUnit = diffSeconds / unitSeconds;
  let rounded = Math.round(valueInUnit);

  // Avoid e.g. "in 0 seconds" when non-zero but rounds to 0.
  if (rounded === 0) {
    rounded = diffSeconds > 0 ? 1 : -1;
  }

  // Closer to `date-fns` output (avoids "yesterday"/"tomorrow").
  const opts: FormatRelativeTimeOptions = { numeric: 'always' };

  return intl.formatRelativeTime(rounded, unit, opts);
};

export const FormattedRelativeTime: FC<{ value: Date; now?: Date | number; }> = ({
  value,
  now,
}) => {
  const nowDate = useMemo(() => now ? new Date(now) : new Date(), [now]);
  const result = useRelativeTime(value, nowDate);
  return <>{result}</>;
};
