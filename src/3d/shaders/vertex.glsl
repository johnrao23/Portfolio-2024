uniform float uSize;
attribute float aScale;

varying vec3 vColor;
uniform float uTime;

attribute vec3 aRandomness;
attribute vec3 color; // Ensure you have this if you're using vColor

// Declare the additional multiplier as a uniform
uniform float additionalMultiplier;

void main() {
    /**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Rotate
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness
    modelPosition.xyz += aRandomness;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /**
     * Size - Updated to use additionalMultiplier
     */
    gl_PointSize = uSize * aScale * additionalMultiplier * (50.0 / -viewPosition.z);

    /**
     * Color
     */
    vColor = color;
}
