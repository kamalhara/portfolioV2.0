import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/data/project";

const interfaceProjects = ["stateglyph", "productify", "spotus"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter(Boolean);

export default function InterfacesSection() {
  return (
    <section
      className="mt-15.5 scroll-mt-8 max-[700px]:mt-14.75"
      id="interfaces"
      aria-labelledby="interfaces-heading"
    >
      <h2
        className="mb-6.25 text-[15.7px] leading-[1.6] font-medium tracking-[-0.025em]"
        id="interfaces-heading"
      >
        Selected interfaces
      </h2>
      <div className="grid grid-cols-3 gap-4 max-[700px]:gap-2.5 max-[480px]:grid-cols-1 max-[480px]:gap-3">
        {interfaceProjects.map((project) => (
          <Link
            className="group block min-w-0 overflow-hidden rounded-[15px] border border-border bg-card p-1.5 pb-2 transition-colors hover:border-border-strong hover:bg-muted"
            href={`/project/${project.slug}`}
            key={project.slug}
          >
            <span className="relative block h-38.25 overflow-hidden rounded-[10px] bg-[#131313] max-[700px]:h-27.5 max-[480px]:h-42.5">
              <Image
                src={project.cover ?? `/${project.screenshot[0]}`}
                alt={`${project.title} interface preview`}
                fill
                sizes="(max-width: 600px) 90vw, 260px"
                className="object-cover object-top-left grayscale transition duration-300 group-hover:scale-[1.025] group-hover:grayscale-0"
              />
            </span>
            <span className="block px-1.25 pt-2 text-[13px]">
              {project.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
