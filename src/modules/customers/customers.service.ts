import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { Customer } from "./entities/customer.schema";

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
}
