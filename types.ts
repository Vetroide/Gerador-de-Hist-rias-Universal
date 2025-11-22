export interface Chapter {
  title: string;
  content: string;
}

export interface FullStory {
  title: string;
  hook: string;
  introduction: string;
  chapters: Chapter[];
  setting_description?: string; // Optional metadata about the chosen location
}

export enum AppState {
  IDLE = 'IDLE',
  ASKING_STYLE = 'ASKING_STYLE',
  GENERATING = 'GENERATING',
  READING = 'READING',
  ERROR = 'ERROR',
}

export interface StoryRequest {
  theme: string;
  style: string;
}
