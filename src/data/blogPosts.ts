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

import { CriticalThinkingFramework} from './2025-06-01-CriticalThinking.ts';
import { PersonalGarage } from './2025-05-01-PersonalGarage.ts';

export const blogPosts: BlogPost[] = [
  PersonalGarage,
  CriticalThinkingFramework,
];