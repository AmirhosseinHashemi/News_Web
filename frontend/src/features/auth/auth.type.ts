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
  refreshTokenExp: Date;
  user: User;
};

export type MeResponse = User & {
  roleId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type JwtPayload = {
  userId: number;
  userName: string;
  roleId: number;
  role: string;
  roleDescription: string;
  phone: string;
  exp: number;
};

export type UserSession = {
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
};

export type SafeSession = Omit<UserSession, "refreshToken">;

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
  refreshTokenExp: Date;
};

export type SetAuthActionData = Omit<RefreshResponse, "refreshTokenExp"> & {
  refreshTokenExp: Date | number;
};
