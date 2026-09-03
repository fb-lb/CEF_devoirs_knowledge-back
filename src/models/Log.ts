import mongoose from 'mongoose';
import { LOG_EVENTS, LOG_LEVELS, LOG_TYPES } from '../types/types.js';

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  level: {
    type: String,
    trim: true,
    required: [true, "Le niveau de log est requis"],
    enum: {
      values: LOG_LEVELS,
      message: `Le niveau de log doit être : ${LOG_LEVELS.join(', ')}.`
    }
  },
  type: {
    type: String,
    trim: true,
    required: [true, "Le type de log est requis"],
    enum: {
      values: LOG_TYPES,
      message: `Le type de log doit être : ${LOG_TYPES.join(', ')}.`
    }
  },
  event: {
    type: String,
    trim: true,
    required: [true, "L'évènement du log est requis."],
    enum: {
      values: LOG_EVENTS,
      message: `L'évènement du log doit être : ${LOG_EVENTS.join(', ')}.`
    }
  },
  userId: {
    type: Number
  },
  metadata: {
    type: Schema.Types.Mixed
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
});

export const Log = mongoose.model('Log', LogSchema);