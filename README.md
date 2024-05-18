## Build
- npm install
- npm run build

### Development
- npm run build -- --watch

## Including
```html
<!--index.html-->

<script src="dist/index.js" type="module"></script>
```

## Multiselect
Create a new tag `<multi-select>`

```html
<!--index.html-->

<multi-select
        name="multiSelect"
        json-data='[{"id": 1,"name": "hallo"},{"id": 2,"name": "foo"},{"id": 3,"name": "bar"},{"id": 4,"name": "fooBar"}]'
        value="[1,4]"
        display-field="name"
        value-field="id">
</multi-select>
```
## CookieConsent

```html
<!--index.html-->

<cookie-consent
    consent-title="We respect your privacy"
    consent-text="At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam."
    accept-all-button-text="Accept all"
    accept-selected-button-text="Accept selection"
    leave-page-button-text="Leave page"
    checkbox-config='[
        {"name": "technicalRequired", "label": "Technical required", "required": true}
        {"name": "comfort", "label": "Comfort"},
        {"name": "statisticAndTracking", "label": "Statistic and Tracking"}
    ]'
    link-config='[
        {"label": "Privacy policy", "href": "https://www.link-to-your-privacy-poilcy.com"},
        {"label": "Cookie policy", "href": "https://www.ink-to-your-cookie-poilcy.com"}
    ]'>
</cookie-consent>
```

## BooleanSwitch

```html
<boolean-switch name="test" label="This is a test"></boolean-switch>

<boolean-switch name="test" label="This is a checked test" checked="checked"></boolean-switch>

<boolean-switch name="test" label="This is a disabled test" disabled="disabled"></boolean-switch>

<boolean-switch name="test" label="This is a checked and disabled test" checked="checked" disabled="disabled"></boolean-switch>

```