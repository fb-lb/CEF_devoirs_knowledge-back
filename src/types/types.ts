import { Mock } from "vitest";
import { Response } from 'express';
import mongoose from "mongoose";

export type MockResponse = Omit<Response, 'status' | 'json'> & {
  status: Mock;
  json: Mock;
};

// For Logs saved in MongoDB

export const LOG_LEVELS = ['info', 'warn', 'error'] as const;
export const LOG_TYPES = ['audit', 'auth', 'error'] as const;
export const LOG_EVENTS = [
  'LOGIN_SUCCESS',
  'LOGIN_FAILED',
  'DATABASE_ERROR',
  'USER_ROLE_CHANGED',
] as const;

type LogLevel = typeof LOG_LEVELS[number];
type LogType = typeof LOG_TYPES[number];
type LogEvent = typeof LOG_EVENTS[number];
type ModelList = 'User' | 'Theme' | 'Cursus' | 'Lesson' | 'Element' | 'Text' | 'Image' | 'UserTheme' | 'UserCursus' | 'UserLesson';
type RoleList = 'user' | 'admin';

interface BaseLog {
  event: LogEvent;
  level: LogLevel;
  type: LogType;
  userId?: number;  // the id of the user who generated the log
}

export type NewLog = 
  BaseLog & (
    | {
        event: LogEvent & 'LOGIN_SUCCESS';
        level: LogLevel & 'info';
        type: LogType & 'auth';
        userId: number;
        metadata: {
          ip: string;
        };
      }
    | {
        event: LogEvent & 'LOGIN_FAILED';
        level: LogLevel & 'warn';
        type: LogType & 'auth';
        metadata: {
          ip: string;
          email: string;
        };
      }
    | {
        event: LogEvent & 'DATABASE_ERROR';
        level: LogLevel & 'error';
        type: LogType & 'error';
        metadata: {
          model: ModelList;
          operation: string; // for example : 'findAll', 'delete', 'add', 'update',...
          errorCode: string; // for example : 'ER_DUP_ENTRY',...
        };
      }
    | {
        event: LogEvent & 'USER_ROLE_CHANGED';
        level: LogLevel & 'info';
        type: LogType & 'audit';
        userId: number;
        metadata: {
          targetUserId: number;
          oldRole: RoleList;
          newRole: RoleList;
        };
      }
  );

export type StoredLog = 
  NewLog & {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
  };