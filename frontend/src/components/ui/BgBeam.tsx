import React, { useEffect, useRef, useState } from "react";

interface Beam {
    id: number;
    x: number;
    startTime: number;
    duration: number;
}

interface Particle {
    id: number;
    angle: number;
    speed: number;
}

interface Explosion {
    id: number;
    particles: Particle[];
    x: number;
    startTime: number;
}

interface BgBeamProps {
    beamHeight?: number;
    beamWidth?: number;
    beamSpawnInterval?: number;
    beamDurationRange?: [number, number];
    particleCount?: number;
    particleSpeedRange?: [number, number];
    explosionLifetime?: number;
}

const BgBeam: React.FC<BgBeamProps> = ({
    beamHeight = 48,
    beamWidth = 1,
    beamSpawnInterval = 800,
    beamDurationRange = [2000, 4000],
    particleCount = 15,
    particleSpeedRange = [40, 100],
    explosionLifetime = 1000,
}) => {
    const [beams, setBeams] = useState<Beam[]>([]);
    const [explosions, setExplosions] = useState<Explosion[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

    const createBeam = (): Beam => ({
        id: Math.random(),
        x: randomInRange(5, 95),
        startTime: Date.now(),
        duration: randomInRange(...beamDurationRange),
    });

    const createExplosion = (x: number): Explosion => {
        const particles: Particle[] = Array.from(
            { length: particleCount },
            (_, i) => ({
                id: Math.random(),
                angle: (i * (360 / particleCount) * Math.PI) / 180,
                speed: randomInRange(...particleSpeedRange),
            })
        );
        return {
            id: Math.random(),
            particles,
            x,
            startTime: Date.now(),
        };
    };

    useEffect(() => {
        const interval = setInterval(
            () => setBeams((prev) => [...prev, createBeam()]),
            beamSpawnInterval
        );

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const checkCollisions = () => {
            if (!containerRef.current) return;

            const containerHeight = containerRef.current.offsetHeight;
            const groundLevel = containerHeight - 20;
            const currentTime = Date.now();

            setBeams((prevBeams) => {
                const activeBeams: Beam[] = [];

                prevBeams.forEach((beam) => {
                    const elapsed = currentTime - beam.startTime;
                    const progress = elapsed / beam.duration;
                    const currentY = progress * containerHeight;

                    if (currentY >= groundLevel)
                        setExplosions((prev) => [
                            ...prev,
                            createExplosion(beam.x),
                        ]);
                    else activeBeams.push(beam);
                });

                return activeBeams;
            });

            setExplosions((prevExplosions) =>
                prevExplosions.filter(
                    (explosion) =>
                        currentTime - explosion.startTime < explosionLifetime
                )
            );
        };

        const interval = setInterval(checkCollisions, 16);
        return () => clearInterval(interval);
    }, []);

    const getCurrentBeamPosition = (beam: Beam): number => {
        const elapsed = Date.now() - beam.startTime;
        const progress = Math.min(elapsed / beam.duration, 1);
        return progress * 100;
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-transparent overflow-hidden rounded-lg"
        >
            {beams.map((beam) => (
                <div
                    key={beam.id}
                    className="absolute bg-gradient-to-b from-transparent via-cyan-500 to-transparent shadow-lg"
                    style={{
                        left: `${beam.x}%`,
                        top: `${getCurrentBeamPosition(beam)}%`,
                        width: `${beamWidth}px`,
                        height: `${beamHeight}px`,
                        boxShadow: "0 0 10px rgba(34, 211, 238, 0.6)",
                        transition: "none",
                    }}
                />
            ))}

            {explosions.map((explosion) => {
                const age = Date.now() - explosion.startTime;
                const opacity = Math.max(0, 1 - age / explosionLifetime);

                return (
                    <div
                        key={explosion.id}
                        className="absolute"
                        style={{
                            left: `${explosion.x}%`,
                            bottom: "0px",
                            transform: "translateX(-50%)",
                        }}
                    >
                        <div
                            className="absolute w-2 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"
                            style={{
                                opacity,
                                transform: "translateX(-50%) translateY(-50%)",
                            }}
                        />

                        {explosion.particles.map((particle) => {
                            const distance = (age / 1000) * particle.speed;
                            const dx = Math.cos(particle.angle) * distance;
                            const dy = Math.sin(particle.angle) * distance;

                            return (
                                <div
                                    key={particle.id}
                                    className="absolute rounded-full"
                                    style={{
                                        width: "2px",
                                        height: "2px",
                                        transform: `translate(${dx}px, ${dy}px)`,
                                        opacity,
                                        backgroundColor:
                                            "rgba(34, 211, 238, 1)",
                                        boxShadow:
                                            "0 0 4px rgba(34, 211, 238, 0.8)",
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default BgBeam;
