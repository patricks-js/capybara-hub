import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
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

  async create(createCustomerDto: CreateCustomerDto) {
    await this.customerModel.create(createCustomerDto);
  }

  async getByEmail(email: string) {
    return this.customerModel.findOne({ email }).exec();
  }

  async updateProfile(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto)
      .exec();

    if (!customer) throw new NotFoundException("Customer not found");
  }
}
