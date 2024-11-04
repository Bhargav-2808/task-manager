type sub = {
  id: string;
  role: string;
};

export type jwtSignPayLoad = {
  kind: string;
  sub: sub;
  iat: number;
  exp: number;
};

export type role = {
  _id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  description?: string;
};

export type user = {
  _id: string;
  name: string;
  email: string;
  phone_number?: string;
  role: role;
  created_at: Date;
  updated_at: Date;
  password: string;
  address?: string;
};
