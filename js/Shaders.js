class Greyscale extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
                precision mediump float;

                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;

                void main(void) {
                    vec4 texture = texture2D(uMainSampler, outTexCoord); //Create texture variable, containing colour and alpha values of the pixels
                    float grey = dot(texture.rgb, vec3(0.299, 0.587, 0.114)); //Calculate greyscale luma coding using dot product (Y = 0.299R + 0.587G + 0.114B);
                    gl_FragColor = vec4(vec3(grey), 1.0); //Create a vec4 from the grey vec3 and apply to the shader. This effectively ends the shader.
                }
            `
        });
    }
}

class Plasma extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
                precision mediump float;

                uniform sampler2D uMainSampler;
                uniform vec2 uResolution;
                uniform float uTime;

                varying vec2 outTexCoord;
                varying vec4 outTint;

                vec4 plasma()
                {
                    vec2 pixelPos = gl_FragCoord.xy / uResolution; //Find the normalised position of the pixel
                    float freq = 0.8;
                    float value = //Add a bunch of different waves together
                        sin(uTime + pixelPos.x * freq) +
                        sin(uTime + pixelPos.y * freq) +
                        sin(uTime + (pixelPos.x + pixelPos.y) * freq) +
                        cos(uTime + sqrt(length(pixelPos - 0.5)) * freq * 2.0);

                    return vec4( //Make a vector 4 from all these different wave values.
                        cos(value),
                        sin(value),
                        sin(value * 3.14 * 2.0),
                        cos(value)
                    );
                }

                void main()
                {
                    vec4 texture = texture2D(uMainSampler, outTexCoord); //Create texture variable, containing colour and alpha values of the pixels
                    gl_FragColor = texture * plasma(); //Multiply the texture by the result of plasma() and apply to the shader. This effectively ends the shader.
                }
            `

        });
    }
}


class FlipX extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
                precision mediump float;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;

                void main() {
                    vec2 pixelCoord = outTexCoord; //Create a vec2 containing the coordinates of the pixel
                    pixelCoord.x *= -1.0; //Reverse the x pixel's coordinates.
                    vec4 texture = texture2D(uMainSampler, pixelCoord); //Create texture variable, containing colour and alpha values of the pixels
                    gl_FragColor = texture; //Apply the vec4 to the shader. This effectively ends the shader.
                }
            `
        });
    }
}

class PulseRed extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
                precision mediump float;

                uniform vec2 uResolution;
                uniform float uTime;

                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;

                void main(){
                    vec4 texture = texture2D(uMainSampler, outTexCoord); //Create texture variable, containing colour and alpha values of the pixels
                    vec4 wave = vec4(abs(sin(uTime)), 0.0, 0.0, 1.0); //Create a vec4 where the red channel is the absolute value of a sin wave.
                    gl_FragColor = texture * wave; //Multiply the texture by the wave and apply to the shader. This effectively ends the shader.
                }
            `
        });
    }
}

class SkyOpacity extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
                precision mediump float;

                uniform float uTime;

                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;

                void main(){
                    vec4 texture = texture2D(uMainSampler, outTexCoord); //Create texture variable, containing colour and alpha values of the pixels

                    float green = abs(sin(uTime*2.0))/2.0+0.5; //Do some maths to make the green channel "pulse"
                    float alpha = abs(cos(uTime*0.8))/3.0-0.1; //Do some maths to make the alpha channel "pulse"

                    gl_FragColor = texture * vec4(0.0, green, 1.0, alpha); //Apply the vec4 to the shader. This effectively ends the shader.
                }
            `
        });
    }
}

class Warp extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
                precision mediump float;

                uniform float uTime;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;

                void main(){
                    vec2 pixelCoord = outTexCoord; //Create a vec2 containing the coordinates of the pixel

                    pixelCoord.y += sin((pixelCoord.x + (uTime* 10.0)) * 0.1); //Add a sin wave using the colour in the x pixel to the y pixel's colour

                    vec4 texture = texture2D(uMainSampler, pixelCoord); //Create texture variable, containing colour and alpha values of the view, using the pixelCoord

                    gl_FragColor = texture; //Apply the vec4 to the shader. This effectively ends the shader.
                }
            `
        });
    }
}


class Spotlight extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
                precision mediump float;

                uniform sampler2D uMainSampler;
                uniform float tx;
                uniform float ty;
                uniform float radius;
                uniform vec2 uResolution;

                varying vec2 outTexCoord;

                vec3 makeCircle(vec2 pixelPos, vec2 center){
                    float dist = distance(pixelPos, center); //Find the distance between the pixel and the player's center.

                    float circle = smoothstep(0., radius, dist); //I'm not quite sure how this actually makes a circle but it does! Feel free to look up smoothstep in more detail.

                    return vec3(1.-circle); //vec3(circle) makes a black circle around the player. vec3(1.-circle) makes a clear circle around the player and black everywhere else.
                }

                void main(){
                    vec2 pixelPos = gl_FragCoord.xy / uResolution; //Normalise the pixels.

                    vec4 texture = texture2D(uMainSampler, outTexCoord); //Create texture variable, containing colour and alpha values of the pixels

                    vec4 spotlight = texture * vec4(makeCircle(pixelPos, vec2(tx, ty)), 1.0); //Multiply the circle by the texture, creating a spotlight effect.

                    gl_FragColor = spotlight; //Apply the vec4 to the shader. This effectively ends the shader.
                }
            `
        });
    }
}


class UpsideDown extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
            precision mediump float;

            uniform sampler2D uMainSampler;
            uniform vec2 uResolution;
            uniform float uTime;

            varying vec2 outTexCoord;
            varying vec4 outTint;

            vec4 plasma()
            {
                vec2 pixelPos = gl_FragCoord.xy / uResolution; //Find the normalised position of the pixel
                float freq = 0.8;
                float value = //Add a bunch of different waves together
                    sin(uTime + pixelPos.x * freq) +
                    sin(uTime + pixelPos.y * freq) +
                    sin(uTime + (pixelPos.x + pixelPos.y) * freq) +
                    cos(uTime + sqrt(length(pixelPos - 0.7)) * freq * 2.0);

                return vec4( //Make a vector 4 from all these different wave values.
                    cos(value), //R
                    sin(value * 0.1), //G
                    sin(value * 3.0 * 2.0), //B
                    cos(value) //A
                );
            }

            void main()
            {
                vec4 texture = texture2D(uMainSampler, outTexCoord); //Create texture variable, containing colour and alpha values of the pixels
                gl_FragColor = texture * plasma(); //Multiply the texture by the result of plasma() and apply to the shader. This effectively ends the shader.
            }
        `
        });
    }
}


class Green extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
                precision mediump float;
                uniform float uTime;

                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;

                void main(){
                    vec4 texture = texture2D(uMainSampler, outTexCoord); //Create texture variable, containing colour and alpha values of the pixels
                    vec4 colour = vec4(0.0, 1.0, 0.0, 0.9);
                    vec4 wave = vec4(abs(sin(uTime)), 1.0, 0.9, 0.7);
                    gl_FragColor = texture*wave; //Apply the vec4 to the shader. This effectively ends the shader.
                }
            `
        });
    }
}

class TemplateShader extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game){
        super({
            game: game,
            renderer: game.renderer,

            fragShader: `
                precision mediump float;

                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;

                void main(){
                    vec4 texture = texture2D(uMainSampler, outTexCoord); //Create texture variable, containing colour and alpha values of the pixels

                    gl_FragColor = texture; //Apply the vec4 to the shader. This effectively ends the shader.
                }
            `
        });
    }
}


// https://thebookofshaders.com
// https://github.com/Jerenaux/shaders-phaser/blob/master/js/game.js

// Vect 2 (x, y)
// Vect 3 (r, g, b)
// Vect 4 (r, g, b, a) or colour = (r, g, b) and then Vect 4 (colour, a)
