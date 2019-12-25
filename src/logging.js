/** Provides some simple logging with a prompt and indentions */
module.exports = function(prompt, indent_length) {
  var length = indent_length || 2;
  var indent_string = String(" ").repeat(length);
  var indention = "";

  var pre = (prompt ? prompt : "log") + " | ";

  var log = function(string) {
    console.log(pre + indention + string)
  }
  log.log = log;

  log.indent = function() {
    indention += indent_string;
  }

  log.undent = function() {
    indention = indention.substring(length);
  }
  log.unindent = log.undent;

  log.error = function(string) {
    console.error("ERROR " + pre + string);
  }

  log.debug = function(string) {
    console.debug("DEBUG " + pre + string);
  }

  return log;
};
