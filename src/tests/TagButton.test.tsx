import { render, screen } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom';
import App from '../App';
import { PromptObject } from "../types/Prompts";
import localStorageMock from "../tests/mocks/localStorageMock";

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

describe('TagButton', () => {
  test('filtering prompts', () => {    
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    // Mock localStorage with sample data
    prompts.forEach((prompt, index) => {
      window.localStorage.setItem(`prompt_${index}`, JSON.stringify(prompt));
    });

    // Render the App component
    render(<App />);
    
    // Check if the tag buttons are present
    const tagButton1 = screen.getByText(/Debugging/i);
    const tagButton2 = screen.getByText(/Code review/i);
    const tagButton3 = screen.getByText(/Documentation/i);

    expect(tagButton1).toBeInTheDocument();
    expect(tagButton2).toBeInTheDocument();
    expect(tagButton3).toBeInTheDocument();

    // Simulate a click on the "Debugging" tag button
    tagButton1.click();

    // Check if the prompts are filtered correctly
    const filteredPrompts = screen.queryAllByText(/Tags:/i);
    expect(filteredPrompts.length).toBe(0);
  });
}); 