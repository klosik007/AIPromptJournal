import PromptContent from "./PromptContent"
import { Prompts } from "../types/Prompts"

export default function PromptsInfo({promptsContent}: Prompts) {
    return promptsContent.map((prompt, index) => 
        <PromptContent
            key={index}
            title={prompt.title}
            promptContent={prompt.promptContent}
            effectiveness={prompt.effectiveness}
            tags={prompt.tags} 
        />
    )
}