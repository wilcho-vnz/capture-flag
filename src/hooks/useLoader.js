import { useState } from "react";

const link = [];

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flagURL, setFlagURL] = useState(null);
  const [flag, setFlag] = useState(null);

  const iterateCodeTags = (tag) => {
    const divs = tag.querySelectorAll("div");

    divs.forEach((div) => {
      const span = div.querySelector("span");

      span.childNodes.forEach((element) => {
        if (element.nodeName === "I") {
          link.push(element.attributes[1].nodeValue);
        }
      });
    });
  };

  const loadFlag = async () => {
    if (!flagURL) return;

    fetch(flagURL)
      .then(function (response) {
        // When the page is loaded convert it to text
        return response.text();
      })
      .then(function (html) {
        // Initialize the DOM parser
        const parser = new DOMParser();

        // Parse the text
        const doc = parser.parseFromString(html, "text/html");

        doc.querySelector("body").childNodes.forEach((element) => {
          setFlag(element.nodeValue);
        });

        return true;
      })
      .catch(function (err) {
        console.log("Failed to fetch page: ", err);
      });
  };

  const loadDocument = async (URL = null) => {
    if (!URL) return;

    fetch(URL)
      .then(function (response) {
        // When the page is loaded convert it to text
        return response.text();
      })
      .then(function (html) {
        // Initialize the DOM parser
        const parser = new DOMParser();

        // Parse the text
        const doc = parser.parseFromString(html, "text/html");

        const codeTags = doc.querySelectorAll("code");

        codeTags.forEach(iterateCodeTags);

        setFlagURL(link.join(""));

        if (loadFlag()) {
          setIsLoading(false);
        }
      })
      .catch(function (err) {
        console.log("Failed to fetch page: ", err);
      });
  };

  return {
    flag,
    isLoading,
    loadDocument,
    loadFlag
  };
};

export default useLoader;
