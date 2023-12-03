import { createIos } from './sdk/Win'

(function (global) {
  global.$Win = createIos()
})(window || this)
