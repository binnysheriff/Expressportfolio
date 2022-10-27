//IIFE Immediately Invoked Function Expression

(function () {
    function start() {
      console.log("App Started...");
  
      let deleteButtons = document.querySelectorAll(".btn-danger");
  
      for (button of deleteButtons) {
        button.addEventListener("click", (e) => {
          if (!confirm("Are you sure?")) {
            e.preventDefault();
            window.location.assign("/contact-list");
          }
        });
      }
    }
  
    window.addEventListener("load", start);
  })();
