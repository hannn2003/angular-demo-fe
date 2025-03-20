import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {
    constructor() {}

    trimFormValues(form: FormGroup) {
        if (form && Object.keys(form.controls).length > 0) {
            Object.keys(form.controls).forEach((key) => {
                const controlValue = form.get(key)!.value
                if (controlValue && typeof controlValue === 'string') {
                    form.get(key)!.setValue(controlValue.trim())
                }
            })
        } else {
            throw Error('No controls selected')
        }
    }

    base64ToBlob(base64: string) {
        const mimeType = 'application/octet-stream'

        const bstr = atob(base64)
        const n = bstr.length
        const u8arr = new Uint8Array(n)

        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i)
        }

        const blob = new Blob([u8arr], { type: mimeType })
        return URL.createObjectURL(blob)
    }
}
