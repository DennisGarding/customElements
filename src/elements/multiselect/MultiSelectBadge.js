import { LitElement, html } from 'lit';
import { MultiSelectBadgeStyle } from './MultiSelectBadgeStyle';

export class MultiSelectBadge extends LitElement {
    static styles = MultiSelectBadgeStyle;

    static properties = {
        value: { type: String },
    };

    render() {
        return html`
            <div class="cs-multi-select-badge">
                <slot></slot>&nbsp;<span class="cs-multi-select-badge-cross" @click="${this.onCloseClick}">&Cross;</span>
            </div>
        `;
    }

    onCloseClick() {
        this.dispatchEvent(new CustomEvent('cs--remove', {
            bubbles: true,
            detail: {
                value: this.value,
                target: this
            }
        }));
    }
}