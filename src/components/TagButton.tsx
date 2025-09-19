import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import close from "../assets/close.svg";

type TagButtonProps = {
  name: string;
  updateData: Dispatch<SetStateAction<string[]>>;
};

export default function TagButton({ name, updateData }: TagButtonProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const selectedTags = JSON.parse(localStorage.getItem("selectedTags") || "[]");
    setIsActive(selectedTags.includes(name));
  }, [name]);

  function applyFilter() {
    let selectedTags = JSON.parse(localStorage.getItem("selectedTags") || "[]");
    if (isActive) {
      selectedTags = selectedTags.filter((tag: string) => tag !== name);
    } else {
      selectedTags.push(name);
    }
    localStorage.setItem("selectedTags", JSON.stringify(selectedTags));
    setIsActive(!isActive);

    const dataFiltered = [...Object.values(window.localStorage)].filter((promptValue) => {
      try {
        const parsedValue = JSON.parse(promptValue ?? "{}");
        return parsedValue.tags?.some((tag: string) => selectedTags.includes(tag));
      } catch (error) {
        return false;
      }
    });

    updateData(dataFiltered);
  }

  return (
    <>
      <span id={name} className={isActive ? "display-inline-flex tag-button tag-button-active" : "display-inline-flex tag-button"} onClick={applyFilter}>
        <img src={close} alt="" />
        {name}
      </span>
    </>
  );
}
