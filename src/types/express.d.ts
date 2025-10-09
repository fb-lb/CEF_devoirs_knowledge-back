export {};

interface UserId {
  id: number,
}

declare global {
  namespace Express {
    interface Request {
      user? : UserId,
    }
  }
}