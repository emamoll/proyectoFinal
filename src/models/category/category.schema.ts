import mongoose from "mongoose";
import Joi from 'joi';
import moment from "moment";

const Schema = mongoose.Schema;

// Nombre de la coleccion
export const CategoryCollectionName = 'categories';

// Esquema de Joi
export const CategoryJoiSchema = Joi.object({
  name: Joi.string().required(),
  timestamp: Joi.string()
});

// Esquema de mongo
const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    timestamp: { type: String, default: moment().format('DD-MMM-YYYY HH:mm:ss') }
  },
  { versionKey: false }
);

export const CategoryModel = mongoose.model(CategoryCollectionName, CategorySchema);
