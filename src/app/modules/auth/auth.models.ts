export interface IUser {
  id: number;
  username: string;
  password: string;
  token?: string;
}

export interface IParticipant {
  id: number;
  createdAt: Date;
  username: string;
  token?: string;
  responseList?: IResponse[];
}

export interface IResponse {
  id?: number;
  createdAt?: Date;
  number: number;
  rating: string;
  participant?: IParticipant;
}
