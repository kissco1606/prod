const eid = els.id;
const ecs = els.class;
const etp = els.types;
const etg = els.tag;
const eic = els.icons;
const dialog_state = {
    dialog: null,
    notification: null
};

function getWarningTitle() {
    const $container = getElement(etg.div, { class: getClasses(ecs.dialogIconTitleContainer, ecs.warningColor) });
    const $icon = new MaterialItem().setLabel(eic.report_problem).icon().item;
    const $title = getElement(etg.span, { class: ecs.dialogIconTitle }).text(CAPTIONS.warningUpper);
    $container.append($icon).append($title);
    return $container;
};

function getErrorTitle() {
    const $container = getElement(etg.div, { class: getClasses(ecs.dialogIconTitleContainer, ecs.errorColor) });
    const $icon = new MaterialItem().setLabel(eic.check_circle).icon().item;
    const $title = getElement(etg.span, { class: ecs.dialogIconTitle }).text(CAPTIONS.errorUpper);
    $container.append($icon).append($title);
    return $container;
};

function getCompleteTitle() {
    const $container = getElement(etg.div, { class: getClasses(ecs.dialogIconTitleContainer, ecs.completeColor) });
    const $icon = new MaterialItem().setLabel(eic.check_circle).icon().item;
    const $title = getElement(etg.span, { class: ecs.dialogIconTitle }).text(CAPTIONS.completeUpper);
    $container.append($icon).append($title);
    return $container;
};

const Dialog = function () {
    this.dialogContainer = getNode(eid.dialogContainer);
    this.dialog = null;
    this.option = {
        title: null,
        content: null
    };
};
Dialog.prototype = {
    titleClasses: function(option) {
        if(option) this.option.title = option;
        return this;
    },
    contentClasses: function(option) {
        if(option) this.option.content = option;
        return this;
    },
    setContent: function (title, content) {
        const option = this.option;
        const titleClasses = getClasses(ecs.dialogTitle, option.title ? option.title : '');
        const contentClasses = getClasses(ecs.dialogContent, option.content ? option.content : ecs.dialogDefaultContent);
        const $dialog = getElement(etg.div, { class: ecs.dialog, id: eid.dialog });
        const $title = getElement(etg.div, { class: titleClasses });
        const $content = getElement(etg.div, { class: contentClasses });
        const $actions = getElement(etg.div, { class: ecs.dialogActions });
        const $okButton = new MaterialItem().setOption({ class: ecs.dialogButton, id: eid.dialogOk }).setLabel(CAPTIONS.ok).button().item;
        const $cancelButton = new MaterialItem().setOption({ class: ecs.dialogButton, id: eid.dialogClose }).setLabel(CAPTIONS.cancel).button().item;
        [$okButton, $cancelButton].forEach((item) => $actions.append(item));
        $title.html(title);
        $content.html(content);
        [$title, $content, $actions].forEach((item) => $dialog.append(item));
        this.dialog = $dialog;
        return this;
    },
    open: function (actionFunc) {
        if (!this.dialog) return null;
        const ok = this.dialog.find(`#${eid.dialogOk}`);
        const close = this.dialog.find(`#${eid.dialogClose}`);
        const closeDialog = this.close;
        dialog_state.dialog = this.dialogContainer;
        ok.each((i, item) => $(item).click(() => actionFunc(closeDialog)));
        close.each((i, item) => $(item).click(() => closeDialog()));
        this.dialogContainer.addClass(getClasses(ecs.dialogBackdrop, ecs.mostTop));
        this.dialogContainer.append(this.dialog);
        return false;
    },
    close: function () {
        const container = dialog_state.dialog;
        if (container) {
            container.removeClass(getClasses(ecs.dialogBackdrop, ecs.mostTop));
            container.empty();
            dialog_state.dialog = null;
        }
        return false;
    }
};

const Notification = function () {
    this.dialogContainer = getNode(eid.notificationContainer);
    this.dialog = null;
    this.isComplete = false;
};
Notification.prototype = {
    setContent: function (title, content) {
        const $dialog = getElement(etg.div, { class: ecs.dialog, id: eid.notification });
        const $title = getElement(etg.div, { class: ecs.dialogTitle });
        const $content = getElement(etg.div, { class: ecs.dialogContent });
        const $actions = getElement(etg.div, { class: ecs.dialogActions });
        const $okButton = new MaterialItem().setOption({ class: ecs.dialogButton, id: eid.notificationOk }).setLabel(CAPTIONS.ok).button().item;
        [$okButton].forEach((item) => $actions.append(item));
        $title.html(title);
        $content.html(content);
        [$title, $content, $actions].forEach((item) => $dialog.append(item));
        this.dialog = $dialog;
        return this;
    },
    complete: function () {
        this.isComplete = true;
        return this;
    },
    open: function (message) {
        if (this.isComplete) {
            this.setContent(getCompleteTitle(), message);
            this.isComplete = false;
        }
        else {
            this.setContent(getErrorTitle(), message);
        }
        if (!this.dialog) return null;
        const ok = this.dialog.find(`#${eid.notificationOk}`);
        const closeDialog = this.close;
        dialog_state.notification = this.dialogContainer;
        ok.each((i, item) => $(item).click(() => closeDialog()));
        this.dialogContainer.addClass(getClasses(ecs.mostTop));
        this.dialogContainer.append(this.dialog);
        return false;
    },
    close: function () {
        const container = dialog_state.notification;
        if (container) {
            container.removeClass(getClasses(ecs.mostTop));
            container.empty();
            dialog_state.notification = null;
        }
        return false;
    },
    exit: function (consoleMsg) {
        throw new Error(consoleMsg);
    }
};