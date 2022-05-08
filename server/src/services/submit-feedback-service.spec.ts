import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(submitFeedbackService.execute({
      type: "BUG",
      comment: "example comment",
      screenshot: "data:image/png;base64.4d65a4d5s4d5as4ds56age"
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(submitFeedbackService.execute({
      type: "",
      comment: "example comment",
      screenshot: "data:image/png;base64.4d65a4d5s4d5as4ds56age"
    })).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(submitFeedbackService.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64.4d65a4d5s4d5as4ds56age"
    })).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(submitFeedbackService.execute({
      type: "BUG",
      comment: "example comment",
      screenshot: "image/png"
    })).rejects.toThrow();
  });
})