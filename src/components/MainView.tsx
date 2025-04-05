import React from "react";
import TagButton from "./TagButton";
import PromptsInfo from "./PromptsInfo";
import promptSuggestion from "../assets/prompt_suggestion.svg";
import { useState } from "react";

const prompts: string[] = Object.values(localStorage);

export default function MainView() {
  const [promptData, setPromptData] = useState(prompts);

  return (
    <>
      <nav>
        <ul>
          <li className="display-inline-flex">
            <img src={promptSuggestion} alt="" /><a href="/">AI Prompt Journal</a>
          </li>
          <li>
            <a href="">New prompt</a>
          </li>
          <li>
            <a href="">Tags</a>
          </li>

        </ul>
      </nav>
      <div className="header">
        <img src={promptSuggestion} alt="" width="200" height="200" />
        <h1>AI Prompt Journal</h1>
        <p>Keep track of your AI prompts and their effectiveness.</p>
        <p>Use tags to filter and organize your prompts.</p>
      </div>
      <div className="tags">
        <TagButton
          name="Debugging"
          updateData={setPromptData}
        />
        <TagButton
          name="Code review"
          updateData={setPromptData}
        />
        <TagButton
          name="Documentation"
          updateData={setPromptData}
        />
      </div>
      <div className="content">
        <PromptsInfo data={promptData} />
      </div>
    </>
  );
}
