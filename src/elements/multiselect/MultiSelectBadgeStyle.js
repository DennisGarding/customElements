import { css } from 'lit';

export const MultiSelectBadgeStyle = css`
    :host {
        text-wrap: nowrap;
        display: inline-block;
        border: var(--cs-border-width) solid var(--cs-border);
        border-radius: var(--cs-border-radius);
        padding: var(--cs-badge-padding);
        margin-right: var(--cs-margin);
        background: var(--cs-border);

        .cs-multi-select-badge-cross {
            cursor: pointer;
            
            &:hover {
                color: var(--cs-primary--hover);
            }
        }
    }
`;