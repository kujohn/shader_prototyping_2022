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

#ifdef MODEL_VERTEX_COLOR
varying vec4        v_color;
#endif

#if defined(MODEL_VERTEX_TEXCOORD)
varying vec2        v_texcoord;
#endif

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec3 n = normalize(v_normal);
    vec3 l = normalize(u_light - v_position.xyz);

    #ifdef MODEL_VERTEX_COLOR
    color = v_color;
    #endif

    #ifdef MODEL_NAME_TOP 
    // color.rgb += dot(n, l) * 0.2 + 0.1;
    #endif

    #ifdef MODEL_NAME_BOTTOM 
    #endif

    // Diffuse shading from directional light
    color.rgb *= dot(n, l) * 0.9 + 0.5;
    color.rgb -= step(0.1, fract((st.x + st.y) * 50.0 + n));
    color.rgb -= step(0.1, fract((st.y - st.x) * 50.0 + n));

    gl_FragColor = color;
}

