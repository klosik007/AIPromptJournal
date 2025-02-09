import TagButton from "./TagButton"
import PromptsInfo from "./PromptsInfo"
import { PromptObject } from "../types/Prompts"

const prompts: PromptObject[] = [
    {
        "title": "Extract everything from a book",
        "promptContent": "Extract core principles from [Book]. Create an action-focused summary with implementation steps. Design a 30-day practice plan for key concepts. Include a knowledge application score. Generate real-world test scenarios.",
        "effectiveness": 5,
        "tags": ["Documentation"]
    },
    {
        "title": "Understand complex topics easily",
        "promptContent": "Break [Difficult Topic] down into 5 core principles. Use real-world metaphors for each. Create mini-challenges to asses understanding. Create a 7-day mastery path with quick-win milestones. Include a 'clarity score' after each mini test.",
        "effectiveness": 5,
        "tags": ["Documentation"]
    },
    {
        "title": "Use storytelling to learn 10x faster",
        "promptContent": "Turn key concepts about [Topic/Skill] into engaging stories or narratives to improve memorization and comprehension.",
        "effectiveness": 5,
        "tags": ["Documentation"]
    },
    {
        "title": "Use Visualization",
        "promptContent": "Guide me through a visualization exercice to learn about [TOPIC/SKILL] and imagine myself successfully applying it in real-world situations.",
        "effectiveness": 5,
        "tags": ["Documentation"]
    }
]

export default function MainView() {
    return (
        <>
            <nav>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">New prompt</a></li>
                    <li><a href="">Tags</a></li>
                    <li><a href="">Previous prompts</a></li>
                </ul>
            </nav>
            <div className="container">
                <div className="tags">
                    <TagButton name="Debugging" />
                    <TagButton name="Code review" />
                    <TagButton name="Documentation" />
                </div>
                <div className="content">
                    <PromptsInfo promptsContent={prompts} />
                </div>
            </div>
        </>
    )
}
