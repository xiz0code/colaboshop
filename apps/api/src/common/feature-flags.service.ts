import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class FeatureFlagsService {
  assertLimit(current: number, max: number, key: string) {
    if (current >= max) {
      throw new ForbiddenException(`Plan limit exceeded: ${key}`);
    }
  }

  assertEnabled(flag: boolean, key: string) {
    if (!flag) {
      throw new ForbiddenException(`Feature disabled by plan: ${key}`);
    }
  }
}
