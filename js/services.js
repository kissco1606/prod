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
    const ahead = str.slice(0, position);
    const middle = str.charAt(position).toUpperCase();
    const behind = str.slice(position + 1);
    return  concatString(ahead, middle, behind);
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

function toFullWidth(str) {
    return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 65248);
    });
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

function getToday() {
    const d = new Date();
    const year = String(d.getFullYear());
    const month = setCharPadding(String(d.getMonth() + 1), 2);
    const date = setCharPadding(String(d.getDate()), 2);
    return {
        year: year,
        month: month,
        date: date
    };
};

function getSystemDate() {
    const d = new Date();
    const year = String(d.getFullYear());
    const month = setCharPadding(String(d.getMonth() + 1), 2);
    const date = setCharPadding(String(d.getDate()), 2);
    return concatString(year, month, date);
};

function getSystemDateTime(dateSep, timeSep) {
    const ds = dateSep ? dateSep : SIGN.ssh;
    const ts = timeSep ? timeSep : SIGN.gc;
    const d = new Date();
    const year = String(d.getFullYear());
    const month = setCharPadding(String(d.getMonth() + 1), 2);
    const date = setCharPadding(String(d.getDate()), 2);
    const hours = setCharPadding(String(d.getHours()), 2);
    const minutes = setCharPadding(String(d.getMinutes()), 2);
    const seconds = setCharPadding(String(d.getSeconds()), 2);
    const fullDate = [year, month, date].join(ds);
    const fullTime = [hours, minutes, seconds].join(ts);
    return [fullDate, fullTime].join(SIGN.ws);
};

function getSystemDateTimeMilliseconds(dateSep, timeSep) {
    const ds = dateSep ? dateSep : SIGN.ssh;
    const ts = timeSep ? timeSep : SIGN.gc;
    const d = new Date();
    const year = String(d.getFullYear());
    const month = setCharPadding(String(d.getMonth() + 1), 2);
    const date = setCharPadding(String(d.getDate()), 2);
    const hours = setCharPadding(String(d.getHours()), 2);
    const minutes = setCharPadding(String(d.getMinutes()), 2);
    const seconds = setCharPadding(String(d.getSeconds()), 2);
    const milliseconds = String(d.getMilliseconds());
    const fullDate = [year, month, date].join(ds);
    const fullTime = concatString([hours, minutes, seconds].join(ts), ".", milliseconds);
    return [fullDate, fullTime].join(SIGN.ws);
};

function getFileStamp() {
    const d = new Date();
    const year = String(d.getFullYear());
    const month = setCharPadding(String(d.getMonth() + 1), 2);
    const date = setCharPadding(String(d.getDate()), 2);
    const hours = setCharPadding(String(d.getHours()), 2);
    const minutes = setCharPadding(String(d.getMinutes()), 2);
    const seconds = setCharPadding(String(d.getSeconds()), 2);
    return concatString(year, month, date, hours,minutes, seconds);
};

function convertPath(path) {
    return path.replace(new RegExp("\\\\", "g"), "\\\\");
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

function setObject(obj, keys, value) {
    return keys.reduce(function(prev, curr, i, a) {
        if(a.length === i + 1) return prev[curr] = value;
        if(isVoid(prev[curr])) return prev[curr] = new Object();
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

function getObjectMaxOrder(o, orderKey) {
    try {
        const oKey = orderKey ? orderKey : "order";
        const result = Object.keys(o).map(function(key) { return o[key] }).reduce(function(prev, curr) {
            return prev[oKey] >= curr[oKey] ? prev : curr;
        });
        return result[oKey];
    }
    catch(e) {
        return -1;
    }
};

function getObjectOrderList(o, orderKey) {
    const oKey = orderKey ? orderKey : "order";
    const orderList = Object.keys(o).sort(function(a, b) {
        const ao = o[a][oKey];
        const bo = o[b][oKey];
        if(ao < bo) return -1;
        else if(ao > bo) return 1;
        return 0;
    });
    return orderList;
};

function sortObjectByOrder(o, orderKey) {
    const newObject = new Object();
    const orderList = getObjectOrderList(o, orderKey);
    orderList.forEach(function(key) {
        newObject[key] = o[key];
    });
    return newObject;
};

function removeNullObject(obj) {
    if(!typeIs(obj).object) return false;
    Object.keys(obj).forEach(function(key) {
        if(isVoid(obj[key])) delete obj[key];
        else removeNullObject(obj[key]);
    });
};

function getExistArray(list) {
    return list.filter(function(item) { return item; });
};

function find(value, array, keys, matchFunc) {
    const match = function(a, b) {
        if(matchFunc && typeIs(matchFunc).function) {
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

function getSelection(e) {
    const noneObj = {
        start: e.value.length,
        end: e.value.length,
        length: 0,
        text: SIGN.none
    };
    if("selectionStart" in e) {
        const l = e.selectionEnd - e.selectionStart;
        return {
            start: e.selectionStart,
            end: e.selectionEnd,
            length: l,
            text: e.value.substr(e.selectionStart, l)
        };
    }
    else if(document.selection) {
        e.focus();
        const r = document.selection.createRange();
        const tr = e.createTextRange();
        const tr2 = tr.duplicate();
        tr2.moveToBookmark(r.getBookmark());
        tr.setEndPoint("EndToStart", tr2);
        if (r == null || tr == null) return noneObj;
        const text_part = r.text.replace(/[\r\n]/g, ".");
        const text_whole = e.value.replace(/[\r\n]/g, ".");
        const the_start = text_whole.indexOf(text_part, tr.text.length);
        return {
            start: the_start,
            end: the_start + text_part.length,
            length: text_part.length,
            text: r.text
        };
    }
    return noneObj;
};
function getSelectionById(id) {
    const e = document.getElementById(id);
    return getSelection(e);
};
function getSelectionByClass(className) {
    const e = document.getElementsByClassName(className)[0];
    return getSelection(e);
};

function getIterator(size) {
    return Array.apply(null, new Array(size));
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

function buildCard(cardInfo) {
    const $card = jqNode("div", { id: cardInfo.id, class: eClass.card });
    const $cardTitle = jqNode("div", { class: eClass.cardTitle });
    const $titleIcon = jqNode("span", { class: eClass.cardTitleIcon }).append(jqNode("i", { class: eIcon.wrench }));
    const $titleText = jqNode("span", { class: eClass.cardTitleText }).text(cardInfo.title);
    $cardTitle.append($titleIcon).append($titleText);
    const $cardContentsContainer = jqNode("div", { class: eClass.cardContentsContainer });
    const $cardContents = jqNode("div", { class: eClass.cardContents }).html(cardInfo.contents);
    const $cardActions = jqNode("div", { class: eClass.cardActions });
    const $openIcon = jqNode("i", { class: eIcon.chevronCircleDown });
    $openIcon.click(function() {
        const isOpenned = $card.hasClass(eClass.cardContentsOpenned);
        if(isOpenned) {
            $card.removeClass(eClass.cardContentsOpenned);
        }
        else {
            $card.addClass(eClass.cardContentsOpenned);
        }
    });
    $cardContentsContainer.append($cardContents);
    $cardActions.append($openIcon);
    $card.append($cardTitle).append($cardContentsContainer).append($cardActions);
    return $card;
};

function getDialogHeader(type) {
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
    this.callback = null;
};
Notification.prototype = {
    setContents: function(title, contents) {
        const _this = this;
        const isWarningType = _this.type === TYPES.dialog.warning;
        const $dialog = jqNode("div", { id: eId.notification, class: eClass.dialog });
        const $title = jqNode("div", { class: eClass.dialogHeader });
        const $contents = jqNode("div", { class: eClass.dialogContents });
        const $actions = jqNode("div", { class: eClass.dialogActions });
        const actionStack = new Array();
        const $okButton = jqNode("button", { id: eId.notificationOk, class: eClass.dialogButton }).text(upperCase(CAPTIONS.ok));
        const close = function() { _this.close(); };
        $okButton.click(function() {
            if(isWarningType) {
                _this.callback(close);
            }
            else {
                _this.close();
            }
        });
        actionStack.push($okButton);
        if(isWarningType) {
            const $cancelButton = jqNode("button", { id: eId.dialogClose, class: eClass.dialogButton }).text(upperCase(CAPTIONS.cancel));
            $cancelButton.click(function() {
                _this.close();
            });
            actionStack.push($cancelButton);
        }
        const eb = new ElementBuilder();
        eb.listAppend($actions, actionStack);
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
    warning: function(callback) {
        this.type = TYPES.dialog.warning;
        this.callback = callback;
        return this;
    },
    open: function (message) {
        const _this = this;
        _this.setContents(getDialogHeader(_this.type), message);
        if (!_this.dialog) return null;
        _this.dialogContainer.addClass(eClass.mostTop);
        _this.dialogContainer.removeClass(eClass.hide);
        _this.dialogContainer.append(_this.dialog);
        state.notification = _this;
        _this.okButton.focus();
        return this;
    },
    close: function () {
        const _this = this;
        if (_this.dialogContainer) {
            _this.dialogContainer.removeClass(eClass.mostTop);
            _this.dialogContainer.addClass(eClass.hide);
            _this.dialogContainer.empty();
        }
        return null;
    },
    exit: function (consoleMsg) {
        throw new Error(consoleMsg);
    }
};

const Dialog = function () {
    this.dialogContainer = jqById(eId.dialogContainer);
    this.dialog = null;
    this.contents = null;
    this.okButton = null;
    this.actions = null;
};
Dialog.prototype = {
    setContents: function (title, contents, option) {
        const _this = this;
        const $dialog = jqNode("div", { id: eId.dialog, class: eClass.dialog });
        const $title = jqNode("div", { class: eClass.dialogHeader });
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
        if(option) $contents.css(option);
        this.dialog = $dialog;
        this.contents = $contents;
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
    disableOkButton: function() {
        this.okButton.remove();
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
        _this.dialogContainer.addClass(classes(eClass.dialogBackdrop, eClass.subTop));
        _this.dialogContainer.removeClass(eClass.hide);
        _this.dialogContainer.append(_this.dialog);
        return this;
    },
    close: function () {
        const _this = this;
        if (_this.dialogContainer) {
            _this.dialogContainer.removeClass(classes(eClass.dialogBackdrop, eClass.subTop));
            _this.dialogContainer.addClass(eClass.hide);
            _this.dialogContainer.empty();
        }
        return null;
    },
    render: function(contents) {
        this.contents.html(contents);
        return null;
    }
};

const SubDialog = function () {
    this.dialogContainer = jqNode("div", { class: eClass.subDialogContainer });
    this.dialog = jqNode("div", { class: eClass.subDialog });
    this.header = jqNode("div", { class: eClass.subDialogHeader });
    this.contents = jqNode("div", { class: eClass.subDialogContents });
    this.actionsVisible = true;
    this.actions = jqNode("div", { class: eClass.dialogActions });
    this.okButton = null;
    this.closeButton = null;
};
SubDialog.prototype = {
    setContents: function(title, contents, option) {
        const _this = this;
        const eb = new ElementBuilder();
        const $title = jqNode("span").text(title);
        _this.header.append($title);
        _this.contents.html(contents);
        const $okButton = jqNode("button", { class: eClass.dialogButton }).text(upperCase(CAPTIONS.ok));
        const $closeButton = jqNode("button", { class: eClass.dialogButton }).text(upperCase(CAPTIONS.cancel));
        [$okButton, $closeButton].forEach(function(item) {
            _this.actions.append(item);
        });
        $closeButton.click(function() { _this.close(); });
        _this.okButton = $okButton;
        _this.closeButton = $closeButton;
        if(option) _this.contents.css(option);
        eb.listAppend(_this.dialog, [_this.header, _this.contents, _this.actions]);
        _this.dialogContainer.append(_this.dialog);
        return this;
    },
    setUserButton: function(okButton, closeButton) {
        this.okButton.html(okButton);
        this.closeButton.html(closeButton);
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
    hideActions: function() {
        this.actionsVisible = false;
        return this;
    },
    disableOkButton: function() {
        this.okButton.remove();
        return this;
    },
    open: function (callback) {
        const _this = this;
        const close = function() {
            _this.close();
        };
        _this.okButton.click(function() {
            callback(close);
        });
        if(!_this.actionsVisible) _this.actions.remove();
        jqByTag("body").append(_this.dialogContainer);
        return null;
    },
    close: function () {
        this.dialogContainer.remove();
        return null;
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
                    if (isNotAllowed(allowed, file.type)) {
                        new Notification().error().open(MESSAGES.not_allowed_extension);
                        return false;
                    }
                    _this.loadFile(file, func);
                }
                $listener.val(SIGN.none);
                return false;
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
        switch(type) {
            case TYPES.file.mime.CSV: {
                parts = concatString("\ufeff", parts);
                break;
            }
        }
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

function sheetFromArrayOfArrays(data, callback, parameter) {
	const ws = new Object();
    const range = {
        s: { c: 10000000, r: 10000000 },
        e: { c: 0, r: 0 }
    };
    for(let R = 0; R != data.length; ++R) {
        for(let C = 0; C != data[R].length; ++C) {
            if(range.s.r > R) range.s.r = R;
            if(range.s.c > C) range.s.c = C;
            if(range.e.r < R) range.e.r = R;
            if(range.e.c < C) range.e.c = C;
            const cell = { v: data[R][C] };
            if(cell.v == null) cell.v = SIGN.none;
            const cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
            if(typeof cell.v === "number") cell.t = "n";
            else if(typeof cell.v === "boolean") cell.t = "b";
            else if(cell.v instanceof Date) {
                cell.t = "n";
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            }
            else cell.t = "s";
            if(typeIs(callback).function) callback(R, C, cell, parameter);
            ws[cell_ref] = cell;
        }
    }
    if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
};

function datenum(v, date1904) {
	if(date1904) v += 1462;
	const epoch = Date.parse(v);
	return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};

function removeDuplicationArray(list) {
    return isVoid(list) ? list : list.filter(function(item, i) {
        return list.indexOf(item) === i;
    });
};

function bindQuery(query, mapping) {
    let resultQuery = query;
    const getBinder = function(key) {
        return concatString("\\${", key, "}");
    };
    Object.keys(mapping).forEach(function(key) {
        const value = mapping[key];
        const binder = getBinder(key);
        resultQuery = resultQuery.replace(new RegExp(binder, "g"), value);
    });
    return resultQuery;
};

const WorkerBuilder = function() {
    this.windowURL = window.URL || window.webkitURL;
    this.worker = null;
    this.blob = null;
};
WorkerBuilder.prototype = {
    stringifyFunction: function(func) {
        if(!typeIs(func).function) return null;
        return concatString("(", func.toString(), ")();");
    },
    process: function(func) {
        const code = this.stringifyFunction(func);
        try {
            this.blob = new Blob([code], { type: TYPES.file.mime.JAVASCRIPT });
        }
        catch(e) {
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
            this.blob = new BlobBuilder();
            this.blob.append(code);
            this.blob = this.blob.getBlob();
        }
        const objectURL = this.windowURL.createObjectURL(this.blob);
        this.worker = new Worker(objectURL);
        return this;
    }
};

function threadMessage(module, actionType, params) {
    return {
        module: module,
        type: actionType,
        params: params
    };
};

function getApplicationDBPath(storagePath) {
    const rootPath = window.location.pathname;
    const rootPathList = getExistArray(rootPath.split(SIGN.ssh));
    const storagePathList = getExistArray(storagePath.split(SIGN.ssh));
    rootPathList.pop();
    const pathCollection = rootPathList.concat(storagePathList);
    return pathCollection.join("\\\\");
};

const ActiveXMLHttpRequest = function() {
    this.req = null;
    this.contentType = TYPES.file.mime.TEXT_UTF8;
    try {
        this.req = new ActiveXObject(TYPES.client.msxml2);
    } catch (e) {
        this.req = new XMLHttpRequest();
    }
};
ActiveXMLHttpRequest.prototype = {
    setContentType: function(type) {
        this.contentType = type;
        return this;
    },
    get: function(path, async) {
        const req = this.req;
        const contentType = this.contentType;
        return new Promise(function(resolve, reject) {
            try {
                req.open("GET", path, async);
                if(contentType) req.setRequestHeader("Content-Type", contentType);
                req.onreadystatechange = function() {
                    if(req.readyState === 4) {
                        const data = req.responseText;
                        return resolve(data);
                    }
                }
                req.send();
            }
            catch(e) {
                return reject(e);
            }
        });
    }
};

function getJson(path) {
    return new Promise(function(resolve, reject) {
        const typeJSON = TYPES.file.mime.JSON;
        const xhr = new ActiveXMLHttpRequest();
        xhr.setContentType(typeJSON);
        xhr.get(path, true).then(function(data) {
            try {
                const jsonData = JSON.parse(data);
                return resolve(jsonData);
            }
            catch(e) {
                return reject(e);
            }
        }).catch(function(e) {
            return reject(e);
        });
    });
};

const FileTree = function(path) {
	this.absolutePath = null;
	this.path = path;
	this.tree = new Object();
	this.treeSize = 0;
	this.u = "\\";
};
FileTree.prototype = {
	getAbsolutePath: function() {
	    const path = this.path.split(this.u).filter(function(item, i, a) { return a.length > i + 1; }).join(this.u);
		return path + this.u;
	},
	getRootPath: function(path) {
	    const oPath = path.replace(this.absolutePath, "");
	    const pathList = oPath.split(this.u);
	    const size = pathList.length;
	    const rootObj = { key: oPath, reference: "", size: size };
	    if(size >= 1) rootObj.reference = pathList.slice(0, size - 1).join(this.u);
		return rootObj;
	},
	getAccessKey: function(path) {
		return getExistArray(path.replace(this.absolutePath, "").split(this.u));
	},
	setTreeObject: function(obj, root, fileName) {
	    const key = root.key;
	    const reference = root.reference;
	    if(!obj[key]) {
	        obj[key] = { root: reference, files: [fileName] };
	    }
	    else {
	        obj[key].files.push(fileName);
	    }
	},
	setFilesTree: function(fileObj, _this) {
		const folder = fileObj.folder;
		const path = fileObj.path;
		const file = fileObj.file;
		const root = _this.getRootPath(path);
		const key = root.key;
	    const reference = root.reference;
	    const rootSize = root.size;
	    _this.treeSize = _this.treeSize >= rootSize ? _this.treeSize : rootSize;
	    const obj = _this.tree;
	    if(!obj[key]) {
	        obj[key] = { root: reference, folder: folder, files: [file.Name] };
	    }
	    else {
	        obj[key].files.push(file.Name);
	    }
	},
	iterateFiles: function(path, folder, recursive, actionPerFileCallback) {
		const _this = this;
		const fso = new ActiveXObject(TYPES.client.fileSystemObject); 
		const folderObj = fso.GetFolder(path);
		const fileEnum = new Enumerator(folderObj.Files);
		for(; !fileEnum.atEnd(); fileEnum.moveNext()){
			const fileObj = {
				path: path,
				folder: folder ? folder : "",
				file: fso.GetFile(fileEnum.item())
			};
			actionPerFileCallback(fileObj, _this);
		}
		if(recursive){
			const subFolderEnum = new Enumerator(folderObj.SubFolders);
			for(; !subFolderEnum.atEnd(); subFolderEnum.moveNext()){
				var subFolderObj = fso.GetFolder(subFolderEnum.item());
				this.iterateFiles(subFolderObj.Path, subFolderObj.Name, true, actionPerFileCallback);
			}
		}
	},
	build: function() {
		this.absolutePath = this.getAbsolutePath(this.path);
		this.iterateFiles(this.path, null, true, this.setFilesTree);
		const target = this.path.replace(this.absolutePath, SIGN.none);
		return {
		    tree: this.tree,
		    size: this.treeSize,
		    target: target
		};
	}
};

const FileSystem = function(path) {
    const io = TYPES.file.io;
	this.path = path;
	this.mode = io.mode.forWriting;
	this.option = false;
	this.format = io.format.os;
	this.data = null;
};
FileSystem.prototype = {
	init: function() {
		const fso = new ActiveXObject(TYPES.client.fileSystemObject);
		return fso;
    },
    toJsonPath: function() {
        if(typeIs(this.path).string) this.path = this.path.replace(new RegExp("\\\\", "g"), "/");
        return this;
    },
    toFilePath: function() {
        if(typeIs(this.path).string) this.path = this.path.replace(new RegExp("/", "g"), "\\");
        return this;
    },
    toSystemPath: function() {
        if(typeIs(this.path).string) this.path = this.path.replace(new RegExp("\\\\", "g"), "\\\\");
        return this;
    },
    getPath: function() {
        return this.path;
    },
	setFormat: function(format) {
		this.format = format;
		return this;
	},
	createNotExists: function() {
		this.option = true;
		return this;
	},
	setData: function(data) {
		this.data = data;
		return this;
	},
	read: function() {
	    const fileTypes = TYPES.file.io;
	    const mode = fileTypes.mode;
		const fso = this.init();
		const stream = fso.OpenTextFile(this.path, mode.forReading, this.option, this.format);
		this.data = stream.ReadAll();
		stream.Close();
		return this;
	},
	write: function(data) {
		const fileTypes = TYPES.file.io;
	    const mode = fileTypes.mode;
		const fso = this.init();
		const stream = fso.OpenTextFile(this.path, mode.forWriting, this.option, this.format);
		stream.Write(data);
		stream.Close();
		return this;
	}
};

const ElementBuilder = function() {
    this.elements = new Array();
    this.vertical = false;
};
ElementBuilder.prototype = {
    setVertical: function() {
        this.vertical = true;
        return this;
    },
    setHorizontal: function() {
        this.vertical = false;
        return this;
    },
    getItem: function() {
        const _this = this;
        const arrayStack = new Array();
        _this.elements.forEach(function(itemUnit) {
            if(_this.vertical) {
                const $div = jqNode("div");
                itemUnit.forEach(function(item) { $div.append(item); });
                arrayStack.push($div);
            }
            else {
                itemUnit.forEach(function(item) {
                    arrayStack.push(item);
                });
            }
        });
        return arrayStack;
    },
    setItem: function($container) {
        const elements = this.getItem();
        elements.forEach(function(item) {
            $container.append(item);
        });
        return null;
    },
    createRadio: function(itemList) {
        const _this = this;
        _this.elements = new Array();
        const builder = function(label, attributes, isChecked, optionClass) {
            optionClass = optionClass ? optionsClass : eClass.rcColorDefault;
            const $input = jqNode("input", { type: "radio", name: attributes.name, id: attributes.id, value: attributes.value });
            if(isChecked) $input.prop({ checked: true });
            const $label = jqNode("label", { for: attributes.id, class: classes(eClass.radio, optionClass) }).text(label);
            return [$input, $label];
        }
        itemList.forEach(function(item) {
            const elm = builder(item.label, item.attributes, item.isChecked, item.optionClass);
            _this.elements.push(elm);
        });
        return this;
    },
    createCheckbox: function(itemList) {
        const _this = this;
        _this.elements = new Array();
        const builder = function(label, attributes, isChecked, optionClass) {
            optionClass = optionClass ? optionsClass : eClass.rcColorDefault;
            const $input = jqNode("input", { type: "checkbox", name: attributes.name, id: attributes.id, value: attributes.value });
            if(isChecked) $input.prop({ checked: true });
            const $label = jqNode("label", { for: attributes.id, class: classes(eClass.checkbox, optionClass) }).text(label);
            return [$input, $label];
        }
        itemList.forEach(function(item) {
            const elm = builder(item.label, item.attributes, item.isChecked, item.optionClass);
            _this.elements.push(elm);
        });
        return this;
    },
    addEvent: function(element, eventType, callback) {
        jqByTag(element).on(eventType, callback);
        return this;
    },
    getFontAwesomeIcon: function(icon, classOption) {
        const $icon = jqNode("i", { class: icon });
        if(classes) $icon.addClass(classOption);
        return $icon;
    },
    listAppend: function(target, list) {
        list.forEach(function(item) {
            target.append(item);
        });
        return target;
    }
};

const Encryption = function() {
    this.data = null;    
};
Encryption.prototype = {
    getSerialNumber: function() {
        const seed = SERIAL.seed;
        const size = SERIAL.size;
        const seedLength = seed.length;
        let serialNumber = SIGN.none;
        for (var i = 0; i < size; i++) {
            serialNumber += seed[Math.floor(Math.random() * seedLength)];
        }
        return serialNumber;
    },
    getData: function() {
        return this.data;
    },
    encode: function(data) {
        const serialNumber = this.getSerialNumber();
        this.data = CryptoJS.AES.encrypt(data, serialNumber).toString();
        this.data = this.data + serialNumber;
        return this;
    },
    decode: function(data) {
        const size = SERIAL.size;
        const pos = data.length - size;
        const serialNumber = data.substr(pos);
        const trueData = data.substring(0, pos);
        const bytes = CryptoJS.AES.decrypt(trueData, serialNumber);
        this.data = bytes.toString(CryptoJS.enc.Utf8);
        this.data = this.data.replace(new RegExp("\\\\\"", "g"), "\"");
        this.data = this.data.replace(new RegExp("âª", "g"), SIGN.none);
        return this;
    }
};

const Store = function(state) {
    this.path = "storage/db.dat";
    this.toState = state;
    this.fromState = state.data;
    this.state = null;
    this.map = new Array();
};
Store.prototype = {
    load: function() {
        const _this = this;
        return new Promise(function(resolve, reject) {
            const xhr = new ActiveXMLHttpRequest();
            xhr.get(_this.path, true).then(function(data) {
                if(!isVoid(data)) {
                    const aes = new Encryption();
                    const dec = aes.decode(data).getData();
                    const jsData = JSON.parse(dec);
                    _this.toState.data = jsData;
                }
                return resolve();
            }).catch(function(e) {
                return reject(e); 
            });
        });
    },
    init: function() {
        return this.fromState;
    },
    connect: function(map) {
        this.state = Immutable.fromJS(this.fromState);
        this.map = map ? map : new Array();
        return this;
    },
    select: function() {
        if (!this.fromState) return null;
        return Immutable.fromJS(this.fromState).getIn(this.map).toJS();
    },
    set: function(data) {
        if (!this.fromState || !this.state || !this.map) return null;
        const modified = this.state.setIn(this.map, data);
        this.fromState = modified.toJS();
        return this;
    },
    update: function(data) {
        if (!this.fromState || !this.state || !this.map) return null;
        const updated = this.state.updateIn(this.map, function(item) {
            const itemType = typeIs(item);
            if(itemType.object) {
                return item.merge(data);
            }
            else if(itemType.array) {
                return item.push(data);
            }
            else {
                return data;
            }
        });
        this.fromState = updated.toJS();
        return this;
    },
    delete: function() {
        if (!this.fromState || !this.state || !this.map) return null;
        const deleted = this.state.deleteIn(this.map);
        this.fromState = deleted.toJS();
        removeNullObject(this.fromState);
        return this;
    },
    apply: function() {
        this.toState.data = this.fromState;
        return this;
    },
    sync: function() {
        const data = JSON.stringify(this.toState.data);
        const aes = new Encryption();
        const enc = aes.encode(data).getData();
        const fs = new FileSystem(getApplicationDBPath(this.path));
        fs.write(enc);
        return null;
    }
};

const Interface = function(structure) {
    this.structure = structure;
    this.root = null;
};
Interface.prototype = {
    setRoot: function(root) {
        this.root = root;
        return this;
    },
    getKey: function() {
        return this.structure.key;
    },
    getType: function() {
        return this.structure.type;
    },
    getData: function() {
        return this.structure.data;
    },
    create: function(store) {
        const _this = this;
        store.connect([_this.getKey()]).set(_this.getType()).apply();
        return this;
    },
    getInjectData: function() {
        const argumentsList = Array.prototype.slice.call(arguments);
        const applied = this.getData().apply(null, argumentsList);
        return applied;
    },
    inject: function(store, injectData, key) {
        const _this = this;
        if(isVoid(store.init()[_this.getKey()])) _this.create(store);
        store.connect([_this.getKey(), key]).set(injectData).apply();
        return null;
    }
};

const Calendar = function() {
    this.def = {
        mode: {
            ymd: "ymd",
            ym: "ym",
            y: "y",
            s: "s"
        },
        days: [
            { id: 0, en: "sun", jp: "日" },
            { id: 1, en: "mon", jp: "月" },
            { id: 2, en: "tue", jp: "火" },
            { id: 3, en: "wed", jp: "水" },
            { id: 4, en: "thu", jp: "木" },
            { id: 5, en: "fri", jp: "金" },
            { id: 6, en: "sat", jp: "土" }
        ],
        year: {
            start: 1900,
            end: 2199
        },
        month: {
            start: 0,
            end: 11
        },
        date: {
            start: 1,
            col: 7,
            row: 6
        },
        col: 4,
        pagePer: 12
    };
    this.elements = {
        year: null,
        month: null,
        calendar: null,
        container: jqNode("div")
    };
    this.state = {
        mode: null,
        year: null,
        month: null,
        date: null,
        pages: new Array(),
        currentPage: 0,
        selected: new Object()
    };
    this.callback = null;
};
Calendar.prototype = {
    setYear: function(year) {
        this.state.year = year;
        return this;
    },
    setMonth: function(month) {
        this.state.month = month;
        return this;
    },
    setDate: function(date) {
        this.state.date = date;
        return this;
    },
    setMode: function(mode) {
        this.state.mode = mode;
        return this;
    },
    setCallback: function(callback) {
        this.callback = callback;
        return this;
    },
    initDateObj: function(dateObj) {
        this.setYear(dateObj.y);
        this.setMonth(dateObj.m);
        this.setDate(dateObj.d);
        this.state.selected = dateObj;
        return this;
    },
    createMonth: function() {
        const _this = this;
        const def = _this.def;
        const $table = jqNode("div", { class: classes(eClass.table, eClass.calendarPlate) });
        const col = def.col;
        let m = def.month.start;
        const getRow = function() { return jqNode("div", { class: eClass.tableRow }); };
        let $row = getRow();
        while(m <= def.month.end) {
            const monthString = setCharPadding(m + 1, 2);
            const $cell = jqNode("div", { class: classes(eClass.tableCell, eClass.calendarPannel) }).text(monthString);
            $cell.click(function() {
                _this.setMonth(monthString).setMode(def.mode.ymd).build();
            });
            $cell.css({ width: "50px" });
            $row.append($cell);
            m++;
            if(m % col === 0) {
                $table.append($row);
                $row = getRow();
            }
        }
        _this.elements.month = $table;
        return this;
    },
    getMonthElement: function() {
        return this.elements.month;
    },
    createYear: function() {
        const _this = this;
        const def = _this.def;
        const $tab = jqNode("div", { class: eClass.calendarTab });
        const pagePer = def.pagePer;
        const col = def.col;
        let y = def.year.start;
        let p = 0;
        let page = 1;
        const getTable = function() {
            const pageId = _this.getPageId(page);
            const $table = jqNode("div", { id: pageId, class: classes(eClass.table, eClass.calendarPlate, eClass.hide) });
            page++;
            _this.state.pages.push({ id: pageId, node: $table });
            return $table;
        };
        const getRow = function() { return jqNode("div", { class: eClass.tableRow }); };
        let $table = getTable();
        let $row = getRow();
        while(y <= def.year.end) {
            const yearString = String(y);
            const $cell = jqNode("div", { class: classes(eClass.tableCell, eClass.calendarPannel) }).text(yearString);
            $cell.click(function() {
                _this.setYear(yearString).setMode(def.mode.y).build();
            });
            $cell.css({ width: "50px" });
            $row.append($cell);
            y++;
            p++;
            if(y > def.year.end) {
                $table.append($row).appendTo($tab);
                continue;
            }
            if(p % col === 0) {
                $table.append($row);
                $row = getRow();
            }
            if(p === pagePer) {
                p = 0;
                $tab.append($table);
                $table = getTable();
            }
        }
        _this.elements.year = $tab;
        return this;
    },
    getYearElement: function() {
        return this.elements.year;
    },
    getPageId: function(page) {
        return concatString("calendar-page-", page);
    },
    setPage: function(page) {
        this.state.currentPage = page;
        return this;
    },
    paging: function() {
        const def = this.def;
        const state = this.state;
        const pages = state.pages;
        if(state.currentPage < 1 || state.currentPage > pages.length) {
            const page = Math.ceil((Number(state.year ? state.year : 0) - (def.year.start - 1)) / def.pagePer);
            if(page < 1) return false;
            this.setPage(page);
        }
        const currentPageId = this.getPageId(state.currentPage);
        pages.forEach(function(po) {
            if(currentPageId === po.id) po.node.removeClass(eClass.hide);
            else po.node.addClass(eClass.hide);
        });
        return this;
    },
    checkHoliday: function(date, lieuDay) {
        const holidayData = JapaneseHolidays.isHoliday(date, lieuDay);
        const holidayObj = {
            holidayName: isVoid(holidayData) ? SIGN.none : holidayData,
            isHoliday: !isVoid(holidayData)
        };
        return holidayObj;
    },
    createCalendarApi: function() {
        const _this = this;
        const def = _this.def;
        const state = _this.state;
        const eb = new ElementBuilder();
        const y = state.year;
        const m = state.month;
        const col = def.date.col;
        const row = def.date.row;
        const setStyle = function(target, dayIndex, isHoliday, isPreview) {
            if(isPreview) target.addClass(eClass.greyColor);
            else if(isHoliday) target.addClass(eClass.redColor);
            else if(dayIndex === 0) target.addClass(eClass.redColor);
            else if(dayIndex === 6) target.addClass(eClass.blueColor);
            else target.addClass(eClass.whiteColor);
        };
        const isSelected = function(d, isPreview) {
            const selected = state.selected;
            if(isVoid(selected) || isPreview || !(state.mode == def.mode.ymd || state.mode === null)) return false;
            return selected.y === state.year && selected.m === state.month && Number(selected.d) === d;
        };
        const $table = jqNode("div", { class: classes(eClass.table, eClass.calendarApi) });
        const $tableHeader = jqNode("div", { class: eClass.tableHeader });
        const $tableBody = jqNode("div", { class: eClass.tableBody });
        const $headerRow = jqNode("div", { class: eClass.tableRow });
        def.days.forEach(function(item) {
            const $cell = jqNode("div", { class: eClass.tableCell }).text(upperCase(item.en));
            setStyle($cell, item.id);
            $headerRow.append($cell);
        });
        $tableHeader.append($headerRow);
        const startDay = new Date(y, Number(m) - 1, 1).getDay();
        const startDiff = col - (col - startDay);
        const prevEnd = new Date(y, Number(m) - 1, 0).getDate();
        const endDate = new Date(y, m, 0).getDate();
        let nextDate = 1;
        let dateCount = def.date.start;
        const moveDate = function() { dateCount++; };
        const getDateObj = function(date, pass) {
            const dateObj = {
                date: date,
                dayIndex: -1,
                isSaturday: false,
                isSunday: false,
                isHoliday: false,
                holidayName: SIGN.none,
                name_en: SIGN.none,
                name_jp: SIGN.none,
                isPreview: pass
            };
            if(pass) return dateObj;
            const systemDate = new Date(y, Number(m) - 1, date);
            const day = systemDate.getDay();
            const fd = find(day, def.days, ["id"]).data[0];
            const holidayObj = _this.checkHoliday(systemDate, true);
            dateObj.dayIndex = fd.id;
            dateObj.isSaturday = fd.id === 6;
            dateObj.isSunday = fd.id === 0;
            dateObj.isHoliday = holidayObj.isHoliday;
            dateObj.holidayName = holidayObj.holidayName;
            dateObj.name_en = fd.en;
            dateObj.name_jp = fd.jp;
            return dateObj;
        };
        const getRow = function() { return jqNode("div", { class: eClass.tableRow }); };
        let $row = getRow();
        getIterator(col * row).forEach(function(c, i) {
            c = i + 1;
            const subtraction = startDiff - i;
            let vd;
            let isPreview = false;
            if(subtraction > 0) {
                vd = prevEnd - subtraction + 1;
                isPreview = true;
            }
            else if(dateCount > endDate) {
                vd = nextDate;
                nextDate++;
                isPreview = true;
            }
            else {
                vd = dateCount;
                moveDate();
                isPreview = false;
            }
            const dateObj = getDateObj(vd, isPreview);
            const $cell = jqNode("div", { class: eClass.tableCell }).text(dateObj.date);
            setStyle($cell, dateObj.dayIndex, dateObj.isHoliday, dateObj.isPreview);
            if(isSelected(dateObj.date, dateObj.isPreview)) $cell.addClass(eClass.calendarSelected);
            $row.append($cell);
            if(!dateObj.isPreview) {
                $cell.click(function() {
                    _this.setDate(setCharPadding(dateObj.date, 2));
                    if(typeIs(_this.callback).function) _this.callback(_this.getDateStamp());
                });
            }
            if(c % col === 0) {
                $tableBody.append($row);
                $row = getRow();
            }
        });
        eb.listAppend($table, [$tableHeader, $tableBody]);
        _this.elements.calendar = $table;
        return this;
    },
    getCalendar: function() {
        return this.elements.calendar;
    },
    getLabel: function() {
        const def = this.def;
        const state = this.state;
        if(state.mode === def.mode.y) {
            return state.year;
        }
        else {
            return [state.year, state.month].join(SIGN.ssh);
        }
    },
    build: function() {
        const _this = this;
        const def = _this.def;
        const state = _this.state;
        const elements = _this.elements;
        const $container = elements.container;
        $container.empty();
        const eb = new ElementBuilder();
        const $label = jqNode("div", { class: eClass.calendarLabel });
        let $contents = null;
        if(state.mode === def.mode.s) {
            _this.createYear().paging();
            const getLabel = function() {
                const rate = def.pagePer * state.currentPage - 1;
                const maxYearPerPage = def.year.start + rate;
                const minYearPerPage = maxYearPerPage - (def.pagePer - 1);
                const label = [minYearPerPage, maxYearPerPage].join(SIGN.dash);
                return label;
            };
            const $labelText = jqNode("div");
            const $actions = jqNode("div");
            const $up = jqNode("div").addClass(eClass.calendarLabelEvent).append(eb.getFontAwesomeIcon(eIcon.chevronUp));
            const $down = jqNode("div").addClass(eClass.calendarLabelEvent).append(eb.getFontAwesomeIcon(eIcon.chevronDown));
            const initActions = function() {
                if(state.currentPage <= 1) $up.addClass(eClass.hide);
                else if(state.currentPage >= state.pages.length) $down.addClass(eClass.hide);
                else {
                    $up.removeClass(eClass.hide);
                    $down.removeClass(eClass.hide);
                }
                $labelText.text(getLabel());
            };
            initActions();
            $up.click(function() {
                _this.setPage(state.currentPage - 1).paging();
                initActions();
            });
            $down.click(function() {
                _this.setPage(state.currentPage + 1).paging();
                initActions();
            });
            eb.listAppend($label, [$labelText, eb.listAppend($actions, [$up, $down])]);
            $contents = _this.getYearElement();
        }
        else if(state.mode === def.mode.y) {
            const $labelText = jqNode("div").addClass(eClass.calendarLabelEvent);
            $labelText.click(function() {
                _this.setMode(def.mode.s);
                _this.build();
            });
            const $actions = jqNode("div");
            const $up = jqNode("div").addClass(eClass.calendarLabelEvent).append(eb.getFontAwesomeIcon(eIcon.chevronUp));
            const $down = jqNode("div").addClass(eClass.calendarLabelEvent).append(eb.getFontAwesomeIcon(eIcon.chevronDown));
            const initActions = function() {
                if(state.year <= def.year.start) $up.addClass(eClass.hide);
                else if(state.year >= def.year.end) $down.addClass(eClass.hide);
                else {
                    $up.removeClass(eClass.hide);
                    $down.removeClass(eClass.hide);
                }
                $labelText.text(state.year);
            };
            initActions();
            $up.click(function() {
                const year = String(Number(state.year) - 1);
                _this.setYear(year).build();
            });
            $down.click(function() {
                const year = String(Number(state.year) + 1);
                _this.setYear(year).build();
            });
            eb.listAppend($label, [$labelText, eb.listAppend($actions, [$up, $down])]);
            $contents = _this.createMonth().getMonthElement();
        }
        else {
            const $labelText = jqNode("div").addClass(eClass.calendarLabelEvent);
            $labelText.click(function() {
                _this.setMode(def.mode.y);
                _this.build();
            });
            const $actions = jqNode("div");
            const $up = jqNode("div").addClass(eClass.calendarLabelEvent).append(eb.getFontAwesomeIcon(eIcon.chevronUp));
            const $down = jqNode("div").addClass(eClass.calendarLabelEvent).append(eb.getFontAwesomeIcon(eIcon.chevronDown));
            const initActions = function() {
                if(state.year <= def.year.start && Number(state.month) <= def.month.start + 1) $up.addClass(eClass.hide);
                else if(state.year >= def.year.end && Number(state.month) >= def.month.end + 1) $down.addClass(eClass.hide);
                else {
                    $up.removeClass(eClass.hide);
                    $down.removeClass(eClass.hide);
                }
                const label = [state.year, state.month].join(SIGN.ssh);
                $labelText.text(label);
            };
            initActions();
            $up.click(function() {
                const systemDate = new Date(state.year, Number(state.month) - 2, 1);
                const year = String(systemDate.getFullYear());
                const month = setCharPadding(systemDate.getMonth() + 1, 2);
                _this.setYear(year).setMonth(month).build();
            });
            $down.click(function() {
                const systemDate = new Date(state.year, Number(state.month), 1);
                const year = String(systemDate.getFullYear());
                const month = setCharPadding(systemDate.getMonth() + 1, 2);
                _this.setYear(year).setMonth(month).build();
            });
            eb.listAppend($label, [$labelText, eb.listAppend($actions, [$up, $down])]);
            $contents = _this.createCalendarApi().getCalendar();
        }
        eb.listAppend($container, [$label, $contents]);
        return this;
    },
    getContents: function() {
        return this.elements.container;
    },
    getDateStamp: function() {
        const state = this.state;
        return [state.year, state.month, state.date].join(SIGN.ssh);
    }
};

const Viewer = function() {
    this.viewer = jqNode("div", { id: eId.viewerContainer });
    this.title = null;
    this.contents = null;
    this.tools = new Array();
    this.executerVisible = true;
    this.done = null;
};
Viewer.prototype = {
    setContents: function(title, contents) {
        this.title = title;
        this.contents = contents;
        return this;
    },
    setTools: function() {
        const argumentsList = Array.prototype.slice.call(arguments);
        this.tools = argumentsList;
        return this;
    },
    hideExecuter: function() {
        this.executerVisible = false;
        return this;
    },
    open: function(callback) {
        const _this = this;
        const eb = new ElementBuilder();
        const $header = jqNode("div", { class: eClass.viewerHeader });
        const $headerWrapper = jqNode("div", { class: eClass.viewerHeaderWrapper });
        const $headerContext = jqNode("div", { class: eClass.viewerHeaderContext });
        const $closer = jqNode("div", { class: eClass.viewerHeaderCloser }).append(eb.getFontAwesomeIcon(eIcon.arrowLeft));
        $closer.click(function() { _this.close(); });
        const $title = jqNode("div", { class: eClass.viewerHeaderTitle }).text(_this.title);
        eb.listAppend($headerContext, [$closer, $title]);
        const $headerTools = jqNode("div", { class: eClass.viewerHeaderTools });
        const getToolsItem = function(item) {
            const $toolsItem = jqNode("div", { class: eClass.viewerToolsItem });
            $toolsItem.append(item);
            return $toolsItem;
        };
        if(_this.executerVisible) {
            const $executer = jqNode("div", { class: eClass.toolsItemDone }).text(upperCase(CAPTIONS.done));
            const close = function() { _this.close(); };
            $executer.click(function() {
                if(typeIs(callback).function) callback(close);
            });
            _this.tools.unshift($executer);
        }
        _this.tools.forEach(function(item) {
            $headerTools.append(getToolsItem(item));
        });
        eb.listAppend($headerWrapper, [$headerContext, $headerTools]);
        $header.append($headerWrapper);
        const $contentsWrapper = jqNode("div", { class: eClass.viewerContentsWrapper });
        const $overflowContainer = jqNode("div", { class: eClass.overflowContainer });
        const $contents = jqNode("div", { class: eClass.overflowContents }).append(_this.contents);
        $overflowContainer.append($contents).appendTo($contentsWrapper);
        eb.listAppend(_this.viewer, [$header, $contentsWrapper]);
        jqByTag("body").append(_this.viewer);

        const headerToolsSize = $headerTools.width();
        $headerContext.css({ width: "calc(100% - " + Math.ceil(headerToolsSize) + "px)" });
        setTimeout(function() {
            _this.viewer.addClass(eClass.viewerVisible);
        });
        jqByTag("body").addClass(eClass.overflowHidden);
        return this;
    },
    close: function() {
        const _this = this;
        _this.viewer.removeClass(eClass.viewerVisible);
        setTimeout(function() {
            _this.viewer.remove();
        }, 500);
        jqByTag("body").removeClass(eClass.overflowHidden);
        return null;
    },
    onLoad: function(func) {
        func();
        return null;
    }
};
