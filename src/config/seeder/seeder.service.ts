import { Customer } from "@/modules/customers/entities/customer.entity";
import { Hotel } from "@/modules/hotels/entity/hotel.entity";
import { RoomType } from "@/modules/rooms/entities/room-type.entity";
import { Room } from "@/modules/rooms/entities/room.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(RoomType.name) private readonly roomTypeModel: Model<RoomType>,
  ) {}

  async seed() {
    await this.customerModel.deleteMany({});
    await this.hotelModel.deleteMany({});
    await this.roomTypeModel.deleteMany({});
    await this.roomModel.deleteMany({});

    const address = {
      street: "Rua das Flores",
      state: "SP",
      city: "São Paulo",
      country: "Brazil",
      postalCode: "93193-123",
      number: 213,
    };

    const customer: Customer = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "Password123@",
      phone: "81999999999",
      address,
    };

    const hotel: Hotel = {
      name: "Hotel XYZ",
      email: "hotelxyz@capybarahub.com",
      phone: "81999999999",
      image: "https://example.com/hotel-image.jpg",
      address,
    };

    const roomType: RoomType = {
      type: "Single",
      description: "Single room with a single bed",
      capacity: 1,
    };

    await this.customerModel.insertOne(customer);
    const { _id: hotelId } = await this.hotelModel.insertOne(hotel);
    const { _id: roomTypeId } = await this.roomTypeModel.insertOne(roomType);

    const rooms: Room[] = [
      {
        hotel: hotelId,
        roomType: roomTypeId,
        status: "available",
        roomNumber: 101,
        pricePerNight: Types.Decimal128.fromString("100.00"),
        images: [],
        name: "Standard Room"
      },
      {
        hotel: hotelId,
        roomType: roomTypeId,
        status: "occupied",
        roomNumber: 102,
        pricePerNight: Types.Decimal128.fromString("150.00"),
        images: [],
        name: "Deluxe Room"
      },
      {
        hotel: hotelId,
        roomType: roomTypeId,
        status: "available",
        roomNumber: 103,
        pricePerNight: Types.Decimal128.fromString("200.00"),
        images: [],
        name: "Suite"
      },
      {
        hotel: hotelId,
        roomType: roomTypeId,
        status: "maintenance",
        roomNumber: 104,
        pricePerNight: Types.Decimal128.fromString("120.00"),
        images: [],
        name: "Family Room"
      },
      {
        hotel: hotelId,
        roomType: roomTypeId,
        status: "available",
        roomNumber: 105,
        pricePerNight: Types.Decimal128.fromString("180.00"),
        images: [],
        name: "Executive Room"
      }
    ];

    await this.roomModel.insertMany(rooms);
  }
}
