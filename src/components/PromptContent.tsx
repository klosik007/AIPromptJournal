import React from "react";
import { PromptObject } from "../types/Prompts";
import starFilled from "../assets/starFilled.svg";
import starEmpty from "../assets/starEmpty.svg";

type EffectivenessRatio = {
  effectivenessRate: number;
};

function Effectiveness({ effectivenessRate }: EffectivenessRatio) {
  const starCount: number = 5;

  return (
    <>
      {Array.from({ length: starCount }).map((_, index) => (
        <img
          key={index + 1}
          src={index + 1 > effectivenessRate ? starFilled : starEmpty}
          alt=""
        />
      ))}
    </>
  );
}

export default function PromptContent({
  title,
  promptContent,
  effectiveness,
  tags,
}: PromptObject) {
  return (
    <>
      <div className="box">
        <div className="box-content">
          <b>{title}</b>
          <p>{promptContent}</p>
          <span className="display-inline-flex">
            <b>Effectiveness</b>
            <Effectiveness effectivenessRate={effectiveness} />
          </span>
          <span className="display-inline-flex">
            <b>Tags:</b>
            <p>{tags?.join(", ")}</p>
          </span>
        </div>
      </div>
    </>
  );
}
