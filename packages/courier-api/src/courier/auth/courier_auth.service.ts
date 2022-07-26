import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Courier, CourierDocument } from '../../schemas/courier.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CourierAuthService {
  constructor(
    private readonly jwtService: JwtService,
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
  async getRefreshToken(userId: string) {
    return this.jwtService.signAsync(
      { userId, type: 'courier' },
      { expiresIn: '1y', secret: process.env.JWT_SECRET_REFRESH_KEY_COURIER },
    );
  }
  async getAuthToken(userId: string) {
    return this.jwtService.signAsync(
      { userId, type: 'courier' },
      { expiresIn: '10m', secret: process.env.JWT_SECRET_KEY_COURIER },
    );
  }
}
