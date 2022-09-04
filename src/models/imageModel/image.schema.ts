import mongoose from "mongoose";
import Joi from "joi";
import moment from "moment";

const Schema = mongoose.Schema;

// Nombre de la coleccion
export const ImageCollectionName = 'images';

// Esquema de Joi
export const ImageJoiSchema = Joi.object({
  productId: Joi.string().required(),
  filename: Joi.string().required(),
  type: Joi.string().required(),
  timestamp: Joi.string()
});

// Esquema de mongo
const ImageSchema = new Schema(
  {
    productId: { type: String, required: true },
    filename: { type: String, required: true },
    type: { type: String, required: true },
    timestamp: { type: String, default: moment().format('DD-MMM-YYYY HH:mm:ss') },
  },
  { versionKey: false }
);

export const ImageModel = mongoose.model(ImageCollectionName, ImageSchema);