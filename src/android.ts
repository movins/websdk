import { createAndroid } from "./sdk/Win"

(function (global) {
  global.$Win = createAndroid()
})(window || this)
