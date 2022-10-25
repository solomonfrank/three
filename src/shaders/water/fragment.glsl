
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main()
{
    float mixStrength =  (uColorOffset + vElevation ) * uColorMultiplier;
    vec3 ColorMix = mix(uDepthColor, uSurfaceColor, mixStrength);
    gl_FragColor = vec4(ColorMix, 1.0);
}