import { Injectable } from '@nestjs/common';

@Injectable()
export class RealtimeGateway {
  emitSaleCreated(payload: any) {
    return payload;
  }
}
