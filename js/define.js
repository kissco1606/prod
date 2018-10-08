const SIGN = {
    sc: ";",
    bs: "(",
    be: ")",
    nl: "\n",
    ws: " ",
    es: ""
};

const ELEMENTS = {
    id: {
        container: "container",
        header: "header",
        headerTitle: "header-title",
        titleIcon: "title-icon",
        titleText: "title-text",
        headerTools: "header-tools",
        contents: "contents",
        menuContents: "menu-contents",
        plate: "plate",
        dialogContainer: "dialog-container",
        dialog: "dialog",
        dialogTitle: "dialog-title",
        dialogContent: "dialog-content",
        dialogOk: "dialog-ok",
        dialogClose: "dialog-close",
        notificationContainer: "notification-container",
        notification: "notification",
        notificationTitle: "notification-title",
        notificationContent: "notification-content",
        notificationOk: "notification-ok",
        loadingContainer: "loading-container"
    },
    class: {
        screen: "screen",
        toolsIcon: "tools-icon",
        iconButton: "icon-button",
        pannel: "pannel",
        mostTop: "most-top",
        dialog: "dialog",
        dialogContainer: "dialog-container",
        dialogTitle: "dialog-title",
        dialogContents: "dialog-contents",
        dialogDefaultContents: "dialog-default-contents",
        dialogActions: "dialog-actions",
        dialogButton: "dialog-button",
        dialogIconTitleContainer: "dialog-icon-title-container",
        dialogTitleIcon: "dialog-title-icon",
        dialogTitleText: "dialog-title-text",
        dialogBackdrop: "dialog-backdrop",
        completeColor: "complete-color",
        errorColor: "error-color",
        warningColor: "warning-color",
        hide: "hide",
        menuContainer: "menu-container",
        menu: "menu",
        menuItem: "menu-item",
        menuBottomRight: "menu-bottom-right",
        isVisible: "is-visible",
        menuItemIcon: "menu-item-icon",
        menuItemText: "menu-item-text",
        menuItemDevider: "menu-item-devider",
        menuItemInfo: "menu-item-info",
        loader: "loader",
        cardContainer: "card-container",
        card: "card",
        cardContentsContainer: "card-contents-container",
        cardTitle: "card-title",
        cardContents: "card-contents",
        cardActions: "card-actions"
    },
    icon: {
        database: "fas fa-database",
        cog: "fas fa-cog",
        home: "fas fa-home",
        checkCircle: "fas fa-check-circle",
        timesCircle: "fas fa-times-circle",
        exclamationTriangle: "fas fa-exclamation-triangle",
        signOut: "fas fa-sign-out-alt",
        signIn: "fas fa-sign-in-alt",
        ellipsisV: "fas fa-ellipsis-v",
        chevronCircleDown: "fas fa-chevron-circle-down"
    },
    style: {
        transitionDuration: 300
    }
};

const TYPES = {
    variable: {
        null: "Null",
        undefined: "Undefined",
        string: "String",
        number: "Number",
        array: "Array",
        object: "Object",
        function: "Function",
        date: "Date"
    },
    dialog: {
        complete: "complete",
        error: "error",
        warning: "warning"
    }
};

const CAPTIONS = {
    ok: "ok",
    cancel: "cancel",
    error: "error",
    warning: "warning",
    complete: "complete",
    home: "home",
    disconnect: "disconnect"
};

const MODULE_ID = {
    sql: "sql",
    batch: "batch"
};

const state = new Object();