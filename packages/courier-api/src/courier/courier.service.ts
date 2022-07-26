import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Courier, CourierDocument } from '../schemas/courier.schema';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class CourierService {
  constructor(
    @InjectModel(Courier.name)
    private readonly courierModel: Model<CourierDocument>,
  ) {}
  async getWithEmailAndPassword(email: string, password: string) {
    const user = await this.courierModel.findOne({
      email,
      active: true,
    });
    if (!user) {
      return null;
    }
    const hashResult = await bcrypt.compare(password, user.password);
    if (!hashResult) {
      return null;
    }
    return user;
  }
  async getById(id: string) {
    return this.courierModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
      active: true,
    });
  }
  async createCourier(email: string, pass: string) {
    const user = await this.courierModel.findOne({ email });
    if (user) {
      throw new BadRequestException('Email already exist');
    }
    const password = await bcrypt.hash(pass, 8);
    return this.courierModel.create({
      email,
      password,
    });
  }
  async changeActive(id: string, active: boolean) {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException('courier not found');
    }
    user.active = active;
    await user.save();
  }
}
