export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  content: Array<
    | { type: 'paragraph' | 'heading' | 'quote'; text: string }
    | { type: 'image'; src: string; alt?: string }
    | { type: 'table'; headers: string[]; rows: string[][] }
  >;
}

import { PersonalGarage } from './2025-05-01-PersonalGarage.ts';
import { CriticalThinkingFramework} from './2025-06-01-CriticalThinking.ts';
import { Entelechy } from './2025-07-01-Entelechy.ts';

export const blogPosts: BlogPost[] = [
  PersonalGarage,
  Entelechy,
  CriticalThinkingFramework
];
