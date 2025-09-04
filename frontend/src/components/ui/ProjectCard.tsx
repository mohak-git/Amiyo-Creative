import { RoundedPolygon } from "@/components/elements/BgAssets";
import { Project } from "@/constants/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { FaArrowRight } from "react-icons/fa";

const ProjectCard: FC<{ project: Project; color: string }> = ({
    project,
    color,
}) => {
    return (
        <li className="w-full h-full">
            <div className="relative aspect-square max-h-72 mx-auto 3xl:max-h-120">
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

                {project.projectUrl && (
                    <Link
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-0.25 bottom-0 bg-foreground rounded-full p-2 cursor-target"
                    >
                        <FaArrowRight className="size-5 3xl:size-8 text-background" />
                    </Link>
                )}

                <ul className="absolute top-3 right-0 flex gap-2">
                    {project.technologies?.slice(0, 2).map((tag, index) => {
                        return (
                            <div
                                className="bg-white/30 px-2 py-1 rounded-lg text-[10px] backdrop-blur-3xl 3xl:text-xl"
                                key={index}
                            >
                                {tag}
                            </div>
                        );
                    })}
                </ul>
            </div>

            <h2 className="mt-2 3xl:text-3xl leading-relaxed">
                {project.title}
            </h2>
        </li>
    );
};

export default ProjectCard;
