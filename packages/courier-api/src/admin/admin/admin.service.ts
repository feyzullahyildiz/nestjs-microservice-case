import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AdminUser, AdminUserDocument } from '../../schemas/admin.schema';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminUser.name)
    private readonly adminUserModel: Model<AdminUserDocument>,
    private readonly authService: AuthService,
  ) {}
  async getWithEmailAndPassword(email: string, password: string) {
    const adminUser = await this.adminUserModel.findOne({
      email,
      active: true,
    });
    if (!adminUser) {
      return null;
    }
    const hashResult = await bcrypt.compare(password, adminUser.password);
    if (!hashResult) {
      return null;
    }
    return adminUser;
  }
  async getUserById(userid: string) {
    const adminUser = await this.adminUserModel.findOne({
      _id: new mongoose.Types.ObjectId(userid),
      active: true,
    });
    // TODO check user active state
    return adminUser;
  }
  async updateUserRefreshToken(userid: string, refreshToken: string) {
    // we could set the token in db, it should be but. I have no time for it :(
    return Promise.resolve(true);
  }
  async getUserByRefreshToken(refreshToken: string) {
    const payload = await this.authService.resolveRefreshToken(refreshToken);
    const user = await this.getUserById(payload.userId);
    return user;
  }
  async initAdminUser(email: string, pass: string) {
    const password = await bcrypt.hash(pass, 8);
    const count = await this.adminUserModel.count({ email });

    const body = { email, password: password, active: true };
    if (count > 0) {
      await this.adminUserModel.updateOne({ email }, body);
    } else {
      await this.adminUserModel.create(body);
    }
  }
}
