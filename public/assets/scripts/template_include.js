function includeNavbar() {
  var elements, i, elmnt, xhttp;
  /* Loop through a collection of all elements with the class "render-navbar": */
  elements = document.getElementsByClassName("render-navbar");
  for (i = 0; i < elements.length; i++) {
      elmnt = elements[i];
      /* Make an HTTP request to get the "navbar.html" file: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
              if (this.status == 200) {
                  elmnt.innerHTML = this.responseText;
              }
              if (this.status == 404) {
                  elmnt.innerHTML = "Page not found.";
              }
              /* Remove the class after the content is loaded to prevent reprocessing: */
              elmnt.classList.remove("render-navbar");
              includeHTML();
          }
      };
      xhttp.open("GET", "./assets/templates/navbar.html", true);
      xhttp.send();
      /* Exit the function to prevent multiple requests for the same elements: */
      return;
  }
}

function includeFooter() {
  var elements, i, elmnt, xhttp;
  /* Loop through a collection of all elements with the class "render-navbar": */
  elements = document.getElementsByClassName("render-footer");
  for (i = 0; i < elements.length; i++) {
      elmnt = elements[i];
      /* Make an HTTP request to get the "navbar.html" file: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
              if (this.status == 200) {
                  elmnt.innerHTML = this.responseText;
              }
              if (this.status == 404) {
                  elmnt.innerHTML = "Page not found.";
              }
              /* Remove the class after the content is loaded to prevent reprocessing: */
              elmnt.classList.remove("render-footer");
              includeHTML();
          }
      };
      xhttp.open("GET", "./assets/templates/footer.html", true);
      xhttp.send();
      /* Exit the function to prevent multiple requests for the same elements: */
      return;
  }
}