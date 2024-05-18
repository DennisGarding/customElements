import { html, LitElement } from 'lit';
import { BooleanSwitchStyle } from "./BooleanSwitchStyle";

class BooleanSwitch extends LitElement {
    static styles = BooleanSwitchStyle;

    static properties = {
        name: { type: String },
        label: { type: String },
        checked: { type: Boolean },
        disabled: { type: Boolean },
    };

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

        this.setFormValue();
    }

    render() {
        return html`
            <div class="boolean-switch-container">
                <div class="boolean-switch" @click="${this.onSliderClick}">
                    <div class="boolean-switch-slider${this.checked ? ' active' : ''}"></div>
                    <div class="disabled${!this.disabled ? ' hidden' : ''}"></div>
                </div>
                <label for="${this.name}" @click="${this.onSliderClick}">&nbsp;${this.label}</label>
            </div>
        `;
    }

    onSliderClick() {
        if (this.disabled) {
            return;
        }

        const sliderClassList = this.getSlider().classList;
        if (sliderClassList.contains('active')) {
            sliderClassList.remove('active');
            this.removeAttribute('checked');

            return;
        }

        sliderClassList.add('active');
        this.setAttribute('checked', 'checked');
    }

    getSlider() {
        return this.renderRoot.querySelector('.boolean-switch-slider');
    }

    /**
     * Function is used for form association
     */
    setFormValue() {
        const formData = new FormData();
        formData.append(`${this.name}`, this.checked);

        this.#internals.setFormValue(formData);
    }
}

export { BooleanSwitch };