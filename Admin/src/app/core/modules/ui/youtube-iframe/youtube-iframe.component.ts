import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-iframe',
  templateUrl: './youtube-iframe.component.html',
  styleUrls: ['./youtube-iframe.component.scss'],
})
export class YoutubeIframeComponent implements OnInit {
  @Input() url: string;
  @Input() height: number;
  video: any;

  constructor(private sanitizer: DomSanitizer,) {
  }

  ngOnInit(){
    const videoId = this.extractVideoId(this.url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl)
  }

  extractVideoId(url: string): string {
    const youtubeUrlPattern = !url.includes('youtube.com/shorts/') ? /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\s]+)|^https?:\/\/youtu.be\/([^&\s]+)/ : /\/shorts\/([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeUrlPattern);
    return match ? (match[1] || match[2]) : '';
  }
}
