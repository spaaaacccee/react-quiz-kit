import { z } from "zod";

/**
 * BaseQuestion
 */
export const baseQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  // Base64-encoded image or URL
  image: z.string().optional(),
  explanation: z.string().optional(),
  incorrectMessage: z.string().optional(),
  timeLimit: z.number().optional(),
  points: z.number().optional(),
});

/**
 * MultipleChoiceQuestion
 */
export const multipleChoiceQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("multiple-choice"),
  options: z.array(z.string()),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
});

/**
 * TrueFalseQuestion
 */
export const trueFalseQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("true-false"),
  correctAnswer: z.union([z.literal("true"), z.literal("false")]),
});

/**
 * ShortAnswerQuestion
 */
export const shortAnswerQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("short-answer"),
  validationRegex: z.string().optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
});

/**
 * Question (discriminated union)
 */
export const questionSchema = z.discriminatedUnion("type", [
  multipleChoiceQuestionSchema,
  trueFalseQuestionSchema,
  shortAnswerQuestionSchema,
]);

/**
 * QuizData
 */
export const quizDataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(questionSchema),
  timeLimit: z.number().optional(),
});

/**
 * Inferred types (optional but recommended)
 */
export type QuizData = z.infer<typeof quizDataSchema>;
export type Question = z.infer<typeof questionSchema>;
