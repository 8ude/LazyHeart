HeartSprite = function(position, clickBehavior) {
	
    var self = this;
    this.clickBehavior = clickBehavior;
    this.position = position;
    this.changeLandscape;
    this.changeSun;
    var map1, map2, gifMat1, gifMat2;
    this.HOVER = false;
    this.CLICKED = false;
    this.sprite;

    var spriteA;
    var expanding = false;
    var cooldown = 5.0;
    this.cooldownTimer = 0.0;
    var driftSpeed;
    var time = 0.0;



    this.init = function() {

        var textureLoader = new THREE.TextureLoader();
        map1 = textureLoader.load("spriteRevision.png");
        // for Lazy Heart - duration = 468/num frames
        //spriteA = new TextureAnimator( map1, 8, 1, 8, 78 ); // texture, #horiz, #vert, #total, duration.
        gifMat1 = new THREE.SpriteMaterial( { map: map1, color: 0xffffff, fog: true } );
        //hoverSprite = new TextureAnimator( map2, 6, 1, 6, 78 ); // texture, #horiz, #vert, #total, duration.
        //gifMat2 = new THREE.SpriteMaterial( { map: map2, color: 0xffffff, fog: true } );

        //var colGeometry = new THREE.PlaneGeometry( 2, 2, 32 );
        //var colMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, visible: false} );
        this.sprite = new THREE.Sprite(gifMat1);
        this.sprite.myParent = self;
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
        this.sprite.position.z = this.position.z;
        this.sprite.scale.set(3.0,3.0);

        console.log (this.sprite.scale.x);
        driftSpeed =  Math.random()/20;

        

        scene.add(this.sprite);

        console.log('init successful');

    }

    this.update = function(delta) {

        if (this.HOVER && !this.CLICKED) {
            this.sprite.material.color.setHex( 0xffff00 );
        } else {
            this.sprite.material.color.setHex( 0xffffff );
        }

        if (this.CLICKED) {
            this.cooldownTimer = cooldown;
            this.sprite.material.color.setHex(0xff00ff);
           
            TweenLite.to(this.sprite.scale, 1.0, {x: 5, y: 5});
            TweenLite.to(this.sprite.material, 1.0, {opacity: 0.0});
            this.CLICKED = false;

        }

        if (this.sprite.material.opacity == 0.0) {
            this.sprite.scale.set(0.1,0.1);
            this.ResetSprite();
        }
        this.cooldownTimer -= delta;
        time += delta;


        this.sprite.material.rotation += (driftSpeed * Math.sin(time/2));
        this.sprite.position.z += driftSpeed/4;

        if (this.sprite.position.z > camera.position.z + 100 ) {
            TweenLite.to(this.sprite.material, 1.0, {opacity : 0.0})
            //this.ResetSprite();
        }

        //spriteA.update(delta * 1000);

    }
    /*
    this.ResetSprite = function() {
        expanding = false;
        //this.sprite.scale.x = 1;
        //this.sprite.scale.y = 1;
        this.sprite.material.opacity = 0.1;
        
        this.sprite.position.x = (camera.position.x + Math.random()*50 - 25);
        this.sprite.position.y = (camera.position.y + Math.random()*30 - 15);
        this.sprite.position.z = (camera.position.z - Math.random()*20 - 20);


        TweenLite.to(this.sprite.scale, 1.0, {x: "2.0", y: "2.0"});
        TweenLite.to(this.sprite.material, 1.0, {opacity: "1.0"});

        //this.sprite.scale.x = 1.0;
        //this.sprite.scale.y = 1.0;    
        //this.sprite.material.opacity = 1.0;
    } */

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

HeartSprite.prototype.ResetSprite = function() {

        expanding = false;
        //this.sprite.scale.x = 1;
        //this.sprite.scale.y = 1;
        this.sprite.material.opacity = 0.1;
        
        this.sprite.position.x = (camera.position.x + Math.random()*100 - 50);
        this.sprite.position.y = (camera.position.y + Math.random()*50 - 15);
        this.sprite.position.z = (camera.position.z - Math.random()*30 + 10);


        TweenLite.to(this.sprite.scale, 5.0, {x: "3.0", y: "3.0"});
        TweenLite.to(this.sprite.material, 1.0, {opacity: "1.0"});

        //this.sprite.scale.x = 1.0;
        //this.sprite.scale.y = 1.0;    
        //this.sprite.material.opacity = 1.0;


    
}


