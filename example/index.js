self.onload = function() {
  const header = this.document.querySelector("header");
  const article = this.document.querySelector("article");
  self.addEventListener(
    "resize",
    (function() {
      article.style.height = window.innerHeight - header.style.height + "px";
    })()
  );
};
