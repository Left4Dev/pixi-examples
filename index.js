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
const spriteCollection = [{ url : '', name:'', blend:1,alpha:1,x:0,y:0,scaleX:1,scaleY:1}]
const sprite = ['https://images.unsplash.com/photo-1543005472-1b1d37fa4eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
, 'https://images.unsplash.com/photo-1574482550419-2dab78b38637?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80',
// const sprite2 = 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80']
const displacement_sprite =  ['https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
'https://images.unsplash.com/photo-1574537018953-133e48795d7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80']
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
  addSprite(url,options){

    const backgroundSprite = PIXI.Sprite.from(url||sprite1);
    backgroundSprite.x = 0;
    backgroundSprite.y = 0;
    backgroundSprite.scale.y=options.scaleY||1
    backgroundSprite.scale.x=options.scaleY||1

    this.container.addChild(backgroundSprite);
    this.backgroundSprites.push(backgroundSprite)

    backgroundSprite.blendMode = options.blendMode||4
    backgroundSprite.alpha = options.alpha||0.8


  }
  addDisplacementFilter(sprite,options){
    const displacementSprite = PIXI.Sprite.from(sprite||displacement_sprite[0]);
    displacementSprite.scale.y=options.scaleY||20
    displacementSprite.scale.x=options.scaleX||10
    
    // Make sure the sprite is wrapping.
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRRORED_REPEAT;
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    this.displacementSprites.push(displacementSprite)
    this.displacementFilters.push(displacementFilter)

    // displacementSprite.position = this.backgroundSprite.position;

    this.app.stage.addChild(displacementSprite);

    displacementFilter.scale.x = options.displaceX||80;
    displacementFilter.scale.y = options.displaceY||80;
    // displacementSprite.y =  displacementSprite.height

  }
  assignFilter(){
    // this.backgroundSprites.forEach((i)=>i.filters = this.displacementFilters)

    this.backgroundSprites[0].position.x=-500
    this.backgroundSprites[1].position.x=-200
    this.backgroundSprites[2].position.x=-800
   this.backgroundSprites[0].mask=this.backgroundSprites[4]
   this.backgroundSprites[1].mask=this.backgroundSprites[4]
   this.backgroundSprites[2].mask=this.backgroundSprites[4]
   this.backgroundSprites[3].mask=this.backgroundSprites[4]
    this.backgroundSprites[0].filters = [this.displacementFilters[0]]
    this.backgroundSprites[1].filters = [this.displacementFilters[1]]
    this.backgroundSprites[2].filters = [this.displacementFilters[0]]
    this.backgroundSprites[3].filters = [this.displacementFilters[1]]
    this.backgroundSprites[3].filters = [this.displacementFilters[1]]

  }
  destroy(){
    while(this.app.stage.children[0]) { this.app.stage.removeChild(this.app.stage.children[0]); }
    this.backgroundSprites=[]
    this.displacementFilters=[]
    this.displacementSprites=[]
  }
  create(){
    this.addSprite(sprite[1],{alpha:1,blend:1})
    this.addSprite(sprite[1],{alpha:0.5,blend:1})
    this.addSprite(sprite[1],{alpha:0.3,blend:1})
    this.addSprite(sprite[0],{alpha:0.5,blend:1})
    this.addSprite(sprite[2],{alpha:0.651,blend:1})

    this.addDisplacementFilter(displacement_sprite[0],{scaleX:10,scaleY:10,displaceX:50,displaceY:50})
    this.addDisplacementFilter(displacement_sprite[1],{scaleX:10,scaleY:50,displaceX:20,displaceY:20})

    this.assignFilter()
    this.app.ticker.add(()=> {
        if(this.displacementSprites.length==0)
          return

        this.displacementSprites[0].y-=15;
        // this.displacementSprites[0].angle=this.displacementSprites[0].angle>=Math.PI*2?0:this.displacementSprites[0].angle+(Math.PI/180);
        if (this.displacementSprites[0].y < -(3*this.displacementSprites[0].height)) this.displacementSprites[0].y = 0;

        this.displacementSprites[1].y-=14;
        // this.displacementSprites[1].angle=this.displacementSprites[1].angle>=Math.PI*2?0:this.displacementSprites[1].angle+(Math.PI/180);

        if (this.displacementSprites[1].y < -(3*this.displacementSprites[1].height)) this.displacementSprites[1].y = 0;


        this.displacementSprites[1].x-=14;
        if (this.displacementSprites[1].x < -(3*this.displacementSprites[1].width)) this.displacementSprites[1].x = 0;

    });
    }



}

const ex = new Example()
