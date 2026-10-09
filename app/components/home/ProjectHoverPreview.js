import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function IPhoneFrame({ children }) {
  return (
    <div className="relative h-129.5 w-62 rounded-[44px] bg-linear-to-b from-gray-700 via-gray-500 to-gray-700 p-0.5 overflow-hidden">
      <div className="absolute top-4 flex w-full items-center justify-center gap-4 px-8">
        <div className="flex h-6 w-20 items-center justify-end rounded-full bg-black">
          <div className="mr-1 h-4 w-4 rounded-full bg-linear-to-b from-gray-800 via-slate-600 to-gray-800"></div>
        </div>
      </div>
      <div className="h-full w-full rounded-[42px] border-[6px] border-black bg-white overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function ProjectHoverPreview({ project, src }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 left-117 z-10 hidden scale-[0.97] opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100 motion-reduce:scale-100 min-[800px]:block">
      <div className="ml-3 flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
        <div
          className="relative min-h-0 flex-1 px-2.5 pt-2.5"
          aria-hidden="true"
        >
          {project.slug === "spotus" ? (
            <div className="relative h-full w-full">
              <div className="absolute top-1/2 left-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2 scale-[0.32]">
                <IPhoneFrame>
                  <Image
                    src={src}
                    alt=""
                    width={1206}
                    height={2622}
                    sizes="248px"
                    className="h-full w-full object-cover object-top"
                  />
                </IPhoneFrame>
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full overflow-hidden rounded-t-md bg-muted">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 850px) 250px, 300px"
                className={
                  project.cover ? "object-cover object-left" : "object-contain"
                }
              />
            </div>
          )}
        </div>
        {project.code && (
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code (opens in a new tab)`}
            className="flex shrink-0 items-center justify-between gap-2 border-t border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            <span>View source code</span>
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
