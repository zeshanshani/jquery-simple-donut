# Simple Load More
This jQuery plugin will add a functionality to load 5 (or custom) more items. Best for lists that are long and you want to hide all except first 5 (or custom) and then show a "Load More" button. When that button is clicked, it loads another 5 items.

*Note: this is not AJAX based. It just hides all the items except the first 5 (or custom) and shows another 5 when button is clicked.*

<a href="https://zeshanshani.github.io/jquery-simple-donut/demos/demo.html" target="_blank">View Demo</a>

## Downlaod

### Via NPM

Download this plugin using this NPM commend.

```
npm i jquery-simple-donut
```

### Regular

Simply close this repository or download it as zip. After that, include the `jquery.simpleDonut.js` file in the head or footer of your HTML page.

``` HTML
<script src="/js/jquery.simpleDonut.js"></script>
```

You can also use the minified version, which is: `jquery.simpleDonut.min.js`

## Usage

``` JS
$('.some-element').simpleDonut({
  item: '.element-item',
  count: 5,
  // itemsToLoad: 10,
  // btnHTML: '<a href="#" class="load-more__btn">View More <i class="fas fa-angle-down"></i></a>'
});
```

## Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| width | integer | 130 | Set the class of the actual items this plugin should take in count. |
| height | integer | 130 | Set the number of items to show at first and load after the button is clicked (if `itemsToLoad` is not set) |
| stroke | integer | 10 | set the number of items to load. Set to -1 to load all at once. |
| total | integer | 100 | Set a custom button here. |
| value | integer | 0 | Set button's custom text here. Use placeholders `{showing}` and `{total}` for showing items counter. Where `{showing}` shows the current number of items displaying and `{total}` shows the total items one instance has. |
| title | string | '' | Set the custom CSS class for the instance. Do not include dot in the class name, e.g., `new-class`  |
| text | string | '{value}/{total}' | Shows the counter in a separate tag. By default enabling this option will show a text `Showing X out of X` before the load more button. <a href="https://zeshanshani.github.io/jquery-simple-donut/demos/demo.html" target="_blank">View Demo</a> for the example. |
| text2 | string | '' | Set custom counter text here. Use placeholders `{showing}` and `{total}` in the text. Where `{showing}` shows the current number of items displaying and `{total}` shows the total items one instance has. |
| defaultColor | string | '#D3DAE6' | Set custom counter text here. Use placeholders `{showing}` and `{total}` in the text. Where `{showing}` shows the current number of items displaying and `{total}` shows the total items one instance has. |
| progressColor | string | '#22AB59' | Set custom counter text here. Use placeholders `{showing}` and `{total}` in the text. Where `{showing}` shows the current number of items displaying and `{total}` shows the total items one instance has. |
