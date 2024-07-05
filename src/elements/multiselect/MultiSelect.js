import { LitElement, html } from 'lit';
import { MultiSelectStyle } from "./MultiSelectStyle";

export class MultiSelect extends LitElement {
    static styles = MultiSelectStyle;

    static properties = {
        name: { type: String },
        open: { type: Boolean },
        value: { type: Array },
    }

    // Used for form association
    static formAssociated = true;

    // Used for form association
    #internals;

    timeoutLength = 300;

    hiddenClass = 'hidden';

    searchField = null;

    list = null;

    valueList = {};

    constructor() {
        super();

        // Used for form association
        this.#internals = this.attachInternals();
    }

    connectedCallback() {
        super.connectedCallback();

        this._registerEventListeners();
    }

    render() {
        return html`
            <div class="cs-multi-select-wrapper">
                <div class="cs-multi-select-badge-container" @mouseenter="${this.onMouseEnter}" @mouseleave="${this.onMouseLeave}">
                    ${
                            Object.values(this.valueList).map((value) => {
                                return html`
                                    <multi-select-badge value="${value.value}" @cs--remove="${this.onBadgeClicked}">
                                        ${value.innerHTML}
                                    </multi-select-badge>`;
                            })
                    }
                </div>
                <div class="cs-multi-select-search-field-input-container">
                    <span class="cs-multi-select-chevron-down"</span>
                    <input type="text" class="cs-multi-select-search-field-input" @input="${this.onInput}" @focus="${this.onFocus}" @blur="${this.onBlur}"/>
                </div>
                <div class="cs-multi-select-selection-list">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    onRegisterOption(e) {
        if (e.detail.selected !== true) {
            return;
        }

        this.addValue(e.detail);
    }

    onOptionClicked(e) {
        clearTimeout(this.closeTimeout);
        this._getSearchField().focus();

        this.hasValue(e.detail) ? this.removeValue(e.detail) : this.addValue(e.detail);
    }

    onBadgeClicked(e) {
        const option = this.querySelector(`[value="${e.detail.value}"]`);
        option.removeAttribute('selected');

        this.removeValue(e.detail);
    }

    onFocus() {
        this.open = true;
        this.setAttribute('open', 'open');
        this._adjustListSize();
    }

    onBlur() {
        this.closeTimeout = setTimeout(this._close.bind(this), this.timeoutLength);
    }

    onInput(event) {
        const value = event.currentTarget.value.toLowerCase();

        this.querySelectorAll('multi-select-option').forEach(listItem => {
            if (listItem.innerHTML.toLowerCase().indexOf(value) > -1) {
                listItem.classList.remove(this.hiddenClass);
            } else {
                listItem.classList.add(this.hiddenClass);
            }
        });
    }

    _registerEventListeners() {
        this.addEventListener("cs--multi-select-option-register", this.onRegisterOption.bind(this));
        this.addEventListener("cs--multi-select-option-clicked", this.onOptionClicked.bind(this));
    }

    _close() {
        this.open = false;
        this.removeAttribute('open');
    }

    onMouseEnter(event) {
        if (this.open) {
            this.onMouseLeave(event);
            return;
        }

        event.currentTarget.addEventListener('wheel', this.onScroll.bind(this, event.currentTarget));
    }

    onMouseLeave(event) {
        event.currentTarget.removeEventListener('wheel', this.onScroll.bind(this, event.currentTarget));
    }

    onScroll(element, event) {
        event.preventDefault();
        element.scrollLeft += event.deltaY / 10;
    }

    hasValue(detail) {
        let item = null;
        if (this.valueList.hasOwnProperty(detail.value)) {
            item = this.valueList[detail.value];
        }

        return item !== null;
    }

    addValue(detail) {
        if (!detail.selected) {
            return;
        }

        this.valueList[detail.value] = detail;
        const value = Object.keys(this.valueList);
        this._setFormValue(value);
    }

    removeValue(detail) {
        if (detail.selected) {
            return;
        }

        delete this.valueList[detail.value];
        const value = Object.keys(this.valueList);
        this._setFormValue(value);
    }

    _adjustListSize() {
        this._getList().style = `width: ${this._getSearchField().clientWidth}px;`;
    }

    _getSearchField() {
        if (this.searchField === null) {
            this.searchField = this.renderRoot.querySelector('.cs-multi-select-search-field-input')
        }

        return this.searchField;
    }

    _getList() {
        if (this.list === null) {
            this.list = this.renderRoot.querySelector('.cs-multi-select-selection-list')
        }

        return this.list;
    }

    _setFormValue(value) {
        this.setAttribute('value', JSON.stringify(value));

        const formData = new FormData();
        value.forEach((entry) => {
            formData.append(`${this.name}[]`, entry);
        });

        this.#internals.setFormValue(formData);
    }
}