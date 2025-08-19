"use client";
import { hexToRgb } from "@/constants/constants";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, useState } from "react";

interface LightRayProps {
    raysColor?: string;
    raysSpeed?: number;
    lightSpread?: number;
    rayLength?: number;
    noiseAmount?: number;
    distortion?: number;
    fadeDistance?: number;
    className?: string;
}
type UniformValue = number | number[];
type Uniforms = { [key: string]: { value: UniformValue } };

const rotateVec2 = (
    x: number,
    y: number,
    angleRad: number
): [number, number] => {
    const cosA = Math.cos(angleRad);
    const sinA = Math.sin(angleRad);
    return [x * cosA - y * sinA, x * sinA + y * cosA];
};

const getAnchorAndDir = (
    w: number,
    h: number,
    angleDeg: number
): { anchor: [number, number]; dir: [number, number] } => {
    const anchor: [number, number] = [0.25 * w, -0.07 * h];
    const baseDir: [number, number] = [0, 1];
    const dir = rotateVec2(baseDir[0], baseDir[1], (angleDeg * Math.PI) / 180);
    return { anchor, dir };
};

const LightRay: React.FC<LightRayProps> = ({
    raysColor = "#f0ff0f",
    raysSpeed = 0.5,
    lightSpread = 0.2,
    rayLength = 1.2,
    noiseAmount = 0.1,
    distortion = 0.01,
    fadeDistance = 1.0,
    className = "custom-rays",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const cleanupFunctionRef = useRef<(() => void) | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const uniformsRef = useRef<Uniforms | null>(null);
    const meshRef = useRef<Mesh | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observerRef.current.observe(containerRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        if (cleanupFunctionRef.current) {
            cleanupFunctionRef.current();
            cleanupFunctionRef.current = null;
        }

        const initializeWebGL = async () => {
            if (!containerRef.current) return;

            await new Promise((resolve) => setTimeout(resolve, 10));

            if (!containerRef.current) return;

            const renderer = new Renderer({
                dpr: Math.min(window.devicePixelRatio, 2),
                alpha: true,
            });
            rendererRef.current = renderer;

            const gl = renderer.gl;
            gl.canvas.style.width = "100%";
            gl.canvas.style.height = "100%";

            while (containerRef.current.firstChild)
                containerRef.current.removeChild(
                    containerRef.current.firstChild
                );

            containerRef.current.appendChild(gl.canvas);

            const vert = `
                attribute vec2 position;
                varying vec2 vUv;
                void main() {
                    vUv = position * 0.5 + 0.5;
                    gl_Position = vec4(position, 0.0, 1.0);
                }
            `;

            const frag = `
                precision highp float;

                uniform float iTime;
                uniform vec2  iResolution;

                uniform vec2 rayPos;
                uniform vec2 rayDir;
                uniform vec3 raysColor;
                uniform float raysSpeed;
                uniform float lightSpread;
                uniform float rayLength;
                uniform float fadeDistance;
                uniform float noiseAmount;
                uniform float distortion;

                varying vec2 vUv;

                float noise(vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
                }

                float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
                    vec2 sourceToCoord = coord - raySource;
                    vec2 dirNorm = normalize(sourceToCoord);
                    float cosAngle = dot(dirNorm, rayRefDirection);

                    float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

                    float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

                    float distance = length(sourceToCoord);
                    float maxDistance = iResolution.x * rayLength;
                    float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

                    float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);

                    float baseStrength = clamp(
                        (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
                        (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
                        0.0, 1.0
                    );

                    // No flicker
                    // float baseStrength = clamp(
                    //     (0.45 + 0.15 * sin(distortedAngle * seedA)) +
                    //     (0.3 + 0.2 * cos(-distortedAngle * seedB)),
                    //     0.0, 1.0
                    // );

                    return baseStrength * lengthFalloff * fadeFalloff * spreadFactor;
                }

                void mainImage(out vec4 fragColor, in vec2 fragCoord) {
                    vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

                    vec2 finalRayDir = rayDir;

                    vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
                    vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

                    fragColor = rays1 * 0.8 + rays2 * 0.8;

                    if (noiseAmount > 0.0) {
                        float n = noise(coord * 0.01 + iTime * 0.1);
                        fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
                    }

                    float brightness = 1.0 - (coord.y / iResolution.y);
                    fragColor.x *= 0.1 + brightness * 0.8;
                    fragColor.y *= 0.3 + brightness * 0.6;
                    fragColor.z *= 0.5 + brightness * 0.5;

                    fragColor.rgb *= raysColor;
                }

                void main() {
                    vec4 color;
                    mainImage(color, gl_FragCoord.xy);
                    gl_FragColor  = color;
                }
            `;

            const uniforms = {
                iTime: { value: 0 },
                iResolution: { value: [1, 1] },
                rayPos: { value: [0, 0] },
                rayDir: { value: [0, 1] },
                raysColor: { value: hexToRgb(raysColor) },
                raysSpeed: { value: raysSpeed },
                lightSpread: { value: lightSpread },
                rayLength: { value: rayLength },
                fadeDistance: { value: fadeDistance },
                noiseAmount: { value: noiseAmount },
                distortion: { value: distortion },
            };
            uniformsRef.current = uniforms;

            const geometry = new Triangle(gl);
            const program = new Program(gl, {
                vertex: vert,
                fragment: frag,
                uniforms,
            });

            const mesh = new Mesh(gl, { geometry, program });
            meshRef.current = mesh;

            const updatePlacement = () => {
                if (!containerRef.current || !renderer) return;

                const { clientWidth: wCSS, clientHeight: hCSS } =
                    containerRef.current;
                renderer.setSize(wCSS, hCSS);

                const dpr = renderer.dpr;
                const w = wCSS * dpr;
                const h = hCSS * dpr;

                uniforms.iResolution.value = [w, h];

                const { anchor, dir } = getAnchorAndDir(w, h, -28);
                uniforms.rayPos.value = anchor;
                uniforms.rayDir.value = dir;
            };

            const loop = (t: number) => {
                if (
                    !rendererRef.current ||
                    !uniformsRef.current ||
                    !meshRef.current
                )
                    return;

                uniforms.iTime.value = t * 0.001;

                try {
                    renderer.render({ scene: mesh });
                    animationIdRef.current = requestAnimationFrame(loop);
                } catch (error) {
                    console.warn("WebGL rendering error:", error);
                    return;
                }
            };

            window.addEventListener("resize", updatePlacement);
            updatePlacement();
            animationIdRef.current = requestAnimationFrame(loop);

            cleanupFunctionRef.current = () => {
                if (animationIdRef.current) {
                    cancelAnimationFrame(animationIdRef.current);
                    animationIdRef.current = null;
                }

                window.removeEventListener("resize", updatePlacement);

                if (renderer) {
                    try {
                        const canvas = renderer.gl.canvas;
                        const loseContextExt =
                            renderer.gl.getExtension("WEBGL_lose_context");
                        if (loseContextExt) loseContextExt.loseContext();

                        if (canvas && canvas.parentNode)
                            canvas.parentNode.removeChild(canvas);
                    } catch (error) {
                        console.warn("Error during WebGL cleanup:", error);
                    }
                }

                rendererRef.current = null;
                uniformsRef.current = null;
                meshRef.current = null;
            };
        };

        initializeWebGL();

        return () => {
            if (cleanupFunctionRef.current) {
                cleanupFunctionRef.current();
                cleanupFunctionRef.current = null;
            }
        };
    }, [
        isVisible,
        raysColor,
        raysSpeed,
        lightSpread,
        rayLength,
        fadeDistance,
        noiseAmount,
        distortion,
    ]);

    useEffect(() => {
        if (
            !uniformsRef.current ||
            !containerRef.current ||
            !rendererRef.current
        )
            return;

        const u = uniformsRef.current;
        const renderer = rendererRef.current;

        u.raysColor.value = hexToRgb(raysColor);
        u.raysSpeed.value = raysSpeed;
        u.lightSpread.value = lightSpread;
        u.rayLength.value = rayLength;
        u.fadeDistance.value = fadeDistance;
        u.noiseAmount.value = noiseAmount;
        u.distortion.value = distortion;

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        const dpr = renderer.dpr;
        const { anchor, dir } = getAnchorAndDir(wCSS * dpr, hCSS * dpr, -28);
        u.rayPos.value = anchor;
        u.rayDir.value = dir;
    }, [
        raysColor,
        raysSpeed,
        lightSpread,
        rayLength,
        fadeDistance,
        noiseAmount,
        distortion,
    ]);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full pointer-events-none overflow-hidden relative ${className}`.trim()}
        />
    );
};

export default LightRay;
