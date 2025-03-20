import { Directive, HostBinding, HostListener } from '@angular/core'

@Directive({
    selector: '[vksHoverChangeDisplay]',
    standalone: true,
    exportAs: '@vksHoverChangeDisplay',
})
export class HoverChangeDisplayDirective {
    @HostBinding('class.hover') isHovering = false

    @HostListener('mouseenter') onMouseEnter() {
        this.isHovering = true
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.isHovering = false
    }

    // Getter
    @HostBinding('attr.isHovering')
    get hoverStatus() {
        return this.isHovering
    }
}
