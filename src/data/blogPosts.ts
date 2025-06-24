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
  >;
}

import { blogPost1 } from './blogPost1.ts';
import { blogPost2 } from './blogPost2.ts';

export const blogPosts: BlogPost[] = [
  blogPost1,
  blogPost2,
];