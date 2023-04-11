/*********************
 * DICE ROLLER - JS *
 *********************
 * This JS will control the call to the backend when making rolls and
 * will also update the view so this particular page has a SPA feel.
 * Before, it was more what I thought was 'Rails-y' where I filled up some
 * flash messages and reloaded the page with those new variables, but that
 * made for a pretty bad look with the way it reloaded the background, and
 * the 3D models would reset their position and it felt sluggish.
 */
import { Controller } from "@hotwired/stimulus";

// Connects to data-controller='roller'
export default class extends Controller {
  connect() {
    /************
     * Elements *
     ************/
    const rollForm = document.getElementById("roll-form");
    const rollResultContainer = document.getElementById(
      "roll-result-container"
    );
    const rollResult = document.getElementById("roll-result");
    const rollResultInfo = document.getElementById("roll-result-info");
    const rollResultDie = document.getElementById("roll-result-die");
    const optionalInfo = document.getElementById("optional-info");

    /*******************
     * Event Listeners *
     *******************/
    rollForm.addEventListener("submit", (event) => {
      // Hide the result form
      rollResultContainer.style.display = "none";
      // Prevent default behavior
      event.preventDefault();

      // Create form data out of the form so the backend can process the request
      const formData = new FormData(rollForm);
      // Reset option info field now that form data is created
      optionalInfo.value = "";

      fetch("/roll", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Reveal the results container
          rollResultContainer.style.display = "flex";
          // Fill in the results as indicated by the call results
          rollResult.textContent = `Roll Result: ${data.roll_result}`;
          rollResultDie.textContent = `on a ${data.die_type}`;
          if (data.info != "") {
            rollResultInfo.textContent = `Info: ${data.info}`;
          } else {
            rollResultInfo.textContent = "";
          }
        });
    });
  }
}
