import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.originalUrl === '/api/rsa') return true;

    if (request.headers.auth) {
      const account = request.signedCookies?.user || '';
      if (account) return true;
      return false;
    }

    return true;
  }
}
