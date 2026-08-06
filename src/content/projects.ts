export interface Project {
  title: string;
  description: string;
  /** Rendered as small tracked-out labels under the description. */
  tags: string[];
  /**
   * Omit — or leave as "#" — while a project has nothing public to link to.
   * The link is hidden rather than rendered dead.
   */
  liveUrl?: string;
  githubUrl?: string;
  /** Looping clip, served from /public. Takes precedence over `image`. */
  video?: string;
  /** Still image, used when there is no `video`. */
  image?: string;
}

/**
 * Featured work, in the order it appears on the home page.
 *
 * Adding an entry here is all it takes to publish a project — the section
 * lays itself out and alternates the video/text sides automatically.
 */
export const projects: Project[] = [
  {
    title: 'Attention-Gated-Networks',
    description: 'Exploring attention mechanisms in neural networks for computer vision tasks.',
    tags: ['PyTorch', 'Computer Vision', 'Attention Models'],
    video: '/neuralnet.mp4',
    image:
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Immersive Negotiator',
    description: 'A virtual reality experience for negotiation training, using AI-powered avatars.',
    tags: ['Unity', 'AI', 'Natural Language Processing'],
    video: '/negotiator.mp4',
    image:
      'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Generative UI',
    description: 'An intelligent tutoring system that generates UI while teaching.',
    tags: ['React', 'AI', 'Educational Technology'],
    video: '/generative-ui.mp4',
    image:
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];
