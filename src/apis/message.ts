import Config from "../config";
import { MessageDTO } from "../models/message/message.interface";
import { MessageFactoryDAO } from "../models/message/DAOs/message.factory";
import { MongoDBClient } from "../services/mongodb";

class MessageApi {
  message;

  constructor() {
    // Instancia de conexion a mongoDB
    this.message = MessageFactoryDAO.get(Config.PERSISTENCIA);
    MongoDBClient.getConnection();
  };

  // Funcion para buscar los mensajes
  async getMessages(userId: string): Promise<MessageDTO[]> {
    const message = await this.message.getMessages(userId);

    return message;
  };

  // Funcion para agregar un mensaje
  async addMessage(userId: string, type: string, message: string, timestamp: string): Promise<MessageDTO> {
    const chat = await this.message.addMessage(userId, type, message, timestamp);

    return chat;
  }
};

export const messageAPI = new MessageApi();