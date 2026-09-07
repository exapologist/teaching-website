/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  num: string;
  title: string;
  desc: string;
  body: string;
  tag: string;
  categoryTags: string[];
  notebook: string;
}

export interface ReadingGroup {
  index: string;
  title: string;
  desc: string;
  format: string;
  notebook?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  questions: QuizQuestion[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
