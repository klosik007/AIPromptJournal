import TagButton from "./TagButton";
import PromptsInfo from "./PromptsInfo";
import { useState } from "react";

const prompts: string[] = Object.values(localStorage)

export default function MainView() {
  const [promptData, setPromptData] = useState(prompts)

  function applyFilter(name: string) {

    const dataFiltered = [...Object.values(localStorage)].filter((promptValue) => JSON.parse(promptValue ?? []).tags.includes(name))

    setPromptData(dataFiltered)
  }

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
          <TagButton name="Debugging" onClick={ (name) => () => applyFilter(name) } />
          <TagButton name="Code review" onClick={ (name) => () => applyFilter(name) } />
          <TagButton name="Documentation" onClick={ (name) => () => applyFilter(name) } />
        </div>
        <div className="content">
          <PromptsInfo data={promptData}/>
        </div>
      </div>
    </>
  );
}
