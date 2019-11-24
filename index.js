// Import stylesheets
import './style.css';
import * as PIXI from 'pixi.js'

window.PIXI = PIXI;
var app = new PIXI.Application();
document.body.appendChild(app.view);

app.stage.interactive = true;

var container = new PIXI.Container();
app.stage.addChild(container);

var flag = PIXI.Sprite.from('https://images.unsplash.com/photo-1543005472-1b1d37fa4eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
container.addChild(flag);
flag.x = 0;
flag.y = 0;

var displacementSprite = PIXI.Sprite.from('https://images.unsplash.com/photo-1543005472-1b1d37fa4eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
// Make sure the sprite is wrapping.
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
displacementFilter.padding = 0;

displacementSprite.position = flag.position;

app.stage.addChild(displacementSprite);

flag.filters = [displacementFilter];

displacementFilter.scale.x = 60;
displacementFilter.scale.y = 60;

app.ticker.add(function() {
    // Offset the sprite position to make vFilterCoord update to larger value. Repeat wrapping makes sure there's still pixels on the coordinates.
    displacementSprite.y++;
    // Reset x to 0 when it's over width to keep values from going to very huge numbers.
    if (displacementSprite.y > displacementSprite.width) displacementSprite.y = 0;
});