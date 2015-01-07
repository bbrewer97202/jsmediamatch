# jsmediamatch

Give JavaScript insight into which CSS breakpoints or media queries are currently active.

See [demo](http://bbrewer97202.github.io/jsmediamatch/demo/index.html)

## Usage

Initialize jsmediamatch on load of your app. Pass in an object of key/value pairs to match your CSS, where each key describes a media query value.
```javascript
	jsmediamatch.init({
		mobile: "(min-width:1px)",
		tablet: "(min-width:768px)",
		desktop: "(min-width:960px)",
		largedesktop: "(min-width:1200px)"
	});
```

Listen for change events that return all media queries rules and whether or not they are matched. 
```javascript
	window.addEventListener('change.jsmediamatch', function(evt) {
		console.log(evt.detail);
		//e.g. { mobile: true, tablet: true, desktop: false, largedesktop: false }
	});
```

## Installation

Add jsmediamatch.js to your HTML file or JS bundle.

## Browser Support
Works with all modern browsers, uses [matchMedia.js polyfill](https://github.com/paulirish/matchMedia.js/) for IE9. IE8 and below unsupported.

## License

[MIT License](LICENSE.txt) © 2015 Ben Brewer