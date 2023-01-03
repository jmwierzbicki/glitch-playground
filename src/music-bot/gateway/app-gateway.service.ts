import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(private jwt: JwtService) {}

  handleDisconnect(client: Socket) {
    console.log(client);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    let tokenVerified;
    try {
      tokenVerified = this.jwt.verify(client.handshake.headers.auth as string);
      if (!tokenVerified) {
        client.disconnect();
        this.logger.log(`Client token invalid: ${client.id}`);
      }
    } catch (_) {
      this.logger.log(`Client token invalid: ${client.id}`);
      client.disconnect();
    }

    console.log(client.handshake.headers.auth);
    this.logger.log(`Client connected: ${client.id}`);
    setTimeout(() => {
      client.emit('music', { videoId: 'wLlovxa3VJ0', loop: true });
    }, 1000);
  }
}
