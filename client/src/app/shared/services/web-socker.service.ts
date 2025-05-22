import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket | null = null;

  connect(userId: string): void {
    const socketUrl = 'http://localhost:3000';
    // const socketUrl = 'http://backend:3000';

    if (this.socket) {
      return;
    }

    this.socket = io(socketUrl, {
      query: { userId },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.socket.on('connect', () => {});

    this.socket.on('connect_error', (error: Error) => {});

    this.socket.on('disconnect', () => {});
  }

  sendMessage(conversationId: string, message: string, user: User): void {
    if (this.socket) {
      this.socket.emit('sendMessage', {
        roomId: conversationId,
        senderId: user.id,
        content: message,
      });
    }
  }

  joinRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('joinRoom', roomId);
    }
  }

  leaveRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('leaveRoom', roomId);
    }
  }

  loadMessages(): Observable<any[]> {
    return new Observable((observer) => {
      if (this.socket)
        this.socket.on('loadMessages', (messages) => {
          observer.next(messages);
        });
    });
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      if (this.socket)
        this.socket.on('receiveMessage', (msg) => {
          observer.next(msg);
        });
    });
  }

  offMessage(event: string): void {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
