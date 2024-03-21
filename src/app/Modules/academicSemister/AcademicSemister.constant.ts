import {
  TAcademicCode,
  TAcademicName,
  TAcademicSemesteNameCodeMaper,
  TMonth,
} from './academicSemister.interface';

export const months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemisterName: TAcademicName[] = [
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'SSC',
];

export const AcademicSemisterCode: TAcademicCode[] = [
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
];

export const academicSemesterNameCodeMapper: TAcademicSemesteNameCodeMaper = {
  Six: '06',
  Seven: '07',
  Eight: '08',
  Nine: '09',
  Ten: '10',
  SSC: '11',
};
