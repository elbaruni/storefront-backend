import express from "express";
interface userData {
  userId: number;
  userName: string;
}

declare global {
  namespace Express {
    interface Request {
      userData?: Record<userData>;
    }
  }
}
