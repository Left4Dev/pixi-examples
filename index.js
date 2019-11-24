// Import stylesheets
import './style.css';
import * as PIXI from 'pixi.js'

window.PIXI = PIXI;


// {
// 	"alpha": {
// 		"start": 1,
// 		"end": 0
// 	},
// 	"scale": {
// 		"start": 2,
// 		"end": 1,
// 		"minimumScaleMultiplier": 0.001
// 	},
// 	"color": {
// 		"start": "#ffed66",
// 		"end": "#ff330a"
// 	},
// 	"speed": {
// 		"start": 200,
// 		"end": 43,
// 		"minimumSpeedMultiplier": 2
// 	},
// 	"acceleration": {
// 		"x": 0,
// 		"y": 0
// 	},
// 	"maxSpeed": 0,
// 	"startRotation": {
// 		"min": 0,
// 		"max": 360
// 	},
// 	"noRotation": false,
// 	"rotationSpeed": {
// 		"min": 10,
// 		"max": 100
// 	},
// 	"lifetime": {
// 		"min": 0.2,
// 		"max": 1.13
// 	},
// 	"blendMode": "normal",
// 	"frequency": 0.001,
// 	"emitterLifetime": -1,
// 	"maxParticles": 1000,
// 	"pos": {
// 		"x": 0,
// 		"y": 0
// 	},
// 	"addAtBack": true,
// 	"spawnType": "circle",
// 	"spawnCircle": {
// 		"x": 0,
// 		"y": 0,
// 		"r": 50
// 	}
// }

const sprite = 'https://images.unsplash.com/photo-1543005472-1b1d37fa4eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
const sprite1 = 'https://images.unsplash.com/photo-1574482550419-2dab78b38637?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'
const displacement_sprite = 'https://images.unsplash.com/photo-1497044725446-4156b475ea88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
const displacement_sprite1 = 'https://images.unsplash.com/photo-1574482550419-2dab78b38637?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'
class Example {
  constructor(){

    this.backgroundSprites = []
    this.displacementSprites = []
    this.displacementFilters = []
    
    this.app = new PIXI.Application({height:1200, width:800});
    document.body.appendChild(this.app.view);

    this.app.stage.interactive = true;

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    
    this.create();
  }
  addSprite(url,alpha,blendMode){

    const backgroundSprite = PIXI.Sprite.from(url||sprite1);
    backgroundSprite.x = 0;
    backgroundSprite.y = 0;


    this.container.addChild(backgroundSprite);
    this.backgroundSprites.push(backgroundSprite)

    backgroundSprite.blendMode = blendMode||4
    backgroundSprite.alpha = alpha||0.8


  }
  addDisplacementFilter(){
    const displacementSprite = PIXI.Sprite.from(displacement_sprite);
    displacementSprite.scale.y=30
    displacementSprite.scale.x=30
    
    // Make sure the sprite is wrapping.
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRRORED_REPEAT;
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    this.displacementSprites.push(displacementSprite)
    this.displacementFilters.push(displacementFilter)

    // displacementSprite.position = this.backgroundSprite.position;

    this.app.stage.addChild(displacementSprite);

    displacementFilter.scale.x = 110;
    displacementFilter.scale.y = 110;
    // displacementSprite.y =  displacementSprite.height

  }
  create(){
    // this.addSprite(sprite,1,3)
    this.addSprite(sprite1,0.8,3)
    this.addSprite(sprite1,0.8,1)
    this.addSprite(sprite,0.5,1)

    this.addDisplacementFilter()
    this.addDisplacementFilter()

    // this.backgroundSprites.forEach((i)=>i.filters = this.displacementFilters)
    this.backgroundSprites[0].position.x=-400
    this.backgroundSprites[1].position.x=-200
    this.backgroundSprites[0].filters = [this.displacementFilters[0]]
    this.backgroundSprites[1].filters = [this.displacementFilters[1]]
    this.backgroundSprites[2].filters = [this.displacementFilters[1]]

    this.app.ticker.add(()=> {
        this.displacementSprites[0].y-=5;
        this.displacementSprites[0].angle-=0.01;
        if (this.displacementSprites[0].y < -(2*this.displacementSprites[0].height)) this.displacementSprites[0].y = 0;

        this.displacementSprites[1].y-=4;
        this.displacementSprites[1].angle-=Math.PI/180;
        if (this.displacementSprites[1].y < -(2*this.displacementSprites[1].height)) this.displacementSprites[1].y = 0;


        // this.displacementSprites[1].x-=4;
        // if (this.displacementSprites[1].x < -(2*this.displacementSprites[1].width)) this.displacementSprites[1].x = 0;


    });
    }


}

const ex = new Example()