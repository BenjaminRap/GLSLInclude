import { parse, generate } from '@shaderfrog/glsl-parser/index.js';
import { Program } from '@shaderfrog/glsl-parser/ast/ast-types.js'
import { ParserOptions } from '@shaderfrog/glsl-parser/parser/parser.js'

const	options : ParserOptions = {
	stage: 'fragment',
	quiet: false,
	includeLocation: true,
	failOnWarn: false,
	grammarSource: "shader.frag",
}

const	file : string = `#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    float y = pow(sin(v_uv.x * PI), 5.0);

    vec3 color = vec3(y);

    float pct = plot(v_uv,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}`;

const program : Program = parse(file, options);
// console.log(JSON.stringify(program, null, 2));
console.log(program);

const transpiled : string = generate(program);
console.log(transpiled);
