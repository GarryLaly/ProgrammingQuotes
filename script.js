const quotesDiv = document.querySelector("#quotes");

const quoteNode = (story) => {
  var template = document.createElement("template");
  template.innerHTML = story;
  return template.content.childNodes[0];
};

const addQuoteRandom = (quote) => {
  const html = `<div class="quoteItem">
     <div>${quote.en}</div>
     <div>- ${quote.author}</div>
    </div>`;
  quotesDiv.appendChild(quoteNode(html));
};

if (
  localStorage.lastFetch &&
  localStorage.quotes &&
  new Date() - localStorage.lastFetch < 1000 * 60 * 60
) {
  addQuoteRandom(JSON.parse(localStorage.quotes));
} else {
  if (localStorage.quotes) {
    addQuoteRandom(JSON.parse(localStorage.quotes));
  }

  fetch("https://programming-quotes-api.herokuapp.com/quotes/random", {
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (!localStorage.quotes) {
        addQuoteRandom(data);
      }

      localStorage.setItem("quotes", JSON.stringify(data));
      localStorage.setItem("lastFetch", new Date() - 1);
    });
}
