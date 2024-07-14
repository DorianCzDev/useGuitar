"use client";
import { useState } from "react";

function TextExpander({
  children,
  collapsedNumWords = 100,
  collapseButtonText = "Show More",
  expandedButtonText = "Show Less",
  expanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const childrenArr = children.split(" ");

  if (childrenArr.length <= collapsedNumWords) return <>{children}</>;

  function childrenCollapse() {
    let wordsArr = [];
    for (let i = 0; i < collapsedNumWords; i++) {
      wordsArr.push(` ${childrenArr[i]}`);
    }
    wordsArr[wordsArr.length - 1] += "...";

    return wordsArr;
  }

  return (
    <>
      {isExpanded ? children : childrenCollapse()}
      <p
        className="border-t border-primary-700 w-fit outline-none cursor-pointer text-secondary-500 transition-all my-4 py-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? expandedButtonText : collapseButtonText}
      </p>
    </>
  );
}

export default TextExpander;
