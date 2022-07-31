import mongoose from "mongoose";
import Joi, { boolean } from "joi";
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema;

// Nombre de la coleccion
export const UserCollectionName = 'users';

// Esquema de Joi
export const UserJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firsName: Joi.string().required(),
  lastName: Joi.string().required(),
  admin: Joi.string(),
  cellphone: Joi.number().required(),
  address: {
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required()
  }
});

// Esquema de mongo
const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    admin: { type: Boolean, default: false },
    cellphone: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true }
  },
  { versionKey: false }
);

// Encripto la contrasenia
UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

// Comparo la contrasenia con la contrasenia encriptada
UserSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

export const UserModel = mongoose.model(UserCollectionName, UserSchema);