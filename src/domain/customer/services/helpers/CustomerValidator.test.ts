import container from '@di/index';
import { ICustomer } from '@interfaces/domain/customer/repository';
import CustomerValidator from './CustomerValidator';

const userValidator = container.resolve(CustomerValidator);
const mockMethods = {
  getCep: jest.spyOn(userValidator, '_getCep').mockResolvedValue(true),
  isCpfValid: jest.spyOn(userValidator, '_isCpfValid').mockReturnValue(true),
};
const mockDatabase = new Map<number, ICustomer>();

describe('CustomerValidator', () => {
  describe('validate', () => {
    it('Should not throw error when all validations return true', async () => {
      await expect(
        userValidator.validate({} as ICustomer, mockDatabase),
      ).resolves.not.toThrow();
    });
    it('Should reject when getCep returns false', async () => {
      mockMethods.getCep.mockResolvedValueOnce(false);
      await expect(
        userValidator.validate({} as ICustomer, mockDatabase),
      ).rejects.toThrow();
    });
    it('Should reject when isCpfValid returns false', async () => {
      mockMethods.isCpfValid.mockReturnValueOnce(false);
      await expect(
        userValidator.validate({} as ICustomer, mockDatabase),
      ).rejects.toThrow();
    });
  });
});
