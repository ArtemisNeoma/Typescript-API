import { ICustomer } from '@interfaces/domain/customer/repository';
import { Document, ObjectId, WithId } from 'mongodb';

export const mockValidCustomer = {
  _id: new ObjectId('aaaaaaaaaaaa').toJSON(),
  full_name: 'Teste do Teste',
  email: 'test@test.com',
  email_confirmation: 'test@test.com',
  cpf: '123.456.789-09',
  cellphone: '(47) 991234567',
  birthdate: '2000-01-01',
  email_sms: false,
  whatsapp: false,
  country: 'Brazil',
  city: 'Blumenau',
  postal_code: '89010-203',
  address: 'Rua X, 001, Itoupava',
};

export const mCpfRepeatedCustomer = {
  ...mockValidCustomer,
  cpf: '19087282052',
};

export const mEmailRepeatedCustomer = {
  ...mockValidCustomer,
  email: 'repeated@repeated.com',
  email_confirmation: 'repeated@repeated.com',
};

export const mCpfEqualCustomer = {
  ...mockValidCustomer,
  email: 'equal@equal.com',
  email_confirmation: 'equal@equal.com',
  cpf: '11111111111',
};

export const mCpfInvalidCustomer = {
  ...mockValidCustomer,
  cpf: '10897799900',
};

export const mPCodeInvalidCustomer = {
  ...mockValidCustomer,
  postal_code: '01010101',
};

export const mockDatabase = [
  {
    _id: new ObjectId('AAAAAAAAAAAA'),
    email: mEmailRepeatedCustomer.email,
    cpf: mCpfRepeatedCustomer.cpf,
  } as WithId<Document>,
];
