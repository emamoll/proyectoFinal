export interface CategoryI {
  _id?: object
  name: string
  timestamp: string
};

export class CategoryDTO {
  id: {}
  name: string
  timestamp: string

  constructor(data: CategoryI) {
    this.id = data._id || '',
    this.name = data.name;
    this.timestamp = data.timestamp
  };
};

export interface CategoryBaseClass {
  createCategory(data: CategoryI): Promise<CategoryDTO>;
  getCategories([]): Promise<[]>;
  getCategoryById(id: string): Promise<CategoryDTO>;
  updateCategory(id: string, newData: CategoryI): Promise<CategoryDTO>;
  deleteCategory(id: string): Promise<CategoryDTO>;
}

