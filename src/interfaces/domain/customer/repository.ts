import { IEndPointsRepository, IVariableDatabase } from '../repository';

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
  create(entity: ICustomer): ICustomer | undefined;
  read(id: number): undefined | ICustomer;
  readAll(): IVariableDatabase;
  update(id: number, newEntity: ICustomer): ICustomer | undefined;
}
