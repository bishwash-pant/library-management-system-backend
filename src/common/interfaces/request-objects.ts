import express from "express";
export interface RequestI extends express.Request {
  userId: string | null;
}
export interface ResponseI extends express.Response {}
