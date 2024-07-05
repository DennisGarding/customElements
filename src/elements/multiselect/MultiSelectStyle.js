import { css } from 'lit';

export const MultiSelectStyle = css`
    :host {
        box-sizing: border-box;
        background: var(--cs-background);

        .cs-multi-select-wrapper {
            box-sizing: border-box;
            display: block;
            width: 100%;
            padding: var(--cs-padding);
            border: var(--cs-border-width) solid var(--cs-border);
            border-radius: var(--cs-border-radius);
            position: relative;

            .cs-multi-select-badge-container {
                overflow: hidden;
                display: flex;
                height: 2.4rem;
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
                padding: 0 0 .5rem 0;
            }

            .cs-multi-select-search-field-input {
                width: 100%;
                box-sizing: border-box;
                padding: var(--cs-search-field-padding);
                border: var(--cs-border-width) solid var(--cs-border);
                border-radius: var(--cs-border-radius);
                color: var(--cs-text-color);
                font-size: var(--cs-font-size);
                font-weight: var(--cs-font-weight);
                line-height: var(--cs-line-height);

                &:focus {
                    border-color: var(--cs-primary--hover);
                    outline: 0;
                    box-shadow: 0 0 0 .25rem var(--cs-primary-shadow);
                }
            }

            .cs-multi-select-selection-list {
                box-sizing: border-box;
                visibility: hidden;
                position: absolute;
                overflow-y: scroll;
                overflow-x: hidden;
                width: 100%;
                max-height: var(--cs-max-height);
                z-index: var(--cs-list-z-index);
                background: var(--cs-background);
                border-left: var(--cs-border-width) solid var(--cs-border);
                border-right: var(--cs-border-width) solid var(--cs-border);
                border-bottom: var(--cs-border-width) solid var(--cs-border);
            }
        }
    }

    :host-context([open]) {
        .cs-multi-select-selection-list {
            visibility: visible;
        }
    }
`;