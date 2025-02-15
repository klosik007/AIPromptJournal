import TagButton from "./TagButton";
import PromptsInfo from "./PromptsInfo";

export default function MainView() {
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
          <TagButton name="Debugging" />
          <TagButton name="Code review" />
          <TagButton name="Documentation" />
        </div>
        <div className="content">
          <PromptsInfo />
        </div>
      </div>
    </>
  );
}
