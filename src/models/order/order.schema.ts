import mongoose, { model } from "mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

// Nombre de la coleccion
export const OrderCollectionName = 'Orders';

// Array de estados de las ordenes
export const orderState = ['Generated', 'Paid', 'Send', 'Finalized'];

// Esquema de Joi de Ordenes 
export const OrderJoiSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array().required(),
  status: Joi.string().valid(...orderState).required(),
  timestamp: Joi.string().required(),
  total: Joi.number().required()
});

// Esquema de mongo
const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    products: [
      {
        id: Schema.Types.ObjectId,
        amount: Number,
        price: Number
      }
    ],
    status: { type: String, required: true },
    timestamp: { type: String, required: false },
    total: { type: Number, required: true },
  }
);

export const OrderModel = mongoose.model(OrderCollectionName, OrderSchema);