export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
};

export type Role = {
  id: number;
  name: string;
  description: string;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
