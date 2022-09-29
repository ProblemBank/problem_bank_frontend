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

export type ProblemGroupType = any;