import { PromptObject } from "../types/Prompts";

const prompts: PromptObject[] = [
  {
    title: "Extract everything from a book",
    promptContent:
      "Extract core principles from [Book]. Create an action-focused summary with implementation steps. Design a 30-day practice plan for key concepts. Include a knowledge application score. Generate real-world test scenarios.",
    effectiveness: 5,
    tags: ["Documentation"],
  },
  {
    title: "Understand complex topics easily",
    promptContent:
      "Break [Difficult Topic] down into 5 core principles. Use real-world metaphors for each. Create mini-challenges to asses understanding. Create a 7-day mastery path with quick-win milestones. Include a 'clarity score' after each mini test.",
    effectiveness: 5,
    tags: ["Documentation"],
  },
  {
    title: "Use storytelling to learn 10x faster",
    promptContent:
      "Turn key concepts about [Topic/Skill] into engaging stories or narratives to improve memorization and comprehension.",
    effectiveness: 3,
    tags: ["Documentation"],
  },
  {
    title: "Use Visualization",
    promptContent:
      "Guide me through a visualization exercice to learn about [TOPIC/SKILL] and imagine myself successfully applying it in real-world situations.",
    effectiveness: 5,
    tags: ["Documentation"],
  },
];

function LoadExamplePrompts() {
  let index = 0;

  for (const prompt of prompts) {
    const item = localStorage.getItem(`prompt_${index}`);

    if (!item) {
      localStorage.setItem(
        `prompt_${index}`,
        JSON.stringify({
          title: prompt.title,
          promptContent: prompt.promptContent,
          effectiveness: prompt.effectiveness,
          tags: prompt.tags,
        }),
      );
      index++;
    }
  }
}

export { LoadExamplePrompts };
