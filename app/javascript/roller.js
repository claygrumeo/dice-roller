/*********************
 * DICE ROLLER - JS *
 *********************
 * This JS is used to communicate with the server and update the view
 * with the roll result
 */

/************
 * Elements *
 ************/
const rollForm = document.getElementById("roll-form");
const rollResult = document.getElementById("roll-result");
/*******************
 * Event Listeners *
 *******************/
// This handler will handle the response when the "Roll" button
// is clicked.  It will add the result of the roll to the DOM.
// rollForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const formData = new FormData(event.target);

//   fetch(event.target.action, {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       rollResult.textContent = `Roll Result: ${data.value}`
//     });
// });
