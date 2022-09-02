export interface ImageI {
  _id: string
  productId: string
  filename: string
  type: 'JPG' | 'PNG'
  timestamp: string
};

export class ImageDTO {
  id: string
  productId: string
  filename: string
  type: 'JPG' | 'PNG'
  timestamp: string

  constructor(data: ImageI) {
    this.id = data._id;
    this.productId = data.productId;
    this.filename = data.filename;
    this.type = data.type;
    this.timestamp = data.timestamp
  };
};

export interface ImageBaseClass {
  uploadImage(data: ImageDTO): Promise<ImageDTO>;
  getImage(id: string): Promise<ImageDTO>;
  deleteImage(id: string): Promise<ImageDTO>;
};