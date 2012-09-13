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
Consider that Flyous expects width and height of *one frame*, not the whole image.
Frames should be placed horizontally in the sprite.

You may also use optional **fps** parameter to make animation faster and smoother or slower:
```javascript
Flyous.start({
	image: 'dummy.png',
	width: 15,
	height: 15,
	fps: 20
});
```
Default fps value equals 10.

Use stop method to stop animation (Cap!):
```javascript
Flyous.stop();
```

Flyous can have only one instance because the cursor is also only one ;)
Have fun!


## TODO
* Add some checks for object types and properties.
* Check and fix compatibility with major browsers.
* Disable scrollbars when div moves out of screen.
* Make z-index changeable.