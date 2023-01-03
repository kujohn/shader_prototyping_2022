#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;
uniform vec3        u_light;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

varying vec4        v_position;
varying vec3        v_normal;

#if defined(MODEL_VERTEX_TEXCOORD)
varying vec2        v_texcoord;
#endif

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    float dist = distance(st, vec2(0.5));

    #if defined(BACKGROUND)
    color.rgb += step(.1, fract( (st.x - st.y) * 40.0 + u_time * -2.0));
    color.rgb += step(.1, fract( (st.x + st.y) * 40.0 + u_time * -2.0));

    #else

    // Diffuse shading from directional light
    // vec3 n = normalize(v_normal);
    // vec3 l = normalize(u_light - v_position.xyz);
    // color.rgb += dot(l, n) * 0.5 + 0.5;
    color.rgb += step(.05, fract( (st.x + st.y) * 40.0 + u_time * 2.0));
    #endif

    gl_FragColor = color;
}

