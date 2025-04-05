import React from "react";
import PromptContent from "./PromptContent";

type PromptsData = {
  data: string[];
};

export default function PromptsInfo({ data }: PromptsData) {
  return (
    <>
      {data.map((promptData, index) => {
        const promptJson = JSON.parse(promptData ?? "");

        return (
          <PromptContent
            key={index}
            title={promptJson.title}
            promptContent={promptJson.promptContent}
            effectiveness={promptJson.effectiveness}
            tags={promptJson.tags}
          />
        );
      })}
    </>
  );
}
