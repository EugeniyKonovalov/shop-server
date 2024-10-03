export interface JwtPayload {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
