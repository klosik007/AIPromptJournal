import React from "react";
import TagButton from "./TagButton";
import PromptsInfo from "./PromptsInfo";
import promptSuggestion from "../assets/prompt_suggestion.svg";
import { useState, useEffect } from "react";
import { PromptsModal } from "./PromptsModal";
import { TagsModal } from "./TagsModal";

const promptKeys = Object.keys(localStorage).filter(key => key.includes("prompt_"));
const prompts: string[] = Object.values(localStorage).filter((_, index) => promptKeys.includes(Object.keys(localStorage)[index]));

export default function MainView() {
  const [promptData, setPromptData] = useState(prompts);
  const [tags, setTags] = useState<string[]>([]);

  const [promptsModalVisible, setPromptsModalVisible] = useState('none');
  const [tagsModalVisible, setTagsModalVisible] = useState('none');

  useEffect(() => {
    const storedTags = localStorage.getItem("tags");
    if (storedTags) {
      setTags(JSON.parse(storedTags));
    } else {
      const defaultTags = ["Debugging", "Code review", "Documentation"];
      localStorage.setItem("tags", JSON.stringify(defaultTags));
      setTags(defaultTags);
    }
  }, [tagsModalVisible]);

  useEffect(() => {
    const promptKeys = Object.keys(localStorage).filter(key => key.includes("prompt_"));
    const prompts: string[] = Object.values(localStorage).filter((_, index) => promptKeys.includes(Object.keys(localStorage)[index]));
    setPromptData(prompts);
  }, [promptsModalVisible]);

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
        {tags.map((tag, index) => (
          <TagButton
            key={index}
            name={tag}
            updateData={setPromptData}
          />
        ))}
      </div>
      <div className="content">
        <PromptsInfo data={promptData} />
      </div>
    </>
  );
}
