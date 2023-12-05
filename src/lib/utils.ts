import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatDate = (
  date = new Date(),
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  return dayjs(date).format(format);
};
