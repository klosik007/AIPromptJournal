import { Dispatch, SetStateAction } from "react";
import close from "../assets/close.svg";

type TagButtonProps = {
  name: string;
  updateData: Dispatch<SetStateAction<string[]>>;
};

export default function TagButton({ name, updateData }: TagButtonProps) {
  function applyFilter() {
    const dataFiltered = [...Object.values(localStorage)].filter(
      (promptValue) => JSON.parse(promptValue ?? []).tags.includes(name),
    );

    updateData(dataFiltered);
  }

  return (
    <>
      <span className="display-inline-flex tag-button" onClick={applyFilter}>
        <img src={close} />
        {name}
      </span>
    </>
  );
}
