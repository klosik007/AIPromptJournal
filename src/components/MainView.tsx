import TagButton from "./TagButton";
import PromptsInfo from "./PromptsInfo";
import { useState } from "react";

const prompts: string[] = Object.values(localStorage);

export default function MainView() {
  const [promptData, setPromptData] = useState(prompts);

  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">New prompt</a>
          </li>
          <li>
            <a href="">Tags</a>
          </li>
          <li>
            <a href="">Previous prompts</a>
          </li>
        </ul>
      </nav>
      <div className="container">
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
      </div>
    </>
  );
}
