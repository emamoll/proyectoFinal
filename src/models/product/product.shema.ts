import mongoose from "mongoose";
import Joi from "joi";
import moment from "moment";
import { CategoryCollectionName } from "../category/category.schema";

const Schema = mongoose.Schema;

// Nombre de la coleccion
export const ProductCollectionName = 'products';

// Esquema de Joi
export const ProductJoiSchema = Joi.object({
  name: Joi.string().required(),
  desription: Joi.string().required(),
  category: Joi.object().required(),
  price: Joi.number().required(),
  meassure: Joi.string().required(),
  stock: Joi.number().required(),
  image: Joi.string().required(),
  timestamp: Joi.string()
})

// Esquema de mongo
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: CategoryCollectionName,
      required: true,
    },
    price: { type: Number, required: true },
    meassure: { type: String, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    timestamp: { type: String, default: moment().format('DD-MMM-YYYY HH:mm:ss') }
  },
  { versionKey: false }
);

export const ProductModel = mongoose.model(ProductCollectionName, ProductSchema);
