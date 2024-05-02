## Build
- npm install
- npm run build

### Development
- npm run build -- --watch

## Multiselect
Create a new tag `<multi-select>`

```html
<!--index.html-->

<script src="dist/index.js" type="module"></script>

<multi-select
        name="multiSelect"
        json-data='[{"id": 1,"name": "hallo"},{"id": 2,"name": "foo"},{"id": 3,"name": "bar"},{"id": 4,"name": "fooBar"}]'
        value="[1,4]"
        display-field="name"
        value-field="id">
</multi-select>
```
