HeartSprite = function(position, clickBehavior) {
	
    var self = this;
    this.clickBehavior = clickBehavior;
    this.position = position;
    this.changeLandscape;
    this.changeSun
    var map1, map2, gifMat1, gifMat2;
    this.HOVER = false;
    this.SELECTED = false;
    this.sprite;



    this.init = function() {

        var textureLoader = new THREE.TextureLoader();
        map1 = textureLoader.load("Texture2.png");
        // for Lazy Heart - duration = 468/num frames
        spriteA = new TextureAnimator( map1, 8, 1, 8, 78 ); // texture, #horiz, #vert, #total, duration.
        gifMat1 = new THREE.SpriteMaterial( { map: map1, color: 0xffffff, fog: true } );
        //hoverSprite = new TextureAnimator( map2, 6, 1, 6, 78 ); // texture, #horiz, #vert, #total, duration.
        //gifMat2 = new THREE.SpriteMaterial( { map: map2, color: 0xffffff, fog: true } );

        var colGeometry = new THREE.PlaneGeometry( 2, 2, 32 );
        var colMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, visible: false} );
        this.sprite = new THREE.Sprite(gifMat1);
        this.sprite.myParent = self;
        this.sprite.position = position;

        console.log('init successful');

    }

    this.update = function(delta) {

        if (this.HOVER && this.CLICKED == false) {
            this.sprite.material.color.setHex( 0xff0000 );
        } else if (this.HOVER == false) {
            this.sprite.material.color.setHex( 0xffffff );
        }

        if (this.CLICKED) {
            this.sprite.material.color.setHex(0xff00ff);
            switch (this.clickBehavior) {
                case 0 :
                    console.log("shit's expanding");
                    break;
                case 1 :
                    console.log("shit's gone");
                    break;
                case 2: 
                    console.log("whoah, down is up!!");
                    break;
                case 3 :
                    console.log("sun sun sun");
                    break;
                case 4 :
                    console.log("maybe I won't do this one");
                    break;
                default: console.log("changning colors");

            }

        }
        spriteA.update(delta * 1000);

    }



	function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) { 
        // note: texture passed by reference, will be updated by the update function.
          
        this.tilesHorizontal = tilesHoriz;
        this.tilesVertical = tilesVert;
        // how many images does this spritesheet contain?
        //  usually equals tilesHoriz * tilesVert, but not necessarily,
        //  if there at blank tiles at the bottom of the spritesheet. 
        this.numberOfTiles = numTiles;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
        texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

        // how long should each image be displayed?
        this.tileDisplayDuration = tileDispDuration;

        // how long has the current image been displayed?
        this.currentDisplayTime = 0;

        // which image is currently being displayed?
        this.currentTile = 0;

        this.click
          
        this.update = function( milliSec ) {
          this.currentDisplayTime += milliSec;
          while (this.currentDisplayTime > this.tileDisplayDuration) {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles)
              this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
            texture.offset.y = currentRow / this.tilesVertical;
          }
       	};
    }
}


