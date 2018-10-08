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
            const $item = jqNode("li", { class: classes(eClass.menuItem, eClass.menuItemInfo) });
            const $text = jqNode("span").text(info[key]);
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
    const $title = jqNode("span", { class: eClass.dialogTitleText }).text(caption);
    $container.append($icon).append($title);
    return $container;
};

const Notification = function () {
    this.dialogContainer = jqById(eId.notificationContainer);
    this.dialog = null;
    this.type = null;
};
Notification.prototype = {
    setContent: function(title, content) {
        const _this = this;
        const $dialog = jqNode("div", { id: eId.notification, class: eClass.dialog });
        const $title = jqNode("div", { class: eClass.dialogTitle });
        const $content = jqNode("div", { class: eClass.dialogContents });
        const $actions = jqNode("div", { class: eClass.dialogActions });
        const $okButton = jqNode("button", { id: eId.notificationOk, class: eClass.dialogButton }).text(upperCase(CAPTIONS.ok));
        $okButton.click(function() {
            _this.close();
        });
        $actions.append($okButton);
        $title.html(title);
        $content.html(content);
        [$title, $content, $actions].forEach(function(item) {
            $dialog.append(item);
        });
        this.dialog = $dialog;
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
        this.setContent(getDialogTitle(this.type), message);
        if (!this.dialog) return null;
        this.dialogContainer.addClass(eClass.mostTop);
        this.dialogContainer.removeClass(eClass.hide);
        this.dialogContainer.append(this.dialog);
        return false;
    },
    close: function () {
        if (this.dialogContainer) {
            this.dialogContainer.removeClass(eClass.mostTop);
            this.dialogContainer.addClass(eClass.hide);
            this.dialogContainer.empty();
        }
        return false;
    },
    exit: function (consoleMsg) {
        throw new Error(consoleMsg);
    }
};

// const Dialog = function () {
//     this.dialogContainer = getNode(eid.dialogContainer);
//     this.dialog = null;
//     this.option = {
//         title: null,
//         content: null
//     };
// };
// Dialog.prototype = {
//     titleClasses: function(option) {
//         if(option) this.option.title = option;
//         return this;
//     },
//     contentClasses: function(option) {
//         if(option) this.option.content = option;
//         return this;
//     },
//     setContent: function (title, content) {
//         const option = this.option;
//         const titleClasses = getClasses(ecs.dialogTitle, option.title ? option.title : '');
//         const contentClasses = getClasses(ecs.dialogContent, option.content ? option.content : ecs.dialogDefaultContent);
//         const $dialog = getElement(etg.div, { class: ecs.dialog, id: eid.dialog });
//         const $title = getElement(etg.div, { class: titleClasses });
//         const $content = getElement(etg.div, { class: contentClasses });
//         const $actions = getElement(etg.div, { class: ecs.dialogActions });
//         const $okButton = new MaterialItem().setOption({ class: ecs.dialogButton, id: eid.dialogOk }).setLabel(CAPTIONS.ok).button().item;
//         const $cancelButton = new MaterialItem().setOption({ class: ecs.dialogButton, id: eid.dialogClose }).setLabel(CAPTIONS.cancel).button().item;
//         [$okButton, $cancelButton].forEach((item) => $actions.append(item));
//         $title.html(title);
//         $content.html(content);
//         [$title, $content, $actions].forEach((item) => $dialog.append(item));
//         this.dialog = $dialog;
//         return this;
//     },
//     open: function (actionFunc) {
//         if (!this.dialog) return null;
//         const ok = this.dialog.find(`#${eid.dialogOk}`);
//         const close = this.dialog.find(`#${eid.dialogClose}`);
//         const closeDialog = this.close;
//         dialog_state.dialog = this.dialogContainer;
//         ok.each((i, item) => $(item).click(() => actionFunc(closeDialog)));
//         close.each((i, item) => $(item).click(() => closeDialog()));
//         this.dialogContainer.addClass(getClasses(ecs.dialogBackdrop, ecs.mostTop));
//         this.dialogContainer.append(this.dialog);
//         return false;
//     },
//     close: function () {
//         const container = dialog_state.dialog;
//         if (container) {
//             container.removeClass(getClasses(ecs.dialogBackdrop, ecs.mostTop));
//             container.empty();
//             dialog_state.dialog = null;
//         }
//         return false;
//     }
// };

const Loading = function() {
    this.container = jqById(eId.loadingContainer);
};
Loading.prototype = {
    on: function() {
        this.container.empty();
        this.container.append(jqNode("div", { class: eClass.loader }));
        this.container.addClass(eClass.isVisible);
    },
    off: function() {
        this.container.removeClass(eClass.isVisible);
        this.container.empty();
    }
};