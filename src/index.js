import { CookieConsent } from "./elements/Consent/CookieConsent";
import { BooleanSwitch } from "./elements/BooleanSwitch/BooleanSwitch";
import { MultiSelect } from "./elements/multiselect/MultiSelect";
import { MultiSelectOption } from "./elements/multiselect/MultiSelectOption";
import { MultiSelectBadge } from "./elements/multiselect/MultiSelectBadge";

window.customElements.define('cookie-consent', CookieConsent);
window.customElements.define('boolean-switch', BooleanSwitch);

window.customElements.define('multi-select', MultiSelect);
window.customElements.define('multi-select-badge', MultiSelectBadge);
window.customElements.define('multi-select-option', MultiSelectOption);
