// Pinterest allows 500 characters. Always end with the Amazon disclosure, and
// trim the text before it at a sentence (or word) boundary so it never gets cut.
export function fitPinDescription(text, disclosure, max = 500) {
  let body = text.replace(disclosure, "").replace(/\s+/g, " ").trim();
  const room = max - disclosure.length - 1;
  if (body.length > room) {
    const cut = body.slice(0, room);
    const sentence = cut.lastIndexOf(". ");
    body = sentence > room * 0.6 ? cut.slice(0, sentence + 1) : cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—-]+$/, "") + "…";
  }
  return `${body} ${disclosure}`;
}
