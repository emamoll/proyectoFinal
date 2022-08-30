import mongoose from "mongoose";
import moment from "moment";
import Joi from "joi";

const Schema = mongoose.Schema;

// Nombre de la coleccion
export const CartCollectionName = 'carts';

// Esquema de Joi
export const CartJoiSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array().required(),
  dateCreated: Joi.string().required(),
  dateUpdated: Joi.string().required(),
  userAddress: Joi.object().required()
});

// Esquema de mongo
const CartSChema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    products: [
      {
        productId: String,
        amount: Number
      }
    ],
    dateCreated: { type: String, default: moment().format('DD-MMM-YYYY HH:mm:ss') },
    dateUpdated: { type: String, required: false },
    userAddress: { type: Object, required: false }
  },
  { versionKey: false }
);

export const CartModel = mongoose.model(CartCollectionName, CartSChema);
