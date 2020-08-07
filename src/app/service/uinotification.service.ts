import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class UINotificationService {

  constructor(private messageService:MessageService,
              private translationService:TranslationService) { }
  
  public notifySuccess(detail:string, summary = "i18n@@success"){

    detail = this.translationService.getTranslation(detail);
    summary = this.translationService.getTranslation(summary);

    this.messageService.add({severity:'success', 
                             summary: summary, 
                             detail: detail});
  }

  public notifyInfo(detail:string, summary = "i18n@@info"){

    detail = this.translationService.getTranslation(detail);
    summary = this.translationService.getTranslation(summary);

    this.messageService.add({severity:'info', 
                             summary: summary, 
                             detail: detail});
  }

  public notifyWarn(detail:string, summary = "i18n@@warn"){

    detail = this.translationService.getTranslation(detail);
    summary = this.translationService.getTranslation(summary);

    this.messageService.add({severity:'warn', 
                             summary: summary, 
                             detail: detail});
  }
  
}
