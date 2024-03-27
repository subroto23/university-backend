//Type Declear for error
export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TGenericError = {
  statusCode: number;
  message: string;
  errorSource: TErrorSource;
};
