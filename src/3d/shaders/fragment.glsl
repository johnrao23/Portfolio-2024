varying vec3 vColor;

// Function to convert sRGB to Linear
vec3 sRGBToLinear(vec3 color) {
    return pow(color, vec3(2.2));
}

void main() {
    // Convert vColor from sRGB to Linear space for correct lighting calculations
    vec3 linearColor = sRGBToLinear(vColor);

    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    // Mix the linearColor with some value in linear space
    vec3 finalColor = mix(vec3(0.0), linearColor, strength);

    // Since Three.js automatically converts linear to sRGB space if configured,
    // we output the color in linear space
    gl_FragColor = vec4(finalColor, 1.0);
}
