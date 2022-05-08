export interface FeedbackCreateDTO {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create(data: FeedbackCreateDTO): Promise<void>
}