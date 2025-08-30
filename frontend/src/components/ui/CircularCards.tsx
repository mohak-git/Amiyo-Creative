import { GalleryItem } from "@/constants/types";
import {
    Camera,
    Mesh,
    Plane,
    Program,
    Renderer,
    Texture,
    Transform,
} from "ogl";
import { useEffect, useRef, useState } from "react";

type GL = Renderer["gl"];

function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
) {
    let timeout: number;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => func.apply(this, args), wait);
    };
}

function lerp(p1: number, p2: number, t: number): number {
    return p1 + (p2 - p1) * t;
}

interface ScreenSize {
    width: number;
    height: number;
}

interface Viewport {
    width: number;
    height: number;
}

interface MediaProps {
    geometry: Plane;
    gl: GL;
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: ScreenSize;
    viewport: Viewport;
    bend: number;
    textColor: string;
    borderRadius?: number;
    font?: string;
    heading: string;
    subheading: string;
}

class Media {
    extra: number = 0;
    geometry: Plane;
    gl: GL;
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: ScreenSize;
    viewport: Viewport;
    bend: number;
    textColor: string;
    borderRadius: number;
    font?: string;
    program!: Program;
    plane!: Mesh;
    scale!: number;
    padding!: number;
    width!: number;
    widthTotal!: number;
    x!: number;
    speed: number = 0;
    isBefore: boolean = false;
    isAfter: boolean = false;
    heading: string;
    subheading: string;

    constructor({
        geometry,
        gl,
        image,
        index,
        length,
        renderer,
        scene,
        screen,
        viewport,
        bend,
        textColor,
        borderRadius = 0,
        font,
        heading,
        subheading,
    }: MediaProps) {
        this.geometry = geometry;
        this.gl = gl;
        this.image = image;
        this.index = index;
        this.length = length;
        this.renderer = renderer;
        this.scene = scene;
        this.screen = screen;
        this.heading = heading;
        this.subheading = subheading;
        this.viewport = viewport;
        this.bend = bend;
        this.textColor = textColor;
        this.borderRadius = borderRadius;
        this.font = font;
        this.createShader();
        this.createMesh();
        this.onResize();
    }

    createShader() {
        const texture = new Texture(this.gl, {
            generateMipmaps: true,
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            vertex: `
                    precision highp float;
                    attribute vec3 position;
                    attribute vec2 uv;
                    uniform mat4 modelViewMatrix;
                    uniform mat4 projectionMatrix;
                    uniform float uTime;
                    uniform float uSpeed;
                    varying vec2 vUv;
                    void main() {
                    vUv = uv;
                    vec3 p = position;
                    p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
                    }
                `,
            fragment: `
                    precision highp float;
                    uniform vec2 uImageSizes;
                    uniform vec2 uPlaneSizes;
                    uniform sampler2D tMap;
                    uniform float uBorderRadius;
                    varying vec2 vUv;
                    
                    float roundedBoxSDF(vec2 p, vec2 b, float r) {
                    vec2 d = abs(p) - b;
                    return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
                    }
                    
                    void main() {
                    vec2 ratio = vec2(
                        min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
                        min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
                    );
                    vec2 uv = vec2(
                        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
                        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
                    );
                    vec4 color = texture2D(tMap, uv);
                    
                    float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
                    
                    // Smooth antialiasing for edges
                    float edgeSmooth = 0.002;
                    float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
                    
                    gl_FragColor = vec4(color.rgb, alpha);
                    }
                `,
            uniforms: {
                tMap: { value: texture },
                uPlaneSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
                uSpeed: { value: 0 },
                uTime: { value: 100 * Math.random() },
                uBorderRadius: { value: this.borderRadius },
            },
            transparent: true,
        });

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = this.image;
        img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // // Main title
            // ctx.font =
            //     `bold 80px ${this.font?.split(" ")[2]}` ||
            //     "bold 80px monospace";
            // ctx.fillStyle = this.textColor || "white";
            // ctx.textAlign = "center";
            // ctx.textBaseline = "bottom";
            // ctx.fillText(this.heading, canvas.width / 2, canvas.height - 100);

            // // Subtitle
            // ctx.font =
            //     `bold 40px ${this.font?.split(" ")[2]}` ||
            //     "bold 40px monospace";
            // ctx.fillStyle = "rgba(255,255,255,0.8)";
            // ctx.textAlign = "center";
            // ctx.textBaseline = "bottom";
            // ctx.fillText(this.subheading, canvas.width / 2, canvas.height - 40);

            texture.image = canvas;
            this.program.uniforms.uImageSizes.value = [
                canvas.width,
                canvas.height,
            ];
        };
    }

    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program,
        });
        this.plane.setParent(this.scene);
    }

    update(
        scroll: { current: number; last: number },
        direction: "right" | "left"
    ) {
        this.plane.position.x = this.x - scroll.current - this.extra;

        const x = this.plane.position.x;
        const H = this.viewport.width / 2;

        if (this.bend === 0) {
            this.plane.position.y = 0;
            this.plane.rotation.z = 0;
        } else {
            const normalizedBend = this.bend * (this.viewport.width / 50);
            const B_abs = Math.abs(normalizedBend);
            const R = (H * H + B_abs * B_abs) / (2 * B_abs);

            const effectiveX = Math.min(Math.abs(x), H);

            const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
            if (this.bend > 0) {
                this.plane.position.y = -arc;
                this.plane.rotation.z =
                    -Math.sign(x) * Math.asin(effectiveX / R);
            } else {
                this.plane.position.y = arc;
                this.plane.rotation.z =
                    Math.sign(x) * Math.asin(effectiveX / R);
            }
        }

        this.speed = scroll.current - scroll.last;
        this.program.uniforms.uTime.value += 0.04;
        this.program.uniforms.uSpeed.value = this.speed;

        const planeOffset = this.plane.scale.x / 2;
        const viewportOffset = this.viewport.width / 2;
        this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
        this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
        if (direction === "right" && this.isBefore) {
            this.extra -= this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
        if (direction === "left" && this.isAfter) {
            this.extra += this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
    }

    onResize({
        screen,
        viewport,
    }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
        if (screen) this.screen = screen;
        if (viewport) {
            this.viewport = viewport;
            if (this.plane.program.uniforms.uViewportSizes) {
                this.plane.program.uniforms.uViewportSizes.value = [
                    this.viewport.width,
                    this.viewport.height,
                ];
            }
        }
        this.scale = this.screen.height / 1500;

        // 60% on mobile, 30% on desktop
        const cardWidthRatio = this.screen.width < 768 ? 0.6 : 0.3;
        this.plane.scale.x = this.viewport.width * cardWidthRatio;

        // maintain aspect ratio
        this.plane.scale.y = this.plane.scale.x * 0.75;

        this.plane.program.uniforms.uPlaneSizes.value = [
            this.plane.scale.x,
            this.plane.scale.y,
        ];
        this.padding = 2;
        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    }

    getScreenPosition(camera: Camera, screen: ScreenSize) {
        const wm = this.plane.worldMatrix;
        const pos = {
            x: wm[12],
            y: wm[13],
            z: wm[14],
        };

        const mvp = camera.projectionViewMatrix;
        const x = pos.x * mvp[0] + pos.y * mvp[4] + pos.z * mvp[8] + mvp[12];
        const y = pos.x * mvp[1] + pos.y * mvp[5] + pos.z * mvp[9] + mvp[13];
        const w = pos.x * mvp[3] + pos.y * mvp[7] + pos.z * mvp[11] + mvp[15];

        const ndcX = x / w;
        const ndcY = y / w;

        return {
            x: (ndcX * 0.5 + 0.5) * screen.width,
            y: (1 - (ndcY * 0.5 + 0.5)) * screen.height,
        };
    }
}

interface AppConfig {
    items?: GalleryItem[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
}

class App {
    container: HTMLElement;
    scrollSpeed: number;
    scroll: {
        ease: number;
        current: number;
        target: number;
        last: number;
        position?: number;
    };
    onCheckDebounce: (...args: unknown[]) => void;
    renderer!: Renderer;
    gl!: GL;
    camera!: Camera;
    scene!: Transform;
    planeGeometry!: Plane;
    medias: Media[] = [];
    mediasImages: GalleryItem[] = [];
    screen!: { width: number; height: number };
    viewport!: { width: number; height: number };
    raf: number = 0;

    boundOnResize!: () => void;
    boundOnWheel!: (e: Event) => void;
    boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchUp!: () => void;

    isDown: boolean = false;
    start: number = 0;

    constructor(
        container: HTMLElement,
        {
            items,
            bend = 1,
            textColor = "#ffffff",
            borderRadius = 0,
            font = "bold 30px Figtree",
            scrollSpeed = 2,
            scrollEase = 0.05,
        }: AppConfig
    ) {
        document.documentElement.classList.remove("no-js");
        this.container = container;
        this.scrollSpeed = scrollSpeed;
        this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
        this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMedias(items, bend, textColor, borderRadius, font);
        this.update();
        this.addEventListeners();
    }

    createRenderer() {
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2),
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(
            this.renderer.gl.canvas as HTMLCanvasElement
        );
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    }

    createScene() {
        this.scene = new Transform();
    }

    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100,
        });
    }

    createMedias(
        items: GalleryItem[] | undefined,
        bend: number = 1,
        textColor: string,
        borderRadius: number,
        font: string
    ) {
        const defaultItems = [
            {
                image: `https://picsum.photos/seed/1/800/600`,
                heading: "Bridge",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/2/800/600`,
                heading: "Desk Setup",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/3/800/600`,
                heading: "Waterfall",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/4/800/600`,
                heading: "Strawberries",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/5/800/600`,
                subheading: "Subheading",
                heading: "Deep Diving",
            },
            {
                image: `https://picsum.photos/seed/16/800/600`,
                heading: "Train Track",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/17/800/600`,
                heading: "Santorini",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/8/800/600`,
                heading: "Blurry Lights",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/9/800/600`,
                heading: "New York",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/10/800/600`,
                heading: "Good Boy",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/21/800/600`,
                heading: "Coastline",
                subheading: "Subheading",
            },
            {
                image: `https://picsum.photos/seed/12/800/600`,
                heading: "Palm Trees",
                subheading: "Subheading",
            },
        ];

        const galleryItems = items && items.length ? items : defaultItems;
        this.mediasImages = galleryItems.concat(galleryItems);

        this.medias = this.mediasImages.map((data, index) => {
            return new Media({
                geometry: this.planeGeometry,
                gl: this.gl,
                image: data.image,
                index,
                length: this.mediasImages.length,
                renderer: this.renderer,
                scene: this.scene,
                screen: this.screen,
                heading: data.heading,
                subheading: data.subheading,
                viewport: this.viewport,
                bend,
                textColor,
                borderRadius,
                font,
            });
        });
    }

    getOverlayData() {
        return this.medias.map((media) => ({
            heading: media.heading,
            subheading: media.subheading,
            position: media.getScreenPosition(this.camera, this.screen),
        }));
    }

    onTouchDown(e: MouseEvent | TouchEvent) {
        this.isDown = true;
        this.scroll.position = this.scroll.current;
        this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
    }

    onTouchMove(e: MouseEvent | TouchEvent) {
        if (!this.isDown) return;
        const x = "touches" in e ? e.touches[0].clientX : e.clientX;
        const distance = (this.start - x) * (this.scrollSpeed * 0.025);
        this.scroll.target = (this.scroll.position ?? 0) + distance;
    }

    onTouchUp() {
        this.isDown = false;
        this.onCheck();
    }

    onWheel(e: Event) {
        const wheelEvent = e as WheelEvent;
        const delta =
            wheelEvent.deltaY ||
            (wheelEvent as WheelEvent & { wheelData?: number }).wheelData ||
            (wheelEvent as WheelEvent & { detail?: number }).detail ||
            0;

        this.scroll.target +=
            (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
        this.onCheckDebounce();
    }

    onCheck() {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].width;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }

    onResize() {
        this.screen = {
            width: this.container.clientWidth,
            height: this.container.clientHeight,
        };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({
            aspect: this.screen.width / this.screen.height,
        });
        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };
        if (this.medias) {
            this.medias.forEach((media) =>
                media.onResize({ screen: this.screen, viewport: this.viewport })
            );
        }
    }

    update() {
        this.scroll.current = lerp(
            this.scroll.current,
            this.scroll.target,
            this.scroll.ease
        );
        const direction =
            this.scroll.current > this.scroll.last ? "right" : "left";
        if (this.medias) {
            this.medias.forEach((media) =>
                media.update(this.scroll, direction)
            );
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update.bind(this));
    }

    addEventListeners() {
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnTouchDown = this.onTouchDown.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchUp = this.onTouchUp.bind(this);
        window.addEventListener("resize", this.boundOnResize);
        window.addEventListener("mousewheel", this.boundOnWheel);
        window.addEventListener("wheel", this.boundOnWheel);
        window.addEventListener("mousedown", this.boundOnTouchDown);
        window.addEventListener("mousemove", this.boundOnTouchMove);
        window.addEventListener("mouseup", this.boundOnTouchUp);
        window.addEventListener("touchstart", this.boundOnTouchDown);
        window.addEventListener("touchmove", this.boundOnTouchMove);
        window.addEventListener("touchend", this.boundOnTouchUp);
    }

    destroy() {
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener("resize", this.boundOnResize);
        window.removeEventListener("mousewheel", this.boundOnWheel);
        window.removeEventListener("wheel", this.boundOnWheel);
        window.removeEventListener("mousedown", this.boundOnTouchDown);
        window.removeEventListener("mousemove", this.boundOnTouchMove);
        window.removeEventListener("mouseup", this.boundOnTouchUp);
        window.removeEventListener("touchstart", this.boundOnTouchDown);
        window.removeEventListener("touchmove", this.boundOnTouchMove);
        window.removeEventListener("touchend", this.boundOnTouchUp);
        if (
            this.renderer &&
            this.renderer.gl &&
            this.renderer.gl.canvas.parentNode
        ) {
            this.renderer.gl.canvas.parentNode.removeChild(
                this.renderer.gl.canvas as HTMLCanvasElement
            );
        }
    }
}

interface OverlayItem {
    heading: string;
    subheading: string;
    position: { x: number; y: number };
}

interface CircularGalleryProps {
    items?: GalleryItem[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
}

export default function CircularGallery({
    items,
    bend = 3,
    textColor = "#ffffff",
    borderRadius = 0.05,
    scrollEase = 0.003,
    font = "bold 30px Figtree",
    scrollSpeed = 2,
}: CircularGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [overlayData, setOverlayData] = useState<OverlayItem[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const app = new App(containerRef.current, {
            items,
            bend,
            textColor,
            borderRadius,
            font,
            scrollSpeed,
            scrollEase,
        });

        let frame: number;
        const loop = () => {
            setOverlayData(app.getOverlayData());
            frame = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(frame);
            app.destroy();
        };
    }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0" ref={containerRef} />

            {overlayData.map((item, i) => (
                <div
                    key={i}
                    className="absolute text-center pointer-events-none"
                    style={{
                        transform: `translate(-50%, -50%) translate(${item.position.x}px, ${item.position.y}px)`,
                        color: textColor,
                    }}
                >
                    <h2 className="text-xl font-bold">{item.heading}</h2>
                    <p className="text-sm opacity-70">{item.subheading}</p>
                </div>
            ))}
        </div>
    );
}
