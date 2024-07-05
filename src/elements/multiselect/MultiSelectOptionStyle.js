import { css } from 'lit';

export const MultiSelectOptionStyle = css`
    :host {
        display: block;
        padding: var(--cs-padding);
        cursor: pointer;
        line-height: var(--cs-line-height);
    }

    :host-context([selected]) {
        background: var(--cs-border);
    }

    :host(:hover) {
        background: var(--cs-primary--hover);
    }

    :host(.hidden) {
        display: none;
        height: 0;
    }
`;