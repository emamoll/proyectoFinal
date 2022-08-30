import mongoose from "mongoose";
import moment from "moment";
import Joi from "joi";

const Schema = mongoose.Schema;

// Nombre de la coleccion
export const MessageCollectionName = 'messages';

// Esquema de Joi
export const MessageJoiSchema = Joi.object({
  userId: Joi.string().required(),
  type: Joi.string().required(),
  message: Joi.string().required(),
  timestamp: Joi.string().required(),
});

// Esquema de mongo
const MessageSchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: String, required: true }
  },
  { versionKey: false }
);

export const MessageModel = mongoose.model(MessageCollectionName, MessageSchema);
