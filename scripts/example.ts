import { BlogPost } from './blogPosts';

export const CriticalThinkingFramework: BlogPost = {
  id: '1',
  title: 'Critical Thinking Framework',
  excerpt: 'Explore the three essential layers of critical thinking—Elements of Reasoning, Intellectual Standards, and Intellectual Virtues—based on the framework...',
  date: '2024-01-15',
  readTime: '1 min read',
  category: 'Reasoning',
  slug: 'critical-thinking-framework',
  content: [
    { type: 'paragraph', text: 'Explore the three essential layers of critical thinking—Elements of Reasoning, Intellectual Standards, and Intellectual Virtues—based on the framework by Richard Paul & Linda Elder.' },
    { type: 'paragraph', text: 'Critical thinking is the art of analyzing and evaluating thinking with a view to improving it. Richard Paul & Linda Elder describe a framework for taking charge of the structures of thought and applying intellectual standards to them.' },
    { type: 'heading', text: 'The Three Layers of Critical Thinking' },
    { type: 'paragraph', text: 'Their framework distinguishes three essential layers:' },
    { type: 'heading', text: '1. Elements of Reasoning' },
    { type: 'paragraph', text: 'Every act of reasoning contains these eight moving parts. Mapping them makes hidden weaknesses visible. Purpose, question, information, concepts, assumptions, inferences, point of view, implications.' },
    { type: 'table', headers: ['Element', 'Guiding Question'], rows: [['Purpose', 'Why am I doing this thinking?'], ['Question / Problem', 'What precise question am I answering?'], ['Information / Data', 'What facts, observations, or experiences am I using?'], ['Interpretations & Inferences', 'What conclusions am I drawing from that information?'], ['Concepts & Theories', 'What ideas, definitions, or principles organize my thinking?'], ['Assumptions', 'What am I taking for granted?'], ['Implications & Consequences', 'If I’m right, what follows?'], ['Point of View', 'From which perspective am I looking? What others exist?']] },
    { type: 'heading', text: '2. Intellectual Standards' },
    { type: 'paragraph', text: 'Once the elements are on the table, you interrogate each with nine standards: Clarity, accuracy, precision, relevance, depth, breadth, logic, significance, fairness.' },
    { type: 'table', headers: ['Standard', 'Guiding Question'], rows: [['Clarity', 'Could I state this more plainly?'], ['Accuracy', 'Is it true and verifiable?'], ['Precision', 'Can I be more exact or specific?'], ['Relevance', 'Does it bear directly on the issue?'], ['Depth', 'Have I dealt with the complexities?'], ['Breadth', 'Have I considered other viewpoints?'], ['Logic', 'Do the ideas fit together coherently?'], ['Significance', 'Which points matter most?'], ['Fairness', 'Am I free of bias and vested interest?']] },
    { type: 'heading', text: '3. Intellectual Virtues' },
    { type: 'paragraph', text: 'Repeated use of the standards etches habits of mind: Humility, courage, empathy, integrity, perseverance, confidence in reason, autonomy.' },
    { type: 'table', headers: ['Trait', 'Observable Behavior'], rows: [['Humility', '“I might be wrong—let’s check.”'], ['Courage', 'Willingness to question cherished beliefs.'], ['Empathy', 'Serious effort to enter other viewpoints.'], ['Integrity', 'Apply the same standards to yourself that you apply to others.'], ['Perseverance', 'Sustained effort despite difficulty or frustration.'], ['Confidence in Reason', 'Trust that sound logic and evidence lead toward truth.'], ['Autonomy', 'Thinking independently while respecting evidence.']] },
    { type: 'paragraph', text: 'Source: louisville.edu' }
  ],
};