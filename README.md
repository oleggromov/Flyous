# Flyous
Flyous is a simple script that draws an animated image near mouse cursor.

## Usage
To display animation near the cursor use
```javascript
Flyous.start(options);
```
where required ones are sprite **image path, width and height:**
```javascript
Flyous.start({
	image: 'dummy.png',
	width: 15,
	height: 15
});
```
Consider that Flyous expects width and height of a *one frame*, not the whole image.
Frames should be placed horizontally in the sprite.

You may also use optional **fps**, **zIndex**, **distanceX** and **distanceY** parameters to make animation faster and smoother or slower, change CSS z-index, distance from cursor:
```javascript
Flyous.start({
	image: 'dummy.png',
	width: 15,
	height: 15,
	fps: 20,
	zIndex: 100,
	distanceX: 5,
	distanceY: 10
});
```
Default fps value equals 10, zIndex = 1000, whilte distanceX and distanceY equal frame width and height respectively.

Use stop method to stop animation (Cap!):
```javascript
Flyous.stop();
```

Flyous can have only one instance because the cursor is also only one ;)
Have fun!


## Works in
* Chrome 1, 21 on Windows, 21 on Linux
* Safari 5.1.1 on Windows  
* Firefox 2,  14, 15 on Linux, Firefox 10, 15 on Windows 
* Opera 9.63 (small issue), 11.52, 11.64, 12.02 on Windows, 10.60 on Linux
* IE7, IE8 (appearing scrollbars), IE9+ (full)

## Known bugs and issues
* Scrollbars DOES appear in IE7, IE8
* Chrome, Opera: animation CAN start only after first mouse move.
* Different distance from cursor to image in different browsers.
* Old Opera: animation doesn't hide when cursor leaves the window.
* Safari/Webkit on Windows: bad performance (because of my VM maybe).

## TODO
* Optimized mousemove event handling for better performance.
* (?) Unified distance from cursor to image.
* (?) CSS animation support for modern browsers.
* Minified version.
* (?) Additional checks of object types and properties.