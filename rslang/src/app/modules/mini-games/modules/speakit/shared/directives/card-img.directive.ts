import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[appCardImg]'
})
export class CardImgDirective {

  @Input('appCardImg') cardImg: string;

  constructor(private sanitizer: DomSanitizer) {}

  @HostBinding('style.background-image') get changeBackground(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `url(https://nexgenua.github.io/rslang-data/${this.cardImg})`
    );
  }
}
