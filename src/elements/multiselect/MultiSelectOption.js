import { LitElement, html } from 'lit';
import { MultiSelectOptionStyle } from './MultiSelectOptionStyle';

export class MultiSelectOption extends LitElement {
    static styles = MultiSelectOptionStyle;

    static properties = {
        value: { type: String },
        selected: { type: Boolean },
    };

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener("click", this.onElementClick.bind(this));

        const me = this;
        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('cs--multi-select-option-register', {
                bubbles: true,
                detail: {
                    value: me.value,
                    selected: me.selected,
                    innerHTML: me.innerHTML
                }
            }));
        }, 1);
    }

    render() {
        return html`
            <slot></slot>
        `;
    }

    onElementClick() {
        this.selected = !this.selected;
        this.updateSelectedAttribute();

        this.dispatchEvent(new CustomEvent('cs--multi-select-option-clicked', {
            bubbles: true,
            detail: {
                value: this.value,
                selected: this.selected,
                innerHTML: this.innerHTML
            }
        }));
    }

    updateSelectedAttribute() {
        if (this.selected) {
            this.setAttribute('selected', '');

            return;
        }

        this.removeAttribute('selected');
    }
}

