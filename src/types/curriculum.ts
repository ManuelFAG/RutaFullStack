export type ExerciseLevel = 'facil' | 'medio' | 'reto';

export interface Exercise {
  id: string;
  title: string;
  level: ExerciseLevel;
  instruction: string;
  starterCode: string;
  hints: string[];
  solutionCode: string;
  solutionExplanation: string;
  testCheck?: {
    type: 'output-contains' | 'code-contains' | 'regex' | 'function-returns';
    expected: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CodeSnippet {
  language: 'javascript' | 'html' | 'css' | 'bash' | 'json';
  code: string;
  description: string;
}

export interface ExplanationSection {
  heading: string;
  content: string;
  callout?: {
    type: 'tip' | 'warning' | 'info';
    text: string;
  };
  codeSnippet?: CodeSnippet;
}

export interface RealWorldAnalogy {
  title: string;
  analogy: string;
  whyItMatters: string;
  iconName?: string;
}

export interface InteractivePlayground {
  language: 'javascript' | 'html' | 'bash';
  initialCode: string;
  explanation: string;
  mode: 'code' | 'terminal';
}

export interface LessonSummary {
  keyTakeaways: string[];
  commonPitfalls: string[];
}

export interface Lesson {
  id: string;
  moduleId: number;
  slug: string;
  title: string;
  order: number;
  estimatedTime: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  objective: string;
  realWorldAnalogy: RealWorldAnalogy;
  explanation: {
    sections: ExplanationSection[];
  };
  interactivePlayground: InteractivePlayground;
  exercises: Exercise[];
  quiz: QuizQuestion[];
  summary: LessonSummary;
  xpReward: number;
}

export interface ModuleBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface Module {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  badge: ModuleBadge;
  lessons: Lesson[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  analogy: string;
  technicalDefinition: string;
  codeExample?: string;
  relatedLessonId?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'doc' | 'cheatsheet' | 'tool' | 'book';
  description: string;
  url: string;
  tag: string;
  recommendedFor: string;
}

export interface LevelTestQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  moduleTarget: number;
  difficultyWeight: number;
}
