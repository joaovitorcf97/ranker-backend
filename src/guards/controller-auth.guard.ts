import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ControllerAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { accessToken } = request.body;

    if (!accessToken) {
      throw new ForbiddenException('No authorization token provided');
    }

    try {
      const payload = this.jwtService.verify(accessToken);

      request.userID = payload.sub;
      request.pollID = payload.pollID;
      request.name = payload.name;

      return true;
    } catch {
      throw new ForbiddenException('Invalid authorization token');
    }
  }
}
