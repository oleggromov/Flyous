/* 
 * Flyous v1.0 
 * Simple script that draws an animated image near mouse cursor.
 * https://github.com/oleggromov/Flyous
 *
 * Copyright 2012 Oleg Gromov
 * http://oleggromov.com
 * mail@oleggromov.com
 *
 * Released under the MIT license
 * https://github.com/oleggromov/Flyous/blob/master/LICENSE
 */
Flyous = (function() {
	"use strict";
	// Initializaion minimum.
	var doc = document,
		initX, initY,
		handleCursor = function(e) {
			initX = e.clientX;
			initY = e.clientY;
		},
		handle = function(name, callback) {
			if (doc.addEventListener) {
				doc.addEventListener(name, callback, false);
			} else if (doc.attachEvent) {
				doc.attachEvent('on'+name, callback);
			}
		},
		stopHandling = function(name, callback) {
			if (doc.removeEventListener) {
				doc.removeEventListener(name, callback);
			} else if (doc.detachEvent) {
				doc.detachEvent('on'+name, callback);
			}
		};
	// Adds temporary event listener to get initial mouse coords.
	handle('mousemove', handleCursor);

	// Main logic.
	var divId = 'Flyous',
		fps = 10,
		latency = null,
		sprite,
		createDomElement = function() {
			var sdiv;

			sprite.div = doc.createElement('div');
			sdiv = sprite.div;
				sdiv.id = divId;
				sdiv.style.width = sprite.width + 'px';
				sdiv.style.height = sprite.height + 'px';
				sdiv.style.position = 'absolute';
				sdiv.style.left = initX ? initX + sprite.dx + 'px' : '-10000px';
				sdiv.style.top = initY ? initY + sprite.dy + 'px' : '-10000px';
				sdiv.style.zIndex = sprite.zIndex;
				sdiv.style.backgroundImage = 'url(' + sprite.image + ')';

			doc.body.appendChild(sdiv);
		},
		animation = function() {
			sprite.frame += 1;
			if (sprite.frame >= sprite.frames) {
				sprite.frame = 0;
			}

			sprite.div.style.backgroundPosition = -(sprite.frame * sprite.width) + 'px' + ' 0';

			sprite.timer = setTimeout(animation, latency);
		},
		move = function(e) {
			var win = window,
				wwidth = win.innerWidth,
				wheight = win.innerHeight,
				sdiv = sprite.div,
				swidth = sprite.width,
				sheight = sprite.height,
				outX, outY,
				left = e.clientX + sprite.dx,
				top = e.clientY + sprite.dy;

			// TODO IE doesn't know anything about window.innerWidth/innerHeight.
			if (typeof wwidth === 'undefined' || typeof wheight === 'undefined') {
				wwidth = wheight = 0;
			}

			// If image moves out of screen;
			outX = left + swidth - wwidth;
			outY = top + sheight - wheight;
			if (outX > 0) {
				left -= outX;
			}
			if (outY > 0) {
				top -= outY;
			}

			sdiv.style.left = left + 'px';
			sdiv.style.top = top + 'px';
		},
		show = function(e) {
			sprite.div.style.display= 'block';
			move(e);
		},
		hide = function(e) {
			sprite.div.style.display= 'none';
		},
		// Runs when sprite finishes loading.
		initSprite = function() {
			sprite.frames = this.width / this.height;
			createDomElement();

			// Starts listening for mouse moves.
			handle('mousemove', move);
			handle('mouseover', show);
			handle('mouseout', hide);
			// Starts animation of sprite.
			sprite.timer = setTimeout(animation, latency);

			// Removes tracking while animating.
			stopHandling('mousemove', handleCursor);
		},
		init = function(obj) {
			sprite = {
				image: obj.image || false,
				width: obj.width || 0,
				height: obj.height || 0,
				fps: obj.fps || fps,
				zIndex: obj.zIndex || 10000,
				dx: obj.distanceX || obj.width,
				dy: obj.distanceY || obj.height,
				frames: 0,
				frame: 0,
				img: null
			};

			if (!sprite.image) {
				return false;
			}

			sprite.img = new Image();
				sprite.img.onload = initSprite;
				sprite.img.src = sprite.image;

			latency = 1000 / sprite.fps;

			return true;
		},
		remove = function() {
			// Stop handling events.
			clearTimeout(sprite.timer);
			stopHandling('mousemove', move);
			stopHandling('mouseover', show);
			stopHandling('mouseout', hide);
			// Start tracking mouse movement while inactive.
			handle('mousemove', handleCursor);

			delete sprite.img;
			doc.body.removeChild(sprite.div);
			sprite = null;

			return true;
		};

	// Public interface.
	return {
		start: function(sprite) {
			if (typeof sprite !== 'object') {
				return false;
			} else {
				return init(sprite);	
			}
		},
		stop: function() {
			return remove();
		}
	}
}());