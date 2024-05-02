import { LitElement, html, css } from 'lit';

class MultiSelect extends LitElement {
    timeoutLength = 300;
    hiddenClass = 'hidden';

    list = null;
    searchField = null;
    closeTimeout = null;

    // Used for form association
    #internals;
    // Used for form association
    static formAssociated = true;

    static properties = {
        jsonData: { type: Array, attribute: 'json-data' },
        displayField: { type: String, attribute: 'display-field' },
        valueField: { type: String, attribute: 'value-field' },
        value: { type: Array },
        name: { type: String },
        open: { type: Boolean }
    };

    constructor() {
        super();

        // Used for form association
        this.#internals = this.attachInternals();
    }

    connectedCallback() {
        super.connectedCallback()

        if (!this.jsonData instanceof Array) {
            throw new Error('No "json-data" provided');
        }

        if (!this.displayField) {
            throw new Error('No "display-field" provided');
        }

        if (!this.valueField) {
            throw new Error('No "value-field" provided');
        }

        if (!this.value instanceof Array) {
            this.value = [];
            this.setAttribute('value', JSON.stringify(this.value));
        }

        this.setFormData();
    }

    /**
     * Function is used for form association
     */
    setFormData() {
        const formData = new FormData();
        this.value.forEach((val) => {
            formData.append(`${this.name}[]`, String(val));
        });

        this.#internals.setFormValue(formData);
    }

    onChangeValue(event) {
        if (this.open) {
            this.getSearchField().focus();
        }

        const value = parseInt(event.currentTarget.dataset.value);
        if (this.value.includes(String(value))) {
            this.value.splice(this.value.indexOf(value), 1);
        } else {
            this.value.push(String(value));
        }

        this.setAttribute('value', JSON.stringify(this.value));
        this.setFormData();
    }

    onChevronClick() {
        this.getSearchField().focus();
    }

    onInput(event) {
        const value = event.currentTarget.value.toLowerCase();

        this.getList().querySelectorAll('.multi-select-select-list-item').forEach(listItem => {
            if (listItem.innerHTML.toLowerCase().indexOf(value) > -1) {
                listItem.classList.remove(this.hiddenClass);
            } else {
                listItem.classList.add(this.hiddenClass);
            }
        });
    }

    onFocusInput() {
        clearTimeout(this.closeTimeout);
        this.showList();
    }

    onBlur() {
        this.closeTimeout = setTimeout(() => {
            this.hideList();
        }, this.timeoutLength);
    }

    onMouseEnter(event) {
        event.currentTarget.addEventListener('wheel', this.onScroll.bind(this, event.currentTarget));
    }

    onMouseLeave(event) {
        event.currentTarget.removeEventListener('wheel', this.onScroll.bind(this, event.currentTarget));
    }

    onScroll(element, event) {
        event.preventDefault();
        element.scrollLeft += event.deltaY / 10;
    }

    isSelected(value) {
        return this.value.includes(String(value));
    }

    getListItem(value) {
        let listItem;

        this.jsonData.some((item) => {
            if (String(item[this.valueField]) === String(value)) {
                listItem = item;

                return true;
            }
        });

        return listItem;
    }

    showList() {
        this.setAttribute('open', 'true');
        this.adjustSize();
    }

    adjustSize() {
        this.getList().style = `width: ${this.getSearchField().clientWidth}px;`;
    }

    hideList() {
        this.removeAttribute('open');
    }

    getList() {
        if (this.list === null) {
            this.list = this.renderRoot.querySelector('.multi-select-select-list')
        }

        return this.list;
    }

    getSearchField() {
        if (this.searchField === null) {
            this.searchField = this.renderRoot.querySelector('.multi-select-search-field-input')
        }

        return this.searchField;
    }

    render() {
        return html`
            <div class="multi-select-container">
                <div class="multi-select-wrapper">
                    <div class="multi-select-selected-container" @mouseenter="${this.onMouseEnter}"
                         @mouseleave="${this.onMouseLeave}">
                        ${this.value.map(id => {
                                    const listItem = this.getListItem(id);
                                    if (!listItem) {
                                        return;
                                    }
                                    return html`
                                        <span class="multi-select-select-badge"
                                              data-value="${listItem[this.valueField]}">
                                            ${listItem[this.displayField]}&nbsp;
                                            <span class="cross"
                                                  data-value="${listItem[this.valueField]}"
                                                  @click="${this.onChangeValue}">&#10799;</span>
                                        </span>`;
                                }
                        )}
                    </div>
                    <div class="multi-select-search-field-input-container">
                        <span class="multi-select-chevron-down" @click="${this.onChevronClick}">&#8964;</span>
                        <input type="text" class="multi-select-search-field-input"
                               @input="${this.onInput}"
                               @focus="${this.onFocusInput}"
                               @blur="${this.onBlur}"/>
                    </div>
                    <div class="multi-select-select-list${this.open ? '' : ` ${this.hiddenClass}`}">
                        ${this.jsonData.map(listItem => {
                                    const selected = this.isSelected(listItem[this.valueField]) ? ' selected' : '';

                                    return html`
                                        <div class="multi-select-select-list-item${selected}"
                                             @click=${this.onChangeValue}
                                             data-value="${listItem[this.valueField]}">${listItem[this.displayField]}
                                        </div>`;
                                }
                        )}
                    </div>
                </div>
            </div>`;
    }

    static styles = css`
        .hidden {
            display: none;
            height: 0;
        }

        .multi-select-container {
            font-family: sans-serif;
            width: 100%;
        }

        .multi-select-wrapper {
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 5px;
        }

        .multi-select-select-list {
            position: absolute;
            max-height: 350px;
            overflow-y: scroll;
            overflow-x: hidden;
            padding: 0;
            border-radius: 0;
            z-index: 999;
            width: 100%;
            border-left: 1px solid lightgray;
            border-right: 1px solid lightgray;
            border-bottom: 1px solid lightgray;
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
            border: 1px solid #dee2e6;
            border-radius: 5px;
            color: #212529;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;

            &:focus {
                border-color: #86b7fe;
                outline: 0;
                box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
            }
        }

        .multi-select-select-list-item {
            background: #ffffff;
            padding: 5px 5px;
            cursor: pointer;

            &:hover {
                background: #dee2e6;
            }

            &.selected {
                background: #86b7fe;

                &:hover {
                    background: #dee2e6;
                }
            }
        }

        .multi-select-selected-container {
            overflow-x: hidden;
            display: flex;
            height: 38px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            padding: 3px;
        }

        .multi-select-select-badge {
            display: inline-block;
            text-wrap: nowrap;
            margin: 0 5px 3px 0;
            background: #fdfdfd;
            vertical-align: center;
            padding: .175rem .5rem .175rem .75rem;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            color: #212529;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
        }

        .cross {
            cursor: pointer;
            color: #212529;

            &:hover {
                color: #86b7fe;
            }
        }
    `;
}

export { MultiSelect };
