import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string>('role', context.getHandler());
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user.userId;
    return isRoleEqualOrGreater(user.role, role);
  }
}

function isRoleEqualOrGreater(userRole: string, requiredRole: string): boolean {
  const userRoleIndex = Object.keys(RoleEnum).indexOf(userRole);
  const requireRoleIndex = Object.keys(RoleEnum).indexOf(requiredRole);
  return userRoleIndex >= requireRoleIndex;
}
