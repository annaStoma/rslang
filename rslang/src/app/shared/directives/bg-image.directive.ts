import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appBgImage]',
})
export class BgImageDirective {
  constructor(public sanitizer: DomSanitizer) {}

  @Input('appBgImage') backgroundImage: string;

  @HostBinding('style.background-image') get getImageURL() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `url(${this.backgroundImage})`
    );
  }
}
