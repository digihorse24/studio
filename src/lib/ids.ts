import { format } from 'date-fns';

const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateRandomNumber = (length: number): string => {
  return Math.random().toString().substr(2, length);
};

export const generateKid = (): string => {
  const datePart = format(new Date(), 'yyyyMM');
  const randomPart = generateRandomNumber(3);
  return `#KID${datePart}-${randomPart}`;
};

export const generatePrid = (): string => {
  const yearPart = format(new Date(), 'yy');
  const randomPart = generateRandomString(4).toUpperCase();
  return `#PrID${yearPart}${randomPart}`;
};

export const generatePid = (): string => {
  const randomPart = generateRandomString(6).toUpperCase();
  return `#Pid${randomPart}`;
};

export const generateEqid = (horseName: string): string => {
  const cleanedName = horseName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10);
  const randomPart = generateRandomString(4).toUpperCase();
  return `EqID-${cleanedName}-${randomPart}`;
};
