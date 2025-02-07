import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer-address.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { Customer } from "./entities/customer.entity";

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async getCustomerOwnProfile(id: string) {
    const customerModel = await this.customerModel
      .findById(id)
      .select({ name: 1, email: 1, phone: 1, address: 1, _id: 0 })
      .exec();

    if (!customerModel) throw new NotFoundException("Customer not found");

    const customer = customerModel.toObject();

    return {
      customer,
    };
  }

  async updateCurrentProfile(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerModel
      .updateOne({ _id: id }, updateCustomerDto)
      .exec();

    if (!customer) throw new NotFoundException("Customer not found");
  }

  async deleteCurrentCustomerProfile(customerId: string): Promise<void> {
    const result = await this.customerModel.findByIdAndDelete(customerId);

    if (!result) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }
  }

  async updateCurrentCustomerAddress(
    customerId: string,
    updateCustomerAddressDto: UpdateCustomerAddressDto,
  ) {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      customerId,
      { address: updateCustomerAddressDto },
      { new: true, runValidators: true },
    );

    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<{ id: string }> {
    const createdCustomer = await this.customerModel.create(createCustomerDto);

    return {
      id: createdCustomer.id,
    };
  }

  async getByEmail(email: string) {
    return this.customerModel.findOne({ email }).exec();
  }
}
