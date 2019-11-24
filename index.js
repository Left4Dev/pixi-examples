// Import stylesheets
import './style.css';
import * as PIXI from 'pixi.js'

window.PIXI = PIXI;





class Example {
  constructor(){

    this.displacementSprites = []
    this.displacementFilters = []
    
    this.app = new PIXI.Application({height:1200, width:700});
    document.body.appendChild(this.app.view);

    this.app.stage.interactive = true;

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    
    this.create();
  }
  addSprite(){

    this.backgroundSprite = PIXI.Sprite.from('https://images.unsplash.com/photo-1543005472-1b1d37fa4eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=20');
    this.container.addChild(this.backgroundSprite);
    this.backgroundSprite.x = 0;
    this.backgroundSprite.y = 0;
  }
  addDisplacementFilter(){
    const displacementSprite = PIXI.Sprite.from('https://images.unsplash.com/photo-1497044725446-4156b475ea88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
    displacementSprite.scale.y=50
    
    // Make sure the sprite is wrapping.
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    this.displacementSprites.push(displacementSprite)
    this.displacementFilters.push(displacementFilter)

    // displacementSprite.position = this.backgroundSprite.position;

    this.app.stage.addChild(displacementSprite);

    displacementFilter.scale.x = 200;
    displacementFilter.scale.y = 200;
    // displacementSprite.y =  displacementSprite.height

  }
  create(){
    this.addSprite()
    this.addDisplacementFilter()
    // this.addDisplacementFilter()
    // this.addDisplacementFilter()
    // this.addDisplacementFilter()
    
    this.backgroundSprite.filters = this.displacementFilters

    this.app.ticker.add(()=> {
        // Offset the sprite position to make vFilterCoord update to larger value. Repeat wrapping makes sure there's still pixels on the coordinates.
        this.displacementSprites[0].y-=5;
        // Reset x to 0 when it's over width to keep values from going to very huge numbers.
        if (this.displacementSprites[0].y < -this.displacementSprites[0].height) this.displacementSprites[0].y = 0;

        // this.displacementSprites[1].x-=4;
        // // Reset x to 0 when it's over width to keep values from going to very huge numbers.
        // if (this.displacementSprites[1].x < 0) this.displacementSprites[1].x = 0;
        // this.displacementSprites[2].x-=1;
        // // Reset x to 0 when it's over width to keep values from going to very huge numbers.
        // if (this.displacementSprites[2].x < 0) this.displacementSprites[2].x = 0;

        //         this.displacementSprites[3].y-=1;
        // // Reset x to 0 when it's over width to keep values from going to very huge numbers.
        // if (this.displacementSprites[3].y < 0) this.displacementSprites[3].y = 0;

    });
    }


}

const ex = new Example()