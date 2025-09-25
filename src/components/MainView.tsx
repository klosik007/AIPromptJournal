import React from "react";
import TagButton from "./TagButton";
import PromptsInfo from "./PromptsInfo";
import promptSuggestion from "../assets/prompt_suggestion.svg";
import { useState } from "react";
import { PromptsModal } from "./PromptsModal";
import { TagsModal } from "./TagsModal";

const promptKeys = Object.keys(localStorage).filter(key => key.includes("prompt_"));
const prompts: string[] = Object.values(localStorage).filter((_, index) => promptKeys.includes(Object.keys(localStorage)[index]));

export default function MainView() {
  const [promptData, setPromptData] = useState(prompts);

  const [promptsModalVisible, setPromptsModalVisible] = useState('none');
  const [tagsModalVisible, setTagsModalVisible] = useState('none');

  const showPromptsModal = () => {
    setPromptsModalVisible(promptsModalVisible === 'none' ? 'block' : 'none');
  }

  const showTagsModal = () => {
    setTagsModalVisible(tagsModalVisible === 'none' ? 'block' : 'none');
  }

  return (
    <>
      <nav>
        <ul>
          <li className="display-inline-flex">
            <img src={promptSuggestion} alt="" /><button className="tag-button">AI Prompt Journal</button>
          </li>
          <li className="display-inline-flex">
            <button id="promptsModalBtn" className="tag-button" onClick={showPromptsModal}>Prompts</button>
          </li>
          <li className="display-inline-flex">
            <button id="tagsModalBtn" className="tag-button" onClick={showTagsModal}>Tags</button>
          </li>
        </ul>
      </nav>
      <PromptsModal modalVisibility={promptsModalVisible} setModalVisibilityOnClose={setPromptsModalVisible} />
      <TagsModal modalVisibility={tagsModalVisible} setModalVisibilityOnClose={setTagsModalVisible} />
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
