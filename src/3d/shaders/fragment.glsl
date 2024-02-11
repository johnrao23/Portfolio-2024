varying vec3 vColor;

vec4 mySRGBTransferOETF(vec4 linearColor) {
    return vec4(mix(pow(linearColor.rgb * 0.9478672986 + 0.0521327014, vec3(2.4)) * 1.055 - 0.055, linearColor.rgb * 12.92, step(linearColor.rgb, vec3(0.0031308))), linearColor.a);
}

void main() {
    // Light point calculation
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    // Final color in linear space before applying sRGB conversion
    vec3 colorLinear = mix(vec3(0.0), vColor, strength);
    vec4 colorOutputLinear = vec4(colorLinear, 1.0);

    // Apply sRGB encoding to the linear color before output
    gl_FragColor = mySRGBTransferOETF(colorOutputLinear);
}
