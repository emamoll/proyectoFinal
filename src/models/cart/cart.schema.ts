import mongoose from "mongoose";
import Joi, { string } from "joi";
import moment from "moment";

const Schema = mongoose.Schema;

// Nomber de la coleccion
export const CartCollectionName = 'carts';

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
