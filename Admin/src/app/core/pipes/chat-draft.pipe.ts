import { Pipe, PipeTransform } from '@angular/core';

import { ChatDraft } from '@models/chat/chat-draft.model';

@Pipe({ name: 'chatDraft' })
export class ChatDraftPipe implements PipeTransform {
  transform(items: ChatDraft[], roomId: string): ChatDraft | null {
    if (!items) {
      return null;
    }
    const draft = items.find(e => e.roomId === roomId);
    if(draft){
      return draft;
    } else {
      return null;
    }
  }
}
