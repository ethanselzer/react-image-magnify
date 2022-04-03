/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { MouseEvent } from 'react';

import type { Point } from 'src/types';

export class RelativeCursorPositionObserver {
    protected _subject?: HTMLElement;

    protected elementOffset?: Point;

    get subject(): HTMLElement | undefined {
        return this._subject;
    }

    set subject(value: HTMLElement | undefined) {
        this._subject = value;
    }

    get documentRelativeElementOffset(): Point {
        if (!this._subject) {
            throw new Error('Not yet initialized. Subject is not set');
        }

        if (!this.elementOffset) {
            this.elementOffset = this.getDocumentRelativeElementOffset(this._subject);
        }

        return this.elementOffset;
    }

    getDocumentRelativeElementOffset(el: HTMLElement): Point {
        const rootEl = this.getRootOfEl(el);
        const {
            left: docLeft,
            top: docTop,
        } = rootEl.getBoundingClientRect();

        const {
            left: elLeft,
            top: elTop,
        } = el.getBoundingClientRect();

        return {
            x: Math.abs(docLeft) + elLeft,
            y: Math.abs(docTop) + elTop,
        };
    }

    getRootOfEl(el: HTMLElement): HTMLElement {
        if (el.parentElement) {
            return this.getRootOfEl(el.parentElement);
        }
        return el;
    }

    getComputedElementRelativeCursorPosition(
        event: MouseEvent | Touch,
        documentRelativeElementOffset: Point,
    ): Point {
        const position = this.getDocumentRelativeCursorPosition(event);
        const { x: cursorX, y: cursorY } = position;
        const { x: offsetX, y: offsetY } = documentRelativeElementOffset;

        return {
            x: Math.round(cursorX - offsetX),
            y: Math.round(cursorY - offsetY),
        };
    }

    getDocumentRelativeCursorPosition(event: MouseEvent | Touch): Point {
        return {
            x: event.pageX,
            y: event.pageY,
        };
    }

    getCursorPosition(event: MouseEvent | Touch): Point {
        return this.getComputedElementRelativeCursorPosition(event, this.documentRelativeElementOffset);
    }
}
