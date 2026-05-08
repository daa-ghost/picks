import { useEffect, useRef } from "react";
import gsap from "gsap";

const vertexShaderSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_scrollSpeed;
uniform float u_mixFactor;

#define PI 3.14159265359

vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289v3(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y;
  vec2 center = vec2(u_mouse.x * (u_resolution.x / u_resolution.y), u_mouse.y);
  float dist = distance(uv, center);
  float radius = 0.4 + 0.1 * sin(u_time * 0.5) + u_scrollSpeed * 0.05;
  float angle = atan(uv.y - center.y, uv.x - center.x);
  float noise = snoise(vec2(cos(angle) * 2.0 + u_time * 0.2, sin(angle) * 2.0 + u_time * 0.3)) * 0.1;
  radius += noise;
  float blobFactor = 1.0 + 0.1 * sin(angle * 3.0 + u_time * 0.5);
  radius *= blobFactor;
  float smoothness = 0.05;
  float shape = smoothstep(radius + smoothness, radius - smoothness, dist);

  vec3 color1 = vec3(0.933, 0.259, 0.220); // brand red #EE4238
  vec3 color2 = vec3(0.800, 0.169, 0.133); // dark red
  vec3 color3 = vec3(0.976, 0.965, 0.941); // cream #F9F6F0

  float mix1 = smoothstep(0.0, 0.33, u_mixFactor);
  float mix2 = smoothstep(0.33, 0.66, u_mixFactor);
  float mix3 = smoothstep(0.66, 1.0, u_mixFactor);

  vec3 finalColor = mix(color1, color2, mix1);
  finalColor = mix(finalColor, color3, mix2);
  finalColor = mix(finalColor, color1 * 1.2, mix3);

  finalColor += vec3(0.1, 0.05, 0.0) * exp(-dist * 4.0) * u_mouse.y;
  finalColor += u_scrollSpeed * 0.2;

  gl_FragColor = vec4(finalColor * shape, shape);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef({
    uTime: 0,
    uMouseX: 0.5,
    uMouseY: 0.5,
    uScrollSpeed: 0,
    uMixFactor: 0,
    targetMixFactor: 0,
  });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;
    const program = createProgram(gl, vs, fs);
    if (!program) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uScrollSpeed = gl.getUniformLocation(program, "u_scrollSpeed");
    const uMixFactor = gl.getUniformLocation(program, "u_mixFactor");

    const startTime = Date.now();
    const uniforms = uniformsRef.current;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();

    const onMouseMove = (e: MouseEvent) => {
      uniforms.uMouseX = e.clientX / window.innerWidth;
      uniforms.uMouseY = 1.0 - e.clientY / window.innerHeight;
    };

    const onScroll = () => {
      uniforms.uScrollSpeed = window.scrollY * 0.001;
    };

    const onResize = () => resize();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const render = () => {
      uniforms.uTime = (Date.now() - startTime) * 0.001;

      const mixSpeed = 0.5 + Math.abs(uniforms.uScrollSpeed) * 2.0;
      if (uniforms.targetMixFactor === 0) {
        uniforms.uMixFactor = Math.max(0, uniforms.uMixFactor - 0.01 * mixSpeed);
      } else {
        uniforms.uMixFactor = Math.min(1, uniforms.uMixFactor + 0.01 * mixSpeed);
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uTime, uniforms.uTime);
      gl.uniform2f(uMouse, uniforms.uMouseX, uniforms.uMouseY);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uScrollSpeed, uniforms.uScrollSpeed);
      gl.uniform1f(uMixFactor, uniforms.uMixFactor);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-title-word", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.3,
      });
      gsap.from(".hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.5)",
        delay: 0.8,
      });
      gsap.from(".hero-cta", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 1.1,
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    const el = document.querySelector("#menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-cream"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.8,
        }}
      />
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 pointer-events-none"
      >
        <h1 className="text-brand-charcoal font-black uppercase leading-none tracking-tight mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
        >
          <span className="hero-title-word block">Taste</span>
          <span className="hero-title-word block">
            <span className="text-brand-red" style={{ textShadow: "4px 4px 0px #1A1A1A" }}>Morocco</span>
          </span>
          <span className="hero-title-word block">Like Never</span>
          <span className="hero-title-word block">Before</span>
        </h1>
        <p className="hero-subtitle text-brand-charcoal text-lg md:text-xl font-bold max-w-xl mx-auto mb-10">
          Authentic flavor, modern street food. Handcrafted with passion, served with pride.
        </p>
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
          <button
            onClick={scrollToMenu}
            className="btn-primary text-base px-10 py-4"
          >
            View Full Menu
          </button>
          <button
            onClick={scrollToMenu}
            className="btn-secondary text-base px-10 py-4"
          >
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
