import { LitElement, html } from "lit";
import { CookieConsentStyle } from "./CookieConsentStyle";

class CookieConsent extends LitElement {
    static styles = CookieConsentStyle;

    static properties = {
        consentTitle: { type: String, attribute: 'consent-title' },
        consentText: { type: String, attribute: 'consent-text' },

        checkboxConfig: { type: Array, attribute: 'checkbox-config' },
        linkConfig: { type: Array, attribute: 'link-config' },

        acceptAllButtonText: { type: String, attribute: 'accept-all-button-text' },
        acceptSelectedButtonText: { type: String, attribute: 'accept-selected-button-text' },
        leavePageButtonText: { type: String, attribute: 'leave-page-button-text' },
    }

    hiddenClass = 'hidden';
    oneYear = 31536000000;
    value = null;

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        if (!(this.checkboxConfig instanceof Array)) {
            this.checkboxConfig = [];
        }

        if (!(this.linkConfig instanceof Array)) {
            this.linkConfig = [];
        }

        if (!this.consentTitle) {
            throw new Error('CookieConsent - consent-title required')
        }

        if (!this.consentText) {
            throw new Error('CookieConsent - consent-text required')
        }

        if (!this.acceptAllButtonText) {
            throw new Error('CookieConsent - accept-all-button-text required')
        }

        const cookie = this.getCookie();
        if (cookie !== null) {
            this.value = cookie;
        }
    }

    onAcceptAllButtonClick() {
        const accepted = this.checkboxConfig.map(checkbox => {
            return checkbox.name;
        })

        this.setCookie(accepted);
        this.close(accepted);
    }

    onAcceptSelectedButtonClick() {
        const checked = [...this.getOverlay().querySelectorAll('boolean-switch[checked]')];

        const accepted = checked.map(checkbox => {
            return checkbox.getAttribute('name');
        });

        this.setCookie(accepted);
        this.close(accepted);
    }

    onLeavePageButtonClick() {
        window.history.back();
    }

    getCookie() {
        const cookies = `; ${document.cookie}`;
        const value = cookies.split(`; consent=`);

        if (value.length === 2) {
            return JSON.parse(value.pop().split(';').shift());
        }

        return null;
    }

    setCookie(accepted) {
        document.cookie = `consent=${JSON.stringify(accepted)}; path=/; expires=${this.getCookieExpireTime()};`;
    }

    getCookieExpireTime() {
        return new Date(new Date().getTime() + this.oneYear).toGMTString()
    }

    close(accepted) {
        this.getOverlay().classList.add(this.hiddenClass);
        this.value = accepted;
        this.dispatchEvent(new CustomEvent('close', {
            detail: {
                accepted: accepted
            }
        }));
    }

    getOverlay() {
        return this.renderRoot.querySelector('.overlay');
    }

    render() {
        return html`
            <div class="overlay${this.getCookie() !== null ? ' ' + this.hiddenClass : ''}">
                <div class="inner-overlay">
                    <div class="container">
                        <div class="text-container">
                            <div class="title">${this.consentTitle}</div>
                            <div class="text">${this.consentText}</div>
                        </div>
                        ${this.renderCheckboxContainer()}
                        <div class="button-container">
                            <div class="accept-button-container">
                                <div class="button accept-all-button" @click="${this.onAcceptAllButtonClick}">
                                    ${this.acceptAllButtonText}&nbsp;&#10004;
                                </div>
                            </div>
                            ${this.renderButton(this.acceptSelectedButtonText, this.onAcceptSelectedButtonClick)}
                            ${this.renderButton(this.leavePageButtonText, this.onLeavePageButtonClick)}
                        </div>
                        ${this.renderLinkContainer()}
                    </div>
                </div>
            </div>`;
    }

    renderButton(buttonText, buttonAction) {
        if (!buttonText) {
            return ``;
        }

        return html`
            <div class="default-button-container">
                <div class="button default-button" @click="${buttonAction}">
                    ${buttonText}
                </div>
            </div>
        `;
    }

    renderCheckbox(checkbox) {
        if (checkbox.required) {
            return html`
                <boolean-switch name="${checkbox.name}" label="${checkbox.label}" checked="checked"
                                disabled="disabled"></boolean-switch>`;
        }

        return html`
            <boolean-switch name="${checkbox.name}" label="${checkbox.label}"></boolean-switch>`;
    }

    renderCheckboxContainer() {
        if (!this.checkboxConfig.length) {
            return ``;
        }

        return html`
            <div class="checkbox-container">
                ${this.checkboxConfig.map(checkbox => {
                    return this.renderCheckbox(checkbox);
                })}
            </div>
        `;
    }

    renderLinkContainer() {
        if (!this.linkConfig.length) {
            return ``;
        }

        return html`
            <div class="link-container">
                ${this.linkConfig.map((link, index) => {
                    if ((index + 1) >= this.linkConfig.length) {
                        return html`<a href="${link.href}">${link.label}</a>`;
                    }

                    return html`<a href="${link.href}">${link.label}</a> | `;
                })}
            </div>
        `;
    }
}

export { CookieConsent };