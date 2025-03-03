import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { UserRepository } from '../../../db/repositories/user/user.repository';
import { Request } from 'express';
import { User } from '../../../db/model/user.entity';

interface AlmofusRequest extends Request {
  user?: User;
}

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AlmofusRequest>();
    const accessToken = request.header('almofus-access-token');

    if (!accessToken) {
      throw new ForbiddenException();
    }

    const tokenInformation = await this.tokenService.getAccessTokenInformation(accessToken);
    const user = await this.userRepository.findById(tokenInformation.userId);

    if (!user) {
      throw new ForbiddenException();
    }

    request.user = user;
    return true;
  }
}
