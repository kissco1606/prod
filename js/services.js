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

function classes() {
    const argumentsList = Array.prototype.slice.call(arguments);
	const classes = new Array();
	argumentsList.forEach(function(item) {
		classes.push(item);
	});
	const size = classes.length;
	return size >= 1 ? classes.join(SIGN.ws) : "";
};

function fadeOut(element) {
    return new Promise(function(resolve, reject) {
        const $header = jqByTag("header");
        if($header) {
            $header.css({ opacity: 0 });
        }
        element.css({ opacity: 0 });
        setTimeout(function() {
            resolve();
        }, eStyle.transitionDuration);
    });
};

function fadeIn(element) {
    return new Promise(function(resolve, reject) {
        const $header = jqByTag("header");
        if($header) {
            $header.css({ opacity: 1 });
        }
        element.css({ opacity: 1 });
        setTimeout(function() {
            resolve();
        }, eStyle.transitionDuration);
    });
};

function getHeaderId() {
    return state.module.id + "-" + eId.header;
};

function getContentsId() {
    return state.module.id + "-" + eId.contents;
};

function typeIs(data) {
    const typeObject = new Object;
    const typeString = Object.prototype.toString.call(data).slice(8, -1);
    Object.keys(TYPES.variable).forEach(function(key) {
        return typeObject[key] = (TYPES.variable[key] === typeString);
    });
    return typeObject;
};

function upperCase(str, position) {
    if (!typeIs(position).number) {
        return str.toUpperCase();
    };
    return str.charAt(position).toUpperCase() + str.slice(position + 1);
};

function lowerCase(str, position) {
    if (!typeIs(position).number) {
        return str.toLowerCase();
    };
    return str.charAt(position).toLowerCase() + str.slice(position + 1);
};

function mapUpperCase(str) {
    return str.toUpperCase();
};

function mapLowerCase(str) {
    return str.toLowerCase();
};

function toString(value) {
    return String(value);
};

function toNumber(value) {
    return Number(value);
};

function repetitive(char, size) {
    let setChar = "";
    for (let i = 0; i < size; i++) {
        setChar += setChar + char;
    }
    return setChar;
};

function setCharPadding(char, len, fillChar, fillPos) {
    fillChar = fillChar ? fillChar : "0";
    fillPos = fillPos ? fillPos : TYPES.syntax.left;
    const strChar = String(char);
    const repetition = repetitive(fillChar, len);
    const getFilled = function() {
        let mergedChar = "";
        switch (fillPos) {
            case TYPES.syntax.left: {
                mergedChar = concatString(repetition, strChar).slice(len * -1);
                break;
            }
            case TYPES.syntax.right: {
                mergedChar = concatString(strChar, repetition).slice(0, len);
                break;
            }
            default: {
                mergedChar = strChar;
                break;
            }
        }
        return mergedChar;
    };
    return strChar[len - 1] ? strChar : getFilled();
};

function concatString() {
    const argumentsList = Array.prototype.slice.call(arguments);
	const stack = new Array();
	argumentsList.forEach(function(item) {
		stack.push(item);
    });
    return stack.join(SIGN.none);
};

function escape(str) {
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\//g, '\\/').replace(/</g, '\\x3c').replace(/>/g, '\\x3e').replace(/(0x0D)/g, '\r').replace(/(0x0A)/g, '\n');
};

function queryEscape(str) {
    return str.replace(/'/g, SIGN.none);
};

function getSystemDate() {
    const d = new Date();
    const year = String(d.getFullYear());
    const month = setCharPadding(String(d.getMonth() + 1), 2);
    const date = setCharPadding(String(d.getDate()), 2);
    return concatString(year, month, date);
};

function cloneJS(data) {
    const type = typeIs(data);
    if(type.object) {
        return $.extend(true, {}, data);
    }
    else if(type.array) {
        return new Array().concat(data);
    }
    return data;
};

function isVoid(val) {
    const type = typeof (val);
    const isArray = Array.isArray(val);
    if (isArray) {
        const size = val.length;
        return size <= 0;
    }
    else if ((!val && val !== 0) || val === null || type === undefined) {
        return true;
    }
    else {
        switch (type) {
            case 'object': {
                const objSize = Object.keys(val).length;
                return objSize <= 0;
            }
            default: {
                return false;
            }
        }
    }
};

function accessObject(obj, keys) {
    return keys.reduce(function(prev, curr) {
        return prev[curr];
    }, obj);
};

function getProperty(obj, key) {
    let accessKey = null;
    Object.keys(obj).some(function(k) {
        if(upperCase(k) === upperCase(key)) {
            accessKey = k;
            return true;
        }
    });
    return obj[accessKey];
};

function filter(value, array, keys, matchFunc) {
    const match = function(a, b) {
        if(matchFunc&&typeIs(matchFunc).function) {
            return matchFunc(a) === matchFunc(b);
        }
        return a === b;
    };
    const data = array.filter(function(item) {
        if(!isVoid(keys)) {
            return match(accessObject(item, keys), value);
        }
        return match(item, value);
    });
    return {
        isExist: data.length >= 1,
        data: data
    };
};

function createMenuItem(itemList, icon, text, func) {
    const $item = jqNode("li", { class: eClass.menuItem });
    const $icon = jqNode("span", { class: eClass.menuItemIcon }).append(jqNode("i", { class: icon }));
    const $text = jqNode("span", { class: eClass.menuItemText }).text(upperCase(text, 0));
    $item.click(function() {
        if(typeIs(func).function) {
            func();
        }
    });
    $item.append($icon).append($text);
    itemList.push($item);
};

function createMenuInfo(itemList, info) {
    if(typeIs(info).object && Object.keys(info).length >= 1) {
        const $devider = jqNode("li", { class: classes(eClass.menuItem, eClass.menuItemDevider) });
        $devider.append(jqNode("span").append(jqNode("hr")));
        itemList.push($devider);
        Object.keys(info).forEach(function(key) {
            const obj = info[key];
            const $item = jqNode("li", { class: classes(eClass.menuItem, eClass.menuItemInfo) });
            const $text = jqNode("span").text(concatString(obj.name, " : ", obj.value));
            $item.append($text);
            itemList.push($item);
        });
    }
};

function getDialogTitle(type) {
    let caption, titleClass, icon;
    switch(type) {
        case TYPES.dialog.complete: {
            caption = upperCase(CAPTIONS.complete, 0);
            titleClass = classes(eClass.dialogIconTitleContainer, eClass.completeColor);
            icon = eIcon.checkCircle;
            break;
        }
        case TYPES.dialog.error: {
            caption = upperCase(CAPTIONS.error, 0);
            titleClass = classes(eClass.dialogIconTitleContainer, eClass.errorColor);
            icon = eIcon.timesCircle;
            break;
        }
        case TYPES.dialog.warning: {
            caption = upperCase(CAPTIONS.warning, 0);
            titleClass = classes(eClass.dialogIconTitleContainer, eClass.warningColor);
            icon = eIcon.exclamationTriangle;
            break;
        }
    }
    const $container = jqNode("div", { class: titleClass });
    const $icon = jqNode("span", { class: eClass.dialogTitleIcon }).append(jqNode("i", { class: icon }));
    const $titleText = jqNode("span", { class: eClass.dialogTitleText }).text(caption);
    $container.append($icon).append($titleText);
    return $container;
};

const Notification = function () {
    this.dialogContainer = jqById(eId.notificationContainer);
    this.dialog = null;
    this.type = null;
    this.okButton = null;
};
Notification.prototype = {
    setContents: function(title, contents) {
        const _this = this;
        const $dialog = jqNode("div", { id: eId.notification, class: eClass.dialog });
        const $title = jqNode("div", { class: eClass.dialogTitle });
        const $contents = jqNode("div", { class: eClass.dialogContents });
        const $actions = jqNode("div", { class: eClass.dialogActions });
        const $okButton = jqNode("button", { id: eId.notificationOk, class: eClass.dialogButton }).text(upperCase(CAPTIONS.ok));
        $okButton.click(function() {
            _this.close();
        });
        $actions.append($okButton);
        $title.html(title);
        $contents.html(contents);
        [$title, $contents, $actions].forEach(function(item) {
            $dialog.append(item);
        });
        $contents.css({ "max-height": "600px" });
        this.dialog = $dialog;
        this.okButton = $okButton;
        return this;
    },
    complete: function() {
        this.type = TYPES.dialog.complete;
        return this;
    },
    error: function() {
        this.type = TYPES.dialog.error;
        return this;
    },
    open: function (message) {
        const _this = this;
        _this.setContents(getDialogTitle(_this.type), message);
        if (!_this.dialog) return null;
        _this.dialogContainer.addClass(eClass.mostTop);
        _this.dialogContainer.removeClass(eClass.hide);
        _this.dialogContainer.append(_this.dialog);
        state.notification = _this;
        _this.okButton.focus();
        return false;
    },
    close: function () {
        const _this = this;
        if (_this.dialogContainer) {
            _this.dialogContainer.removeClass(eClass.mostTop);
            _this.dialogContainer.addClass(eClass.hide);
            _this.dialogContainer.empty();
        }
        return false;
    },
    exit: function (consoleMsg) {
        throw new Error(consoleMsg);
    }
};

const Dialog = function () {
    this.dialogContainer = jqById(eId.dialogContainer);
    this.dialog = null;
    this.okButton = null;
    this.actions = null;
};
Dialog.prototype = {
    setContents: function (title, contents, option) {
        const _this = this;
        const $dialog = jqNode("div", { id: eId.dialog, class: eClass.dialog });
        const $title = jqNode("div", { class: eClass.dialogTitle });
        const $contents = jqNode("div", { class: eClass.dialogContents });
        const $actions = jqNode("div", { class: eClass.dialogActions });
        const $titleContainer = jqNode("div", { class: eClass.dialogIconTitleContainer });
        const $titleText = jqNode("span", { class: eClass.dialogTitleText }).text(title);
        $titleContainer.append($titleText);
        const $okButton = jqNode("button", { id: eId.dialogOk, class: eClass.dialogButton }).text(upperCase(CAPTIONS.ok));
        const $cancelButton = jqNode("button", { id: eId.dialogClose, class: eClass.dialogButton }).text(upperCase(CAPTIONS.cancel));
        [$okButton, $cancelButton].forEach(function(item) {
            $actions.append(item);
        });
        $cancelButton.click(function() {
            _this.close();
        });
        $title.html($titleContainer);
        $contents.html(contents);
        [$title, $contents, $actions].forEach(function(item) {
            $dialog.append(item);
        });
        if(option) {
            $contents.css(option);
        }
        this.dialog = $dialog;
        this.okButton = $okButton;
        this.actions = $actions;
        return this;
    },
    setButton: function(buttonItems) {
        const _this = this;
        if(_this.actions) {
            buttonItems.forEach(function(item) {
                item.addClass(eClass.dialogButton);
                _this.actions.append(item);
            });
        }
        return this;
    },
    open: function (callback) {
        const _this = this;
        if (!_this.dialog) return null;
        const close = function() {
            _this.close();
        };
        _this.okButton.click(function() {
            callback(close);
        });
        _this.dialogContainer.addClass(classes(eClass.dialogBackdrop, eClass.mostTop));
        _this.dialogContainer.removeClass(eClass.hide);
        _this.dialogContainer.append(_this.dialog);
        // jqById(eId.container).addClass(eClass.overflowHidden);
        return false;
    },
    close: function () {
        const _this = this;
        if (_this.dialogContainer) {
            _this.dialogContainer.removeClass(classes(eClass.dialogBackdrop, eClass.mostTop));
            _this.dialogContainer.addClass(eClass.hide);
            _this.dialogContainer.empty();
            // jqById(eId.container).removeClass(eClass.overflowHidden);
        }
        return false;
    }
};

const Loading = function() {
    this.container = jqById(eId.loadingContainer);
};
Loading.prototype = {
    on: function() {
        const _this = this;
        return new Promise(function(resolve, reject) {
            _this.container.empty();
            _this.container.append(jqNode("div", { class: eClass.loader }));
            _this.container.addClass(eClass.isVisible);
            setTimeout(function() {
                return resolve();
            });
        });
    },
    off: function() {
        this.container.removeClass(eClass.isVisible);
        this.container.empty();
    }
};

const FileController = function () {
    this.readType =  TYPES.file.readType.text;
    this.listener = null;
    this.allowed = null;
};
FileController.prototype = {
    setListener: function (listenerId) {
        this.listener = jqById(listenerId);
        return this;
    },
    setReadType: function (type) {
        this.readType = type ? type : TYPES.file.readType.text;
        return this;
    },
    allowedExtensions: function (allowed) {
        this.allowed = allowed;
        return this;
    },
    access: function (func) {
        const _this = this;
        const allowed = _this.allowed;
        const $listener = _this.listener;
        if ($listener) {
            $listener.change(function(e) {
                e.stopPropagation();
                const files = e.target.files;
                if (files && files.length >= 1) {
                    const file = files[0];
                    $listener.val(SIGN.none);
                    if (isNotAllowed(allowed, file.type)) {
                        new Notification().error().open(MESSAGES.not_allowed_extension);
                        return false;
                    }
                    _this.loadFile(file, func);
                }
            });
            $listener.click();
        }
        return this;
    },
    loadFile: function (file, func) {
        const fr = new FileReader();
        fr.onload = function(e) {
            const result = e.target.result;
            func(result);
        };
        readFile(fr, this.readType, file);
    }
};

function isNotAllowed(allowed, fileType) {
    if (!typeIs(allowed).array) return false;
    let result = true;
    allowed.some(function(item) {
        if (item === fileType) {
            result = false;
            return true;
        }
    });
    return result;
};

function readFile(fr, type, file) {
    if (!file) {
        return false;
    }
    const readType = TYPES.file.readType;
    switch (type) {
        case readType.arrayBuffer: {
            fr.readAsArrayBuffer(file);
            break;
        }
        case readType.binaryString: {
            fr.readAsBinaryString(file);
            break;
        }
        case readType.dataUrl: {
            fr.readAsDataURL(file);
            break;
        }
        default: {
            fr.readAsText(file);
            break;
        }
    }
};

function saveAsFile(parts, type, fileName) {
    try {
        const blob = new Blob([parts], { tpye: type });
        saveAs(blob, fileName);
    }
    catch (e) {
        new Notification().error().open(MESSAGES.faild_download_file);
    }
};

function s2ab(s) { 
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
};

function Workbook() {
	if(!(this instanceof Workbook)) return new Workbook();
	this.SheetNames = [];
	this.Sheets = {};
};

function datenum(v, date1904) {
	if(date1904) v+=1462;
	var epoch = Date.parse(v);
	return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};