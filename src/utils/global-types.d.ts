export {};

declare global {
  namespace Express {
    export interface Request {
      foodId: string;
    }
  }
}
