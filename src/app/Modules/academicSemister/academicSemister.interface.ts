export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicName = 'Six' | 'Seven' | 'Eight' | 'Nine' | 'Ten' | 'SSC';
export type TAcademicCode = '06' | '07' | '08' | '09' | '10' | '11';

export type TAcademicSemister = {
  name: TAcademicName;
  code: TAcademicCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
};
