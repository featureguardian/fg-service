module.exports = {
  "extends": "airbnb",

  //See Rule Details here: http://eslint.org/docs/rules/
  "rules": {

    strict: [0, "function"],

    /* ------------------------------------------
     * --------------- Possible Errors ----------
     * ------------------------------------------ */
    "padded-blocks": [0], //Off for now, I don't mind the lines though

    "no-console": 2,
    "no-shadow": 2,

    /* ------------------------------------------
     * --------------- Best Practice ------------
     * ------------------------------------------ */

    //Turned OFF
    "no-param-reassign": 0, //Will be enabled once responses code is cleaned up.
    "no-else-return": 0,    //FIX after response refactoring
    /*
     Variables can be declared at any point in JavaScript code using var, let, or const.
     There are many styles and preferences related to the declaration of variables,
     and one of those is deciding on how many variable declarations should be allowed in a single function.
     */
    "one-var": 0,

    //Turned ON
    "curly": 2,
    "vars-on-top": 2,

    /* ------------------------------------------
     * --------------- Style --------------------
     * ------------------------------------------ */

    //Turned OFF
    "comma-dangle": 0,    //Not running in a browser (IE8), so this is ok
    "func-names": 0,      //This will be resolved when object-shorthand is enabled
    "spaced-comment": 0,  //Dumb rule, use whatever spacing you want in comments
    "max-len": 0,

    //Turned ON
    "indent": [2, 2],
    "brace-style": 0,     //FIX after response refactoring
    "no-multiple-empty-lines": [2, {"max": 2, "maxEOF": 2}], //Why we have 2 and EOF I don't know
    //"space-in-parens": [2, "always"], //Not Granular enough

    /* ------------------------------------------
     * --------------- ES6 ----------------------
     * ------------------------------------------ */
    "object-shorthand": [0, "always"], //Should turn this on when ES6 is better supported and Sails generates this way
  }

  /*
   "plugins": [
   "react"
   ]
   */
};
