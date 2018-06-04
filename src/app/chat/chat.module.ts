import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { MessageService } from './services/message.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    MessageService
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
