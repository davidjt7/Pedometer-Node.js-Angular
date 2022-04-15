interface User {
  uid?: string;
  email?: string;
  role?: string;
}

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
