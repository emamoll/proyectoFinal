export interface UserI {
  _id?: object
  email: string
  password: string
  firstName: string
  lastName: string
  age: number
  admin: boolean
  cellphone: number
  country: string
  city: string
  street: string
};

export class UserDTO {
  id: {}
  email: string
  password: string
  firstName: string
  lastName: string
  age: number
  admin: boolean
  cellphone: number
  country: string
  city: string
  street: string

  constructor(data: UserI) {
    this.id = data._id || '';
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = data.age;
    this.admin = data.admin;
    this.cellphone = data.cellphone;
    this.country = data.country;
    this.city = data.city;
    this.street = data.street;
  }
};

export interface UserBaseClass {
  createUser(data: UserI): Promise<UserDTO>;
  getUsers([]): Promise<[]>;
  getUserByEmail(email: string): Promise<UserDTO>;
  getUserById(id: string): Promise<UserDTO>;
  updateUser(id: string, newData: UserI): Promise<UserDTO>;
  deleteUser(id: string): any;
}