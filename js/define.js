const SIGN = {
    sc: ";",
    bs: "(",
    be: ")",
    nl: "\n",
    ws: " ",
    none: "",
    es: "	",
    br: "<br />",
    c: ",",
    cw: ", ",
    sq: "'",
    dq: '"'
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
        loadingContainer: "loading-container",
        fileListener: "file-listener"
    },
    class: {
        screen: "screen",
        toolsIcon: "tools-icon",
        iconButton: "icon-button",
        pannel: "pannel",
        mostTop: "most-top",
        overflowHidden: "overflow-hidden",
        dialog: "dialog",
        dialogContainer: "dialog-container",
        dialogBackdrop: "dialog-backdrop",
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
        cardTitleIcon: "card-title-icon",
        cardTitleText: "card-title-text",
        cardContents: "card-contents",
        cardActions: "card-actions",
        buttonColorPositive: "button--color-positive",
        buttonColorCalm: "button--color-calm",
        buttonColorBalanced: "button--color-balanced",
        buttonColorEnergized: "button--color-energized",
        buttonColorAssertive: "button--color-assertive",
        buttonColorRoyal: "button--color-royal",
        buttonColorDark: "button--color-dark",
        buttonColorCyan: "button--color-cyan"
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
        chevronCircleDown: "fas fa-chevron-circle-down",
        wrench: "fas fa-wrench",
        plus: "fas fa-plus",
        trash: "fas fa-trash"
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
    },
    syntax: {
        left: "left",
        right: "right"
    },
    file: {
        readType: {
            text: "readAsText",
            arrayBuffer: "readAsArrayBuffer",
            binaryString: "readAsBinaryString",
            dataUrl: "readAsDataURL"
        },
        mime: {
            TEXT_UTF8: "text/plain;charset=utf-8",
            TEXT: "text/plain",
            OCTET_STREAM: "application/octet-stream"
        },
        extension: {
            txt: ".txt",
            zip: ".zip",
            json: ".json",
            png: ".png",
            xls: ".xls",
            xlsx: ".xlsx"
        },
        contentType: {
            string: "string",
            uint8array: "uint8array",
            base64: "base64",
            binarystring: "binarystring",
            array: "array",
            arrayBuffer: "arrayBuffer",
            blob: "blob",
            nodebuffer: "nodebuffer"
        }
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

const MESSAGES = {
    system_error: "System error",
    invalid_access: "Invalid access",
    faild_read_file: "Failed to read file",
    faild_download_file: "Failed to download file",
    not_allowed_extension: "Can not read this file",
    incorrect_data: "Incorrect data",
    invalid_input: "Input value is incorrect",
    confirm_list_delete: "Are you sure you want to delete this record?",
    save_complete: "You have successfully save data",
    success_copy: "Copy to your clipboard",
    nothing_data: "Nothing data",
    allowedOnlyNumeric: "Allowed to only numeric"
};

const REG_EXP = {
    numeric: new RegExp("^\\d+$", "g"),
    numeric_nl: new RegExp("^[\n0-9]+$", "g")
};

const MODULE_ID = {
    sql: "sql",
    batch: "batch"
};

const state = new Object();