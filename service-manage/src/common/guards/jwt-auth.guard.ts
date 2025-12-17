/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { verifyToken } from 'utils/jwt';

type JwtPayload = {
  username?: string;
  [key: string]: unknown;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: { token?: string };
    }>();

    const token = request.headers.token;

    if (!token) {
      throw new HttpException({ code: 401, message: 'Unauthorized', data: null }, HttpStatus.OK);
    }

    try {
      const payload = await verifyToken<JwtPayload>(token);
      (request as { user?: JwtPayload }).user = payload;
      return true;
    } catch {
      throw new HttpException({ code: 401, message: 'Unauthorized', data: null }, HttpStatus.OK);
    }
  }
}
