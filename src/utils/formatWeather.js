import { parse } from 'date-fns';

const parseIcon = weatherSlug => {
  if (weatherSlug === 'thunderstorm') return 'bolt';
  if (weatherSlug === 'cloudy') return 'cloud';
  if (weatherSlug === 'wind') return 'wind';
  if (weatherSlug === 'rain') return 'cloud-showers-heavy';
  if (weatherSlug === 'snow') return 'snowflake';
  if (weatherSlug === 'sleet') return 'cloud-meatball';
  if (weatherSlug === 'fog') return 'smog';
  if (weatherSlug === 'clear-day') return 'sun';
  if (weatherSlug === 'clear-night') return 'moon';
  if (weatherSlug === 'partly-cloudy-day') return 'cloud-sun';
  if (weatherSlug === 'partly-cloudy-night') return 'cloud-moon';
  return 'poo-storm';
};

const parseDay = (day, override = {}) => {
  const {
    icon,
    summary,
    temperature,
    temperatureHigh,
    temperatureLow,
    time,
  } = day;

  return {
    date: parse(time, 't', new Date()).toISOString(),
    icon: parseIcon(icon),
    high: Math.round(temperatureHigh) || 0,
    low: Math.round(temperatureLow) || 0,
    temperature: Math.round(temperature) || 0,
    today: false,
    summary,
    ...override,
  };
};

export default weather => {
  const { currently, daily } = weather;
  const [, ...nextDays] = daily.data.slice(0, 5);

  const today = parseDay(currently, { today: true });
  const upcoming = nextDays.map(parseDay);
  return { today, upcoming };
};
