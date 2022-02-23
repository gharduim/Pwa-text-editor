import { getData, putDb } from "./database";
import { header } from "./header";

export default class {
  constructor() {
    const localData = localStorage.getItem("content");

    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    getData().then((data) => {
      console.info("Loaded data from IndexedDB, injecting into editor");
      if (data === null) {
        this.editor.setValue(header);
      }
      this.editor.setValue(data || localData || header);
    });

    this.editor.on("change", () => {
      localStorage.setItem("content", this.editor.getValue());
    });

    this.editor.on("blur", () => {
      console.log("The editor has lost focus");
      putDb(localStorage.getItem("content"));
    });
  }
}
