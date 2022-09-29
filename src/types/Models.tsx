export type TopicType = {
  id: number;
  title: string;
}

export type SubtopicType = {
  id: number;
  title: string;
  topic: number;
}

export type EventType = {
  id: number;
  image_link: string;
  problem_groups: ProblemGroupType[];
  role: 'owner' | 'mentor' | 'student';
  title: string;
}

type ProblemGroupType = any;

type AuthorType = any;

type AnswerType = "DescriptiveAnswer" | "ShortAnswer";
type ProblemType = "DescriptiveProblem" | "ShortAnswerProblem";
type GradeType =
  "ElementarySchoolFirstHalf" |
  "ElementarySchoolSecondHalf" |
  "HighSchoolFirstHalf" |
  "HighSchoolSecondHalf";
type DifficultyType =
  "VeryEasy" |
  "Easy" |
  "Medium" |
  "Hard" |
  "VeryHard";

type AnswerPropsType = {
  answer_type?: AnswerType;
  id?: number;
  text: string;
}

export type ProblemPropsType = {
  author?: AuthorType;
  copied_from?: number;
  is_checked?: boolean;
  is_private?: boolean;
  last_change_date?: string;
  publish_date?: string;
  source?: any;
  upvote_count?: number;
  id?: number;
  file?: File;

  answer: AnswerPropsType;
  problem_type: ProblemType;
  title: string;
  text: string;
  grade: GradeType;
  difficulty: DifficultyType;
  topics: number[],
  subtopics: number[];
}
