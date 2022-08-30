export interface MessageObjectI {
  _id?: string
  userId: string
  type: 'user' | 'system'
  message: string
  timestamp: string
};

export class MessageDTO {
  id?: string
  userId: string
  type: 'user' | 'system'
  message: string
  timestamp: string

  constructor(data: MessageObjectI) {
    this.userId = data.userId;
    this.type = data.type;
    this.message = data.message;
    this.timestamp = data.timestamp;
  };
};

export interface MessageBaseClass {
  getMessages(userId: string): Promise<MessageDTO[]>;
  addMessage(userId: string, type: string, message: string, timestamp: string): Promise<MessageDTO>;
};