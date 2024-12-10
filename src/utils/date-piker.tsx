import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
export const CreatedAt: React.FC<{ createdAt?: any }> = ({ createdAt }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(createdAt).format('DD-MMM-YYYY')}
    </span>
  );
};
export const CreatedFrom: React.FC<{ createdAt?: any }> = ({ createdAt }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(createdAt).fromNow()}
    </span>
  );
};
export const DateResponseTime: React.FC<{ start: string, end: string }> = ({ start, end }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(start).from(end, true)}
    </span>
  );
};