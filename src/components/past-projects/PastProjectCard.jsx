export default function PastProjectCard({ project, imageClassName = "" }) {
  return (
    <article className="shrink-0">
      <div className="overflow-hidden border border-black/10 p-2">
        <img
          src={`${project.image}&auto=format&fit=crop&w=900&q=80`}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`past-project-card__img w-full object-cover ${imageClassName}`}
        />
      </div>
      <p className="mt-4 text-center text-sm tracking-wide text-[#171717]/80">
        {project.title}
      </p>
    </article>
  );
}
