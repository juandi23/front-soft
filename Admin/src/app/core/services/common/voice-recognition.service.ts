import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  private recognition: any;

  constructor() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      this.recognition = new (window['SpeechRecognition'] || window['webkitSpeechRecognition'])();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US, es-ES';
    } else {
      console.error('Voice recognition is not supported in this browser.');
    }
  }

  startRecognition(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.recognition) {
        this.recognition.onresult = (event: any) => {
          const result = event.results[0][0].transcript;
          resolve(result);
        };

        this.recognition.onerror = (event: any) => {
          reject(event.error);
        };

        this.recognition.start();
      } else {
        reject('Voice recognition is not supported in this browser.');
      }
    });
  }

  stopRecognition(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}
