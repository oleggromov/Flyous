Flyous = (function() {
	// Adds temporary event listener to get initial mouse coords.
	var handleCursor = function(e) {
		initX = e.clientX;
		initY = e.clientY;
	};
	document.addEventListener('mousemove', handleCursor, false);

	var divId = 'Flyous',
			fps = 10,
			latency = null,
			sprite,
			initX, initY,

			createDomElement = function() {
				sprite.div = document.createElement('div');
					sprite.div.id = divId;
					sprite.div.style.width = sprite.width + 'px';
					sprite.div.style.height = sprite.height + 'px';
					sprite.div.style.position = 'absolute';
					sprite.div.style.left = initX ? initX + sprite.width + 'px' : '-10000px';
					sprite.div.style.top = initY ? initY + sprite.height + 'px' : '-10000px';
					sprite.div.style.zIndex = '10000';
					sprite.div.style.backgroundImage = 'url(' + sprite.image + ')';

				document.body.appendChild(sprite.div);
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
				sprite.div.style.left = e.clientX + sprite.width+ 'px';
				sprite.div.style.top = e.clientY + sprite.height + 'px';	
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
				document.addEventListener('mousemove', move, false);
				document.addEventListener('mouseover', show, false);
				document.addEventListener('mouseout', hide, false);
				// Starts animation of sprite.
				sprite.timer = setTimeout(animation, latency);

				// Removes tracking while animating.
				document.removeEventListener('mousemove', handleCursor);
			},

			init = function(obj) {
				sprite = {
					image: obj.image || false,
					width: obj.width || 0,
					height: obj.height || 0,
					fps: obj.fps || fps,
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
				document.removeEventListener('mousemove', move);
				document.removeEventListener('mouseover', show);
				document.removeEventListener('mouseout', hide);
				// Start tracking mouse movement while inactive.
				document.addEventListener('mousemove', handleCursor, false);

				delete sprite.img;
				document.body.removeChild(sprite.div);
				sprite = null;

				return true;
			};

	// Returns public functions.
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