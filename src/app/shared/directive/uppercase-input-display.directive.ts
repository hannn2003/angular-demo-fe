import { Directive, HostListener } from '@angular/core'
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[vksUpperCaseDisplay]',
    standalone: true,
    exportAs: '@vksUpperCaseDisplay',
})
export class UpperCaseInputDisplayDirective {
    constructor(private control: NgControl) {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Space' || event.key === ' ') {
            event.preventDefault();
        }
    }

    @HostListener('input', ['$event.target'])
    onInput(input: HTMLInputElement): void {

        const caretPos = input.selectionStart; // Capture caret position
        const upperValue = input.value.toUpperCase(); // Convert to uppercase

        // Update the form control value to uppercase
        this.control.control?.setValue(upperValue);

        // Restore caret position
        input.setSelectionRange(caretPos, caretPos);
    }

    // Handle the paste event
    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent): void {
        event.preventDefault();
        const clipboardData = event.clipboardData?.getData('text') || '';
        const pastedText = clipboardData.toUpperCase().replace(/\s/g, '');

        // Insert the cleaned text into the input
        const input = event.target as HTMLInputElement;
        const caretPos = input.selectionStart ?? 0;
        const value = input.value;

        // Insert the pasted text at the caret position and update input value
        const newValue = value.slice(0, caretPos) + pastedText + value.slice(caretPos);
        this.control.control?.setValue(newValue);

        // Set caret position after pasted text
        input.setSelectionRange(caretPos + pastedText.length, caretPos + pastedText.length);
    }
}
