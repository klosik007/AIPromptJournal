import React from "react";
import { Dispatch, SetStateAction } from "react";
import close from "../assets/close.svg";

type TagButtonProps = {
  name: string;
  updateData: Dispatch<SetStateAction<string[]>>;
};

export default function TagButton({ name, updateData }: TagButtonProps) {
  function applyFilter() {
    const dataFiltered = [...Object.values(window.localStorage)].filter((promptValue) => {
      try {
        const parsedValue = JSON.parse(promptValue ?? "{}");
        return parsedValue.tags?.includes(name);
      } catch (error) {
        console.error("Invalid JSON in localStorage:", promptValue, error);
        return false;
      }
    });
  
    updateData(dataFiltered);
  }

  return (
    <>
      <span id={name} className="display-inline-flex tag-button" onClick={applyFilter}>
        <img src={close} alt="" />
        {name}
      </span>
    </>
  );
}
