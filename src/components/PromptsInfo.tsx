import PromptContent from "./PromptContent";

export default function PromptsInfo() {
  const promptsContent = Object.keys(localStorage)

  return promptsContent.map((promptKey, index) => { 
    const promptJson = JSON.parse(localStorage.getItem(promptKey) ?? '')
    console.log(promptJson)

    return (
      <PromptContent
        key={index}
        title={promptJson.title}
        promptContent={promptJson.promptContent}
        effectiveness={promptJson.effectiveness}
        tags={promptJson.tags}
      />
    )
    });
}
