import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoopingVideo from '../components/LoopingVideo';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useReveal from '../hooks/useReveal';
import { projects } from '../content/projects';

/** Placeholder hrefs ("#") are treated as "not published yet" and hidden. */
const isLive = (url?: string): url is string => Boolean(url) && url !== '#';

const ProjectsPage: React.FC = () => {
  useReveal();
  useDocumentTitle(
    'Projects — Raila',
    'Selected projects that demonstrate the intersection of thoughtful design and technical excellence.',
  );

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <div className="mx-auto max-w-page px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
          <p className="eyebrow">index</p>
          <h1 className="mt-5 text-title text-ink">Projects</h1>
          <p className="mt-6 max-w-[38rem] text-[1.141663rem] leading-[1.55] text-muted">
            Selected projects that demonstrate the intersection of thoughtful design and
            technical excellence.
          </p>
        </div>

        <div className="mx-auto max-w-page px-6 pb-24 sm:px-10">
          <ol className="space-y-16 border-t border-rule pt-16 sm:space-y-24 sm:pt-24">
            {projects.map((project, index) => (
              <li
                key={project.title}
                className={`grid items-center gap-8 md:gap-12 ${
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
                  <p className="eyebrow mb-3">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="text-[1.369995rem] leading-tight text-ink sm:text-[1.541244rem]">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-measure text-muted">{project.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="eyebrow text-muted">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {(isLive(project.liveUrl) || isLive(project.githubUrl)) && (
                    <div className="mt-6 flex flex-wrap items-center gap-6">
                      {isLive(project.liveUrl) && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link inline-flex items-center gap-1.5 text-[0.91333rem]"
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
                          className="link inline-flex items-center gap-1.5 text-[0.91333rem]"
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

          <p className="mt-16">
            <Link
              to="/#projects"
              className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-accent"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-editorial group-hover:-translate-x-1"
              />
              <span className="eyebrow">back to portfolio</span>
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
