precision mediump float;

uniform vec3 insideColor;
uniform vec3 outsideColor;

varying vec3 vColor;

void main() {
    // Use the passed color from the vertex shader as a basis for the gradient
    gl_FragColor = vec4(vColor, 1.0);
}