Flyous = (function() {
	var divId = 'Flyous',
			fps = 10,
			latency = null,
			sprite,

			createDomElement = function() {
				sprite.div = document.createElement('div');
					sprite.div.id = divId;
					sprite.div.style.width = sprite.width + 'px';
					sprite.div.style.height = sprite.height + 'px';
					sprite.div.style.position = 'absolute';
					sprite.div.style.left = '-10000px';
					sprite.div.style.top = '-10000px';
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
				// TODO replace with eventListenter.
				document.documentElement.onmousemove = move;
				document.documentElement.onmouseover = show;
				document.documentElement.onmouseout = hide;
				// Starts animation of sprite.
				sprite.timer = setTimeout(animation, latency);
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
				// Remove event handlers.
				clearTimeout(sprite.timer);
				// TODO replace with eventListenter.
				document.documentElement.onmousemove = null;

				delete sprite.img;
				document.body.removeChild(sprite.div);
				sprite = null;

				return true;
			};

	// Returns public functions.
	return {
		start: function(sprite) {
			return init(sprite);
		},
		stop: function() {
			return remove();
		}
	}
}());