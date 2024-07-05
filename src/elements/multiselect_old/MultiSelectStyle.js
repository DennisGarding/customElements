import { css } from 'lit';
import { Colors } from "../../Colors";

const MultiSelectStyle = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    .hidden {
        display: none;
        height: 0;
    }

    .multi-select-container {
        font-family: sans-serif;
        width: 100%;
    }

    .multi-select-wrapper {
        border: 1px solid ${Colors.border};
        border-radius: 5px;
        padding: .5rem;
    }

    .multi-select-select-list {
        position: absolute;
        max-height: 15rem;
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 0;
        border-radius: 0;
        z-index: 900;
        width: 100%;
        border-left: 1px solid ${Colors.border};
        border-right: 1px solid ${Colors.border};
        border-bottom: 1px solid ${Colors.border};
    }

    .multi-select-search-field-input-container {
        position: relative;
        width: 100%;
    }

    .multi-select-chevron-down {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 3px;
        font-size: 22px;
    }

    .multi-select-search-field-input {
        width: 100%;
        box-sizing: border-box;
        padding: .375rem 2.25rem .375rem .75rem;
        border: 1px solid ${Colors.border};
        border-radius: 5px;
        color: ${Colors.linkColor};
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;

        &:focus {
            border-color: ${Colors.primaryLight};
            outline: 0;
            box-shadow: 0 0 0 .25rem ${Colors.focusBoxShadow};
        }
    }

    .multi-select-select-list-item {
        background: ${Colors.primaryBackground};
        padding: .5rem;
        cursor: pointer;

        &:hover {
            background: ${Colors.border};
        }

        &.selected {
            background: ${Colors.primaryLight};

            &:hover {
                background: ${Colors.border};
            }
        }
    }

    .multi-select-selected-container {
        overflow-x: hidden;
        display: flex;
        height: 2.4rem;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        padding: 0 0 .5rem 0;
    }

    .multi-select-select-badge {
        display: inline-block;
        text-wrap: nowrap;
        margin: 0 .5rem 0 0;
        background: ${Colors.border};
        vertical-align: center;
        padding: .175rem .5rem .175rem .75rem;
        border: 1px solid ${Colors.border};
        border-radius: 5px;
        color: ${Colors.linkColor};
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
    }

    .cross {
        cursor: pointer;
        color: ${Colors.linkColor};

        &:hover {
            color: ${Colors.primaryLight};
        }
    }
`;

export { MultiSelectStyle };