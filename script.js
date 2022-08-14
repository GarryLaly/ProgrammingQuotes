const quotesDiv = document.querySelector("#quotes");

const quoteNode = (story) => {
  var template = document.createElement("template");
  template.innerHTML = story;
  return template.content.childNodes[0];
};

const addQuoteRandom = (quote) => {
  const html = `<div class="quoteItem">
     <div class="quoteItem-title">${quote.en}</div>
     <div class="quoteItem-author">- ${quote.author}</div>
    </div>`;
  quotesDiv.appendChild(quoteNode(html));
};

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
  });
