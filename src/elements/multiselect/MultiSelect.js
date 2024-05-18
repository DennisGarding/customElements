import { LitElement, html, css } from 'lit';
import { MultiSelectStyle } from "./MultiSelectStyle";

class MultiSelect extends LitElement {
    static styles = MultiSelectStyle;

    static properties = {
        jsonData: { type: Array, attribute: 'json-data' },
        displayField: { type: String, attribute: 'display-field' },
        valueField: { type: String, attribute: 'value-field' },
        value: { type: Array },
        name: { type: String },
        open: { type: Boolean }
    };

    timeoutLength = 300;
    hiddenClass = 'hidden';

    list = null;
    searchField = null;
    closeTimeout = null;

    // Used for form association
    #internals;

    // Used for form association
    static formAssociated = true;

    constructor() {
        super();

        // Used for form association
        this.#internals = this.attachInternals();
    }

    connectedCallback() {
        super.connectedCallback();

        if (!(this.jsonData instanceof Array)) {
            throw new Error('No "json-data" provided');
        }

        if (!this.displayField) {
            throw new Error('No "display-field" provided');
        }

        if (!this.valueField) {
            throw new Error('No "value-field" provided');
        }

        if (!(this.value instanceof Array)) {
            this.value = [];
            this.setAttribute('value', JSON.stringify(this.value));
        }

        this.setFormValue();
    }

    /**
     * Function is used for form association
     */
    setFormValue() {
        const formData = new FormData();
        this.value.forEach((val) => {
            formData.append(`${this.name}[]`, val);
        });

        this.#internals.setFormValue(formData);
    }

    onChangeValue(event) {
        if (this.open) {
            this.getSearchField().focus();
        }

        const value = parseInt(event.currentTarget.dataset.value);
        let itemIndex = -1;
        this.value.some((key, index) => {
            if (parseInt(key) === value) {
                itemIndex = index;
            }
        });

        if (itemIndex > -1) {
            this.value.splice(itemIndex, 1);
        } else {
            this.value.push(value);
        }

        this.setAttribute('value', JSON.stringify(this.value));
        this.setFormValue();
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
        let includes = false;

        this.value.some((current) => {
            if (parseInt(current) === value || String(current) === value) {
                includes = true;

                return true;
            }
        });

        return includes;
    }

    getListItem(value) {
        let listItem;

        this.jsonData.some((item) => {
            if (this.compareAsInteger(item, value) || this.compareAsString(item, value)) {
                listItem = item;

                return true;
            }
        });

        return listItem;
    }

    compareAsString(item, value) {
        return String(item[this.valueField]) === value;
    }

    compareAsInteger(item, value) {
        return parseInt(item[this.valueField]) === value;
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
}

export { MultiSelect };
