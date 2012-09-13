# Flyous
Flyous is a simple script that draws an animated image near mouse cursor.

## Usage
To display animation near the cursor use
```javascript
	Flyous.start(options);
```
where required are sprite **image path, width and height:**
```javascript
	Flyous.start({
		image: 'dummy.png',
		width: 15,
		height: 15
	});
```

Consider that Flyous expects width and height of *one frame*, not the whole script.
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

Its default value equals 10.

Have fun!