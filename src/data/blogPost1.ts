import { BlogPost } from './blogPosts';

export const blogPost1: BlogPost = {
  id: '1',
  title: 'Critical Thinking Framework',
  excerpt: 'Explore the three essential layers of critical thinking—Elements of Reasoning, Intellectual Standards, and Intellectual Virtues—based on the framework by Richard Paul & Linda Elder.',
  date: '2024-01-15',
  readTime: '5 min read',
  category: 'Reasoning',
  slug: 'critical-thinking-framework',
  content: [
    { type: 'paragraph', text: 'Critical thinking is the art of analyzing and evaluating thinking with a view to improving it. Richard Paul & Linda Elder describe a framework for taking charge of the structures of thought and applying intellectual standards to them.' },
    { type: 'heading', text: 'The Three Layers of Critical Thinking' },
    { type: 'paragraph', text: 'Their framework distinguishes three essential layers:' },
    { type: 'heading', text: '1. Elements of Reasoning' },
    { type: 'paragraph', text: 'Purpose, question, information, concepts, assumptions, inferences, point of view, implications.' },
    { type: 'heading', text: '2. Intellectual Standards' },
    { type: 'paragraph', text: 'Clarity, accuracy, precision, relevance, depth, breadth, logic, significance, fairness.' },
    { type: 'heading', text: '3. Intellectual Virtues' },
    { type: 'paragraph', text: 'Humility, courage, empathy, integrity, perseverance, confidence in reason, autonomy.' },
    { type: 'paragraph', text: 'Source: louisville.edu' },
  ],
}; 