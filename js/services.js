function jqNode(tag, option) {
    return $("<" + tag + " />", option);
};

function jqById(id) {
    return $("#" + id);
};

function jqByClass(className) {
    return $("." + className);
};

function jqByTag(tagName) {
    return $(tagName);
};

function jqByGroupName(name, isChecked) {
    const item = concatString("input[name=", name, "]", (isChecked ? ":checked" : SIGN.none));
    return $(item);
};

function classes() {
    const argumentsList = Array.prototype.slice.call(arguments);
    const classes = new Array();
    argumentsList.forEach(function(item) {
        classes.push(item);
    });
    const size = classes.length;
    return size >= 1 ? classes.join(SIGN.ws) : "";
};
