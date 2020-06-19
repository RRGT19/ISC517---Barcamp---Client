export interface IUser {
  id: number;
  username: string;
  password?: string;
  accountType: string;
  token?: string;
  response: IResponse[];
}

export interface IParticipant {
  id: number;
  createdAt: Date;
  accountType: string;
  username: string;
  token?: string;
  response?: IResponse[];
}

export interface IResponse {
  id?: number;
  createdAt?: Date;
  number: number;
  rating: string;
  participant?: IParticipant;
}
