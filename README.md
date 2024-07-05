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

<multi-select name="test">
    <multi-select-option value="1">Bla1</multi-select-option>
    <multi-select-option selected value="2">Blubb2</multi-select-option>
    <multi-select-option value="3">Blubb3</multi-select-option>
    <multi-select-option value="4">Blubb4</multi-select-option>
    <multi-select-option value="5">Blubb5</multi-select-option>
    <multi-select-option value="6">Blubb6</multi-select-option>
    <multi-select-option value="7">Blubb7</multi-select-option>
    <multi-select-option value="8">Blubb8</multi-select-option>
    <multi-select-option value="9">Blubb9</multi-select-option>
    <multi-select-option value="10">Blubb10</multi-select-option>
    <multi-select-option value="11">Blubb11</multi-select-option>
    <multi-select-option value="12">Blubb12</multi-select-option>
    <multi-select-option value="13">Blubb13</multi-select-option>
    <multi-select-option value="14">Blubb14</multi-select-option>
    <multi-select-option value="15">Blubb15</multi-select-option>
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