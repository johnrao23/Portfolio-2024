attribute vec3 position;
attribute vec3 color;
attribute float aScale;
attribute vec3 aRandomness;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uSize;

varying vec3 vColor;

void main() {
    vColor = color;
    
    // Apply randomness to position
    vec3 pos = position + aRandomness;
    
    // Scale the points
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    mvPosition.xyz += position * aScale;

    gl_PointSize = uSize * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}