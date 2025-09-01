import { RoundedPolygon } from "@/components/elements/BgAssets";
import { Project } from "@/constants/types";
import Image from "next/image";
import { FC } from "react";
import { FaArrowRight } from "react-icons/fa";

const ProjectCard: FC<{ project: Project; color: string }> = ({
    project,
    color,
}) => {
    return (
        <li className="w-full h-full">
            <div className="relative aspect-square max-h-72">
                <Image
                    height={5000}
                    width={5000}
                    src={project.coverImage.url}
                    alt={`${project.slug}-cover-image`}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 w-[100.1%] h-full pointer-events-none">
                    <RoundedPolygon color={color} />
                </div>

                <div className="absolute right-0.25 bottom-0 bg-foreground rounded-full p-2 cursor-target">
                    <FaArrowRight className="size-5 text-background" />
                </div>

                <ul className="absolute top-3 right-0 flex gap-2">
                    {project.technologies?.slice(0, 2).map((tag, index) => {
                        return (
                            <div
                                className="bg-white/30 px-2 py-1 rounded-lg text-[10px] backdrop-blur-3xl"
                                key={index}
                            >
                                {tag}
                            </div>
                        );
                    })}
                </ul>
            </div>

            <h2 className="mt-2">{project.title}</h2>
        </li>
    );
};

export default ProjectCard;
