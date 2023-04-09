import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="scenery"
export default class extends Controller {
  connect() {
    this.vantaCanvas = document.getElementsByClassName("vanta-canvas");
    this.vantaCanvas[0].style.zIndex = "-3";
  }
}
