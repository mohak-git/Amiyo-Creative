import BgBeam from "@/components/ui/BgBeam";
import LightRay from "@/components/ui/LightRay";

export default function Home() {
    return (
        <>
            {/* Hero */}
            <div className="px-4 sm:px-10 h-[87vh] w-full">
                <div className="relative h-[80vh] w-full flex justify-center items-center text-5xl border border-background rounded-b-4xl overflow-hidden shadow-[5px_2px_8px_0px_rgba(0,0,0,0.5)]">
                    {/* Elements */}
                    <div className="w-full z-3 h-full absolute top-0">
                        <LightRay raysColor="#6262e3" />
                    </div>
                    <div className="absolute z-2 h-full w-full rounded-lg">
                        <BgBeam />
                    </div>

                    {/* Backgrounds */}
                    <div className="absolute z-1 h-full w-full bg-radial-[at_50%_95%] from-white via-purple-700 to-slate-900 via-30% to-67%"></div>
                    <div className="absolute z-1 bottom-0 right-0 w-1/3 h-1/6 bg-gradient-to-r to-purple-700/70 blur-3xl"></div>
                    <div className="absolute z-1 bottom-0 right-0 w-1/12 h-2/5 bg-gradient-to-r to-purple-700/70 blur-3xl"></div>

                    {/* Text */}
                    <div className="h-full w-full flex flex-col justify-center items-center text-base text-white z-5 gap-6">
                        <div className="text-cyan-200 font-semibold text-xs tracking-wide bg-purple-600/20 rounded-full px-2 py-0.5">
                            Where Innovation Meets Perfection
                        </div>

                        <h1 className="text-4xl md:text-6xl text-center w-full max-w-3xl font-bold text-cyan-200 font-serif leading-tight">
                            Craft{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-700 to-purple-600 bg-clip-text text-transparent">
                                Digital <br />
                                Experiences
                            </span>{" "}
                            That Matter
                        </h1>

                        <p className="text-xl md:text-lg text-center text-white max-w-2xl mx-auto leading-6">
                            Transform your ideas into stunning digital
                            realities. We build premium web experiences that
                            captivate users and drive results for
                            forward-thinking businesses.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                            <button className="cursor-target cursor-none px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-full hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                                Start Your Project
                            </button>
                            <button className="cursor-target cursor-none px-8 py-4 bg-white/90 text-purple-600 font-semibold rounded-full hover:bg-white transform hover:scale-105 transition-all duration-200">
                                View Our Work
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-screen w-full flex justify-center items-center text-5xl font-bold gap-4">
                Hi
            </div>
        </>
    );
}
