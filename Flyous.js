Flyous = (function() {
	var divId = 'Flyous',
			fps = 10,
			latency = null,
			sprite,

			animation = function() {
				sprite.frame += 1;
				if (sprite.frame >= sprite.frames) {
					sprite.frame = 0;
				}

				sprite.div.style.backgroundPositionX = -(sprite.frame * sprite.width) + 'px';

				sprite.timer = setTimeout(animation, latency);
			},

			createDomElement = function() {
				sprite.div = document.createElement('div');
					sprite.div.id = divId;
					sprite.div.style.width = sprite.width + 'px';
					sprite.div.style.height = sprite.height + 'px';
					sprite.div.style.position = 'absolute';
					sprite.div.style.left = '100px';
					sprite.div.style.top = '100px';
					sprite.div.style.zIndex = '10000';
					sprite.div.style.backgroundImage = 'url(' + sprite.image + ')';

				document.body.appendChild(sprite.div);
			},

			move = function(e) {
				sprite.div.style.left = e.clientX + sprite.width+ 'px';
				sprite.div.style.top = e.clientY + sprite.height + 'px';	
			},

			// Runs when sprite finishes loading.
			initSprite = function() {
				sprite.frames = this.width / this.height;
				createDomElement();
				document.documentElement.onmousemove = move;

				sprite.timer = setTimeout(animation, latency);
			};

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
			};


	// Returns public functions.
	// TODO how does this really work?!
	return {
		start: function(sprite) {
			return init(sprite);
		},
		// stop: function(id) {
		// 	return true;
		// }
	}
})();