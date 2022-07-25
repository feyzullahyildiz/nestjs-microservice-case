import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtCourierAuthGuard extends AuthGuard('courier-jwt') {}
