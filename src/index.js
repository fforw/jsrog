import "./style.css"
import { Application, Assets, Texture } from 'pixi.js';
import { CompositeTilemap, Tilemap } from "@pixi/tilemap"
import perfNow from 'performance-now';

// Create a PixiJS application.
const app = new Application();

// Intialize the application.
app.init({ background: '#16161d', resizeTo: window })
    .then(
        () => {
            // Then adding the application's canvas to the DOM body.
            document.body.appendChild(app.canvas);
            
            Assets.add({ alias: 'atlas', src: 'assets/atlas-0.json'});

            // const tilemap2 = new CompositeTilemap();
            // app.stage.addChild(tilemap2);
            Assets.load(['atlas']).then(() =>
            {
                let tilemap = new Tilemap([Texture.from("smiley.png").source]);
                app.stage.addChild(tilemap);

                const size = 20

                const ox = 0
                const oy = 0


                let x = ox + 96 + 16, y = oy + 96


                function build(x,y)
                {
                    // app.stage.removeChild(tilemap);
                    // tilemap = new Tilemap([Texture.from("smiley.png").source]);
                    // app.stage.addChild(tilemap);
                    tilemap.clear()
                    app.stage.renderGroup.onChildUpdate(tilemap);
                    for (let y = 0; y < size; y++)
                    {
                        for (let x = 0; x < size; x++)
                        {
                            const isBorder = (x === 0) || (x === size - 1) || (y === 0) || (y === size - 1)
                            tilemap.tile(isBorder || Math.random() < 0.5 ? "wall.png" : "floor.png", ox + x * 32, oy + y * 32)
                        }
                    }

                    tilemap.tile("smiley.png", x | 0, y)
                }

                app.ticker.add(time => {

                    build(x,y)

                    x += time.deltaTime
                })
            });

        }
    )

