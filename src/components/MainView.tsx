import React from "react";
import TagButton from "./TagButton";
import PromptsInfo from "./PromptsInfo";
import promptSuggestion from "../assets/prompt_suggestion.svg";
import { useState } from "react";

const promptKeys = Object.keys(localStorage).filter(key => key.includes("prompt_"));
const prompts: string[] = Object.values(localStorage).filter((_, index) => promptKeys.includes(Object.keys(localStorage)[index]));

export default function MainView() {
  const [promptData, setPromptData] = useState(prompts);

  return (
    <>
      <nav>
        <ul>
          <li className="display-inline-flex">
            <img src={promptSuggestion} alt="" /><span className="tag-button">AI Prompt Journal</span>
          </li>
          <li className="display-inline-flex">
            <a href="#promptsModal" className="tag-button">Prompts</a>
          </li>
          <li className="display-inline-flex">
            <a href="#tagsModal" className="tag-button">Tags</a>
          </li>
        </ul>
      </nav>
      <div id="promptsModal" className="modal">
        <div className="modalContent">
          <a href="#" className="close">&times;</a>
          <h2>Modal Header</h2>
          <p>Prompts Modal</p>
        </div>
      </div>
      <div id="tagsModal" className="modal">
        <div className="modalContent">
          <a href="#" className="close">&times;</a>
          <h2>Modal Header</h2>
          <p>Tags Modal</p>
        </div>
      </div>
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
