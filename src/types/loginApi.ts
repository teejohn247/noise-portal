export type LoginApiError = {
  error: string;
  status: number;
  success: boolean;
};

export type LoginApiSuccess = {
  status: number;
  success: boolean;
  data: Data;
  token: string;
};

type Data = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
