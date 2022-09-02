import { MongoDBClient } from "../../../services/mongodb";
import { MessageBaseClass, MessageDTO } from "../message.interface";
import { MessageModel } from "../message.schema";
import Logger from "../../../services/logger";

export default class MessageDAO implements MessageBaseClass {
  private static instance: MessageDAO;
  private static client: MongoDBClient;
  message: any = MessageModel;

  constructor() { };

  // Creo instancia de conexion a mongo
  static async getInstance() {
    if (!MessageDAO.instance) {
      Logger.info('Inicializamos DAO Message con Mongo Atlas');

      await MongoDBClient.getConnection();

      MessageDAO.instance = new MessageDAO();
      MessageDAO.client = MongoDBClient.getConnection();
    };
    return MessageDAO.instance;
  };

  // Busco los mensajes
  async getMessages(userId: string): Promise<MessageDTO[]> {
    try {
      const messages = await this.message.find({ userId });

      if (!messages) throw new Error('No hay mensajes para mostrar');

      return messages;
    } catch (error: any) {
      Logger.error('Error al buscar los mensajes');
      throw new Error(`Error al buscar los mensajes: ${error.message}`);
    };
  };

  // Agrego mensajes a la coleccion
  async addMessage(userId: string, type: string, message: string, timestamp: string): Promise<MessageDTO> {
    try {
      const chat = new this.message({
        userId,
        type,
        message,
        timestamp
      });
      const newChat = await chat.save();

      return newChat;
    } catch (error: any) {
      Logger.error('Error al agregar el mensaje');
      throw new Error(`Error al agregar el mensaje: ${error.message}`);
    };
  };
};
