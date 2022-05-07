import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "../feedback-widget-types";

import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { FormEvent, useState } from "react";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested(): void;
  onFeedbackSent(): void;
}

export function FeedbackContentStep({ 
  feedbackType, 
  onFeedbackRestartRequested, 
  onFeedbackSent 
}: FeedbackContentStepProps) {
  const [comment, setComment] = useState<string>("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    console.log({
      comment,
      screenshot
    })

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="h-4 w-4"/>
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img 
            src={feedbackTypeInfo.image.source} 
            alt={feedbackTypeInfo.image.source} 
            className="h-6 w-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-2 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton 
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={comment.length === 0}
          >
            Button
          </button>
        </footer>
      </form>
    </>
  )
}