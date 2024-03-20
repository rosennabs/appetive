import { useState } from "react";

export default function useShareLink() {
  const [shareLink, setShareLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false); // State to track whether link has been copied successfully

  async function generateShareLink(recipeId) {
    const shareableLink = `https://appetive.ca/recipes/${recipeId}`;
    setShareLink(shareableLink);
    console.log("link: ", shareableLink);

    // Check if the Web Share API is supported by the browser
    if (typeof navigator !== "undefined") {
      if (navigator.share) {
        // Call the share method with the shareable link
        await navigator
          .share({ url: shareableLink })
          .then(() => {
            console.log("Shared successfully");
          })
          .catch((error) => {
            console.error("Error sharing:", error);
          });
      } else {
        console.log("Web Share API not supported");
        // Fallback: Copy the link to the clipboard
        try {
          navigator.clipboard.writeText(shareableLink);
          console.log("Link copied to clipboard");
          setCopySuccess(true);

        } catch (error) {
          console.error("Error copying link to clipboard:", error);
          setCopySuccess(false);
        }
      }
    } else {
      console.warn("Navigator object is not available.");
    }
  }
  return { shareLink, generateShareLink, copySuccess, setCopySuccess };
}
