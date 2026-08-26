import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import Section from './Section';
import LoopingVideo from './LoopingVideo';
import { projects } from '../content/projects';

/** Placeholder hrefs ("#") are treated as "not published yet" and hidden. */
const isLive = (url?: string): url is string => Boolean(url) && url !== '#';

const Projects: React.FC = () => (
  <Section
    id="projects"
    index="03"
    label="work"
    lead="Selected projects that demonstrate the intersection of thoughtful design and technical excellence."
  >
    <ol className="mt-10 space-y-10 sm:space-y-14">
      {projects.map((project, index) => (
        <li
          key={project.title}
          className={`group grid items-center gap-6 md:gap-10 ${
            project.video || project.image ? 'md:grid-cols-2' : ''
          }`}
          data-reveal
        >
          {/* A project with no media simply runs full width. */}
          {(project.video || project.image) && (
            <div
              className={`overflow-hidden border border-rule bg-surface ${
                index % 2 === 1 ? 'md:order-2' : ''
              }`}
            >
              <div className="aspect-video">
                {project.video ? (
                  <LoopingVideo
                    src={project.video}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial hover:scale-[1.03]"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          )}

          <div>
            <p className="eyebrow mb-2">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="text-[0.969431rem] leading-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.090608rem]">
              {project.title}
            </h3>
            <p className="mt-2 max-w-measure text-muted">{project.description}</p>

            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {project.tags.map((tag) => (
                <li key={tag} className="eyebrow text-muted">
                  {tag}
                </li>
              ))}
            </ul>

            {(isLive(project.liveUrl) || isLive(project.githubUrl)) && (
              <div className="mt-4 flex flex-wrap items-center gap-6">
                {isLive(project.liveUrl) && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent inline-flex items-center gap-1.5 text-[0.646287rem]"
                  >
                    Live demo
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </a>
                )}
                {isLive(project.githubUrl) && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent inline-flex items-center gap-1.5 text-[0.646287rem]"
                  >
                    <Github size={13} strokeWidth={1.5} />
                    Code
                  </a>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>

    <p className="mt-8" data-reveal>
      <Link
        to="/projects"
        className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-ink"
      >
        <span className="eyebrow">all projects</span>
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
        />
      </Link>
    </p>
  </Section>
);

export default Projects;
