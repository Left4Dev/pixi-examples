// Import stylesheets
import './style.css';
import * as PIXI from 'pixi.js'

window.PIXI = PIXI;
var app = new PIXI.Application();
document.body.appendChild(app.view);

app.stage.interactive = true;

var container = new PIXI.Container();
app.stage.addChild(container);

var backgroundSprite = PIXI.Sprite.from('https://images.unsplash.com/photo-1543005472-1b1d37fa4eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
container.addChild(backgroundSprite);
backgroundSprite.x = 0;
backgroundSprite.y = 0;

var displacementSprite = PIXI.Sprite.from('https://images.unsplash.com/photo-1497044725446-4156b475ea88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
displacementSprite.scale.y=10
// Make sure the sprite is wrapping.
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

displacementSprite.position = backgroundSprite.position;

app.stage.addChild(displacementSprite);

backgroundSprite.filters = [displacementFilter];

displacementFilter.scale.x = 50;
displacementFilter.scale.y = 50;

displacementSprite.y =  displacementSprite.height



var displacementSprite1 = PIXI.Sprite.from('https://images.unsplash.com/photo-1497044725446-4156b475ea88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
displacementSprite1.scale.y=5
// Make sure the sprite is wrapping.
displacementSprite1.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
var displacementFilter1 = new PIXI.filters.DisplacementFilter(displacementSprite1);

displacementSprite1.position = backgroundSprite.position;

app.stage.addChild(displacementSprite1);

backgroundSprite.filters = [displacementFilter,displacementFilter1];

displacementFilter1.scale.x = 50;
displacementFilter1.scale.y = 50;

// displacementSprite1.y =  displacementSprite1.height


app.ticker.add(function() {
    // Offset the sprite position to make vFilterCoord update to larger value. Repeat wrapping makes sure there's still pixels on the coordinates.
    displacementSprite.y--;
    // Reset x to 0 when it's over width to keep values from going to very huge numbers.
    if (displacementSprite.y < 0) displacementSprite.y = 0;

     displacementSprite1.x--;
    // Reset x to 0 when it's over width to keep values from going to very huge numbers.
    if (displacementSprite1.x < 0) displacementSprite1.x = 0;
});