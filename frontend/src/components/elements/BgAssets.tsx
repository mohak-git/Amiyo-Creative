export const BgWave = ({ inverted }: { inverted: boolean }) => {
    return (
        <div
            className={`pointer-events-none absolute inset-0 -z-20 ${
                inverted ? "rotate-180" : "rotate-y-180"
            } blur-lg`}
        >
            <svg
                className="absolute inset-x-0 -top-40 w-full opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="url(#grad1)"
                    fillOpacity="1"
                    d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,261.3C672,256,768,224,864,192C960,160,1056,128,1152,133.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
                <defs>
                    <linearGradient
                        id="grad1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#a855f7"
                            stopOpacity="0.5"
                        />
                        <stop
                            offset="50%"
                            stopColor="#d946ef"
                            stopOpacity="0.5"
                        />
                        <stop
                            offset="100%"
                            stopColor="#6366f1"
                            stopOpacity="0.5"
                        />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
