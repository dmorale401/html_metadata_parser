// Note: Please do not use JSDOM or any other external library/package (sorry)
/*
type Metadata = {
  url: string;
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
};
*/

/**
 * Gets the URL, site name, title, description, keywords, and author info out of the <head> meta tags from a given html string.
 * 1. Get the URL from the <meta property="og:url"> tag.
 * 2. Get the site name from the <meta property="og:site_name"> tag.
 * 3. Get the title from the the <title> tag.
 * 4. Get the description from the <meta property="og:description"> tag or the <meta name="description"> tag.
 * 5. Get the keywords from the <meta name="keywords"> tag and split them into an array.
 * 6. Get the author from the <meta name="author"> tag.
 * If any of the above tags are missing or if the values are empty, then the corresponding value will be null.
 * @param html The complete HTML document text to parse
 * @returns A Metadata object with data from the HTML <head>
 */
export default function getMetadata(html) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(html, "text/html");

  let descriptionElement = htmlDoc.querySelector(
    "meta[property='og:description']"
  );
  if (!descriptionElement) {
    descriptionElement = htmlDoc.querySelector("meta[name='description']");
  }

  const keywordElement = htmlDoc.querySelector("meta[name='keywords']");

  let keywords = null;
  if (keywordElement && !keywordElement.getAttribute("content")) keywords = [];
  else if (keywordElement && keywordElement.getAttribute("content"))
    keywords = keywordElement.getAttribute("content").split(",");

  return {
    url: htmlDoc.querySelector("meta[property='og:url']")
      ? htmlDoc.querySelector("meta[property='og:url']").getAttribute("content")
      : null,
    siteName: htmlDoc.querySelector("meta[property='og:site_name']")
      ? htmlDoc
          .querySelector("meta[property='og:site_name']")
          .getAttribute("content")
      : null,
    title: htmlDoc.querySelector("title") ? htmlDoc.title : null,
    description: descriptionElement
      ? descriptionElement.getAttribute("content")
      : null,
    keywords,
    author: htmlDoc.querySelector("meta[name='author']")
      ? htmlDoc.querySelector("meta[name='author']").getAttribute("content")
      : null,
  };
}
