uniform vec4 color;
uniform sampler2D texture;

void main() {
	gl_FragColor = color;
	// gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
}
