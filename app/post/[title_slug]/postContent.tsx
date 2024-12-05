"use client";

import React, { useEffect } from "react";

const PostContent = ({ content }: { content: string }) => {
  // Handle copy event
  const handleCopy = (event: ClipboardEvent) => {
    // Prevent the default copy behavior
    event.preventDefault();

    const customText =
      "For more details on this content, visit the Race Auto India website.";
    if (event.clipboardData) {
      event.clipboardData.setData("text", customText);
    }
  };

  useEffect(() => {
    // Add event listener for the 'copy' event on the window
    document.addEventListener("copy", handleCopy);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      style={{ userSelect: "text" }} // Allow text selection
    ></div>
  );
};

export default PostContent;
