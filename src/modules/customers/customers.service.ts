import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { UpdateCustomerDTO } from "./dto/update-customer.dto";
import { Customer } from "./entities/customer.entity";

/**
 * TODO: Implement delete profile
 * TODO: Implement get user own profile
 * TODO: Implement add address
 * TODO: Implement update address
 */

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async create(createCustomerDTO: CreateCustomerDTO) {
    await this.customerModel.create(createCustomerDTO);
  }

  async getByEmail(email: string) {
    return this.customerModel.findOne({ email }).exec();
  }

  async updateProfile(id: string, updateCustomerDTO: UpdateCustomerDTO) {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDTO)
      .exec();

    if (!customer) throw new NotFoundException("Customer not found");
  }
}
