declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        role: string;
        roleId: number;
      };
    }
  }
}

export {};
