import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import Section from './Section';
import LoopingVideo from './LoopingVideo';

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  video?: string;
}

const projects: Project[] = [
  {
    title: 'Attention-Gated-Networks',
    description: 'Exploring attention mechanisms in neural networks for computer vision tasks.',
    tags: ['PyTorch', 'Computer Vision', 'Attention Models'],
    image:
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    video: '/neuralnet.mp4',
  },
  {
    title: 'Immersive Negotiator',
    description: 'A virtual reality experience for negotiation training, using AI-powered avatars.',
    tags: ['Unity', 'AI', 'Natural Language Processing'],
    image:
      'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=800',
    video: '/negotiator.mp4',
  },
  {
    title: 'Generative UI',
    description: 'An intelligent tutoring system that generates UI while teaching.',
    tags: ['React', 'AI', 'Educational Technology'],
    image:
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
    video: '/generative-ui.mp4',
  },
];

/** Placeholder hrefs ("#") are treated as "not published yet" and hidden. */
const isLive = (url?: string): url is string => Boolean(url) && url !== '#';

const Projects: React.FC = () => (
  <Section
    id="projects"
    index="03"
    label="work"
    lead="Selected projects that demonstrate the intersection of thoughtful design and technical excellence."
  >
    <ol className="mt-14 space-y-16 sm:space-y-24">
      {projects.map((project, index) => (
        <li
          key={project.title}
          className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
          data-reveal
        >
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

          <div>
            <p className="eyebrow mb-3">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="text-[1.6rem] leading-tight text-ink sm:text-[1.85rem]">
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
                    className="link inline-flex items-center gap-1.5 text-[0.95rem]"
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
                    className="link inline-flex items-center gap-1.5 text-[0.95rem]"
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
  </Section>
);

export default Projects;
