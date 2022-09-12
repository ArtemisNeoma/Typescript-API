import { Document, InsertOneResult, UpdateResult } from 'mongodb';
import { IEndPointsRepository } from '../repository';

export interface ICustomer {
  full_name: string;
  email: string;
  email_confirmation: string;
  cpf: string;
  cellphone: string;
  birthdate: string;
  email_sms: boolean;
  whatsapp: boolean;
  country: string;
  city: string;
  postal_code: string;
  address: string;
}

export interface IRepositoryCustomer extends IEndPointsRepository {
  create(entity: ICustomer): Promise<InsertOneResult<Document>>;
  update(id: number, newEntity: ICustomer): Promise<UpdateResult>;
}
