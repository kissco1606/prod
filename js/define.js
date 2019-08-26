const SIGN = {
    sc: ";",
    gc: ":",
    bs: "(",
    be: ")",
    nl: "\n",
    ws: " ",
    fwws: "　",
    none: "",
    es: "	",
    br: "<br />",
    c: ",",
    cw: ", ",
    sq: "'",
    dq: '"',
    ssh: "/",
    rssh: "\\",
    crlf: "\r\n",
    dash: "-",
    ub: "_",
    equal: "=",
    abs: "&lt;",
    abe: "&gt;",
    and: "&&",
    or: "||"
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
        dialogOk: "dialog-ok",
        dialogClose: "dialog-close",
        notificationContainer: "notification-container",
        notification: "notification",
        notificationTitle: "notification-title",
        notificationContent: "notification-content",
        notificationOk: "notification-ok",
        loadingContainer: "loading-container",
        fileListener: "file-listener",
        viewerContainer: "viewer-container",
        interfaceListContainer: "interface-list-container"
    },
    class: {
        screen: "screen",
        toolsIcon: "tools-icon",
        iconButton: "icon-button",
        pannel: "pannel",
        mostTop: "most-top",
        subTop: "sub-top",
        overflowHidden: "overflow-hidden",
        dialog: "dialog",
        dialogContainer: "dialog-container",
        dialogBackdrop: "dialog-backdrop",
        dialogHeader: "dialog-header",
        dialogContents: "dialog-contents",
        dialogDefaultContents: "dialog-default-contents",
        dialogActions: "dialog-actions",
        dialogButton: "dialog-button",
        dialogIconTitleContainer: "dialog-icon-title-container",
        dialogTitleIcon: "dialog-title-icon",
        dialogTitleText: "dialog-title-text",
        dialogBackdrop: "dialog-backdrop",
        subDialogContainer: "sub-dialog-container",
        subDialog: "sub-dialog",
        subDialogHeader: "sub-dialog-header",
        subDialogContents: "sub-dialog-contents",
        completeColor: "complete-color",
        errorColor: "error-color",
        warningColor: "warning-color",
        hide: "hide",
        hidden: "hidden",
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
        cardContentsOpenned: "card-contents-openned",
        buttonColorPositive: "button--color-positive",
        buttonColorCalm: "button--color-calm",
        buttonColorBalanced: "button--color-balanced",
        buttonColorEnergized: "button--color-energized",
        buttonColorAssertive: "button--color-assertive",
        buttonColorRoyal: "button--color-royal",
        buttonColorDark: "button--color-dark",
        buttonColorCyan: "button--color-cyan",
        buttonColorOrange: "button--color-orange",
        buttonColorLime: "button--color-lime",
        buttonColorDeepOrange: "button--color-deepOrange",
        buttonColorBrown: "button--color-brown",
        buttonColorBlueGrey: "button--color-blueGrey",
        disable: "disable",
        readonly: "readonly",
        radio: "radio",
        checkbox: "checkbox",
        rcColorDefault: "rc-color__default",
        applicationInput: "application-input",
        applicationTextarea: "application-textarea",
        flatButton: "flat-button",
        viewerVisible: "viewer-visible",
        viewerHeader: "viewer-header",
        viewerHeaderWrapper: "viewer-header-wrapper",
        viewerHeaderContext: "viewer-header-context",
        viewerHeaderCloser: "viewer-header-closer",
        viewerHeaderTitle: "viewer-header-title",
        viewerHeaderTools: "viewer-header-tools",
        viewerToolsItem: "viewer-tools-item",
        viewerContentsWrapper: "viewer-contents-wrapper",
        overflowContainer: "overflow-container",
        overflowContents: "overflow-contents",
        toolsItemDone: "tools-item-done",
        viewerSection: "viewer-section",
        sectionTitle: "section-title",
        table: "table",
        tableHeader: "table-header",
        tableBody: "table-body",
        tableRow: "table-row",
        tableCell: "table-cell",
        calendarPlate: "calendar-plate",
        calendarPannel: "calendar-pannel",
        calendarTab: "calendar-tab",
        calendarLabel: "calendar-label",
        calendarLabelEvent: "calendar-label-event",
        calendarApi: "calendar-api",
        calendarSelected: "calendar-selected",
        blueColor: "blue-color",
        redColor: "red-color",
        greyColor: "grey-color",
        whiteColor: "white-color",
        breakWord: "break-word",
        interfaceListAddContainer: "interface-list-add-container",
        actionArea: "action-area",
        viewArea: "view-area",
        fullWidth: "full-width",
        attachLabel: "attach-label",
        appContentsContainer: "app-contents-container",
        commandArea: "command-area",
        actionArea: "action-area"
    },
    icon: {
        database: "fas fa-database",
        fileCode: "fas fa-file-code",
        atom: "fas fa-atom",
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
        trash: "fas fa-trash",
        timesCircle: "far fa-times-circle",
        listAlt: "far fa-list-alt",
        edit: "fas fa-edit",
        check: "fas fa-check",
        times: "fas fa-times",
        arrowLeft: "fas fa-arrow-left",
        calendar: "far fa-calendar-alt",
        chevronUp: "fas fa-chevron-up",
        chevronDown: "fas fa-chevron-down",
        paperClip: "fas fa-paperclip"
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
        boolean: "Boolean",
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
            CSV: "text/csv",
            OCTET_STREAM: "application/octet-stream",
            JSON: "application/json",
            JAVASCRIPT: "application/javascript",
            MS_EXCEL: "application/vnd.ms-excel",
            SP_SHEET: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ZIP: "application/zip",
            X_ZIP_COMPRESSED: "application/x-zip-compressed"
        },
        extension: {
            txt: ".txt",
            zip: ".zip",
            json: ".json",
            png: ".png",
            xls: ".xls",
            xlsx: ".xlsx",
            csv: ".csv",
            bat: ".bat",
            log: ".log",
            sql: ".sql"
        },
        contentType: {
            string: "string",
            uint8array: "uint8array",
            base64: "base64",
            binarystring: "binarystring",
            array: "array",
            arrayBuffer: "arrayBuffer",
            blob: "blob",
            nodebuffer: "nodebuffer",
            binary: "binary"
        },
        responseType: {
            string: "string",
            uint8array: "uint8array",
            base64: "base64",
            binarystring: "binarystring",
            array: "array",
            arrayBuffer: "arrayBuffer",
            blob: "blob",
            nodebuffer: "nodebuffer",
            binary: "binary"
        },
        io: {
            mode: {
                forReading: 1,
                forWriting: 2,
                forAppending: 8
            },
            format: {
                os: -2,
                utf16: -1,
                ascii: 0
            }
        },
        stream: {
            streamType: {
                binary: 1,
                text: 2
            },
            readEnum: {
                all: -1,
                line: -2
            },
            writeEnum: {
                noneLinebreak: 0,
                linebreak: 1
            },
            saveOption: {
                createNotExist: 1,
                overwrite: 2
            },
            encode: {
                utf8: "utf-8"
            }
        }
    },
    path: {
        output: "output"
    },
    client: {
        activeXObejct: "ActiveXObject",
        msxml2: "MSXML2.XMLHTTP",
        fileSystemObject: "Scripting.FileSystemObject",
        fileStream: "ADODB.Stream"
    },
    oracle: {
        throwErrorList: [
            { id: "ORA-00904", message: "無効な識別子です" }
        ]
    }
};

const CAPTIONS = {
    ok: "ok",
    cancel: "cancel",
    error: "error",
    warning: "warning",
    complete: "complete",
    home: "home",
    disconnect: "disconnect",
    done: "done"
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
    allowedOnlyNumeric: "Only numeric is allowed",
    failed_load_application: "Failed load application",
    warning_remove_record: "Are you sure you want to delete this record?"
};

const SERIAL = {
    seed: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#$%^&',
    size: 8
};

const REG_EXP = {
    numeric: new RegExp("^\\d+$", "g"),
    numeric_nl: new RegExp("^[\n0-9]+$", "g")
};

const MODULE_ID = {
    sql: "sql",
    batch: "batch",
    common: "common"
};

const STRUCTURE = {
    accessList: {
        key: "accessList",
        type: new Object(),
        data: function(name, sid, uid, pwd, order) {
            return {
                name: name,
                sid: sid,
                uid: uid,
                pwd: pwd,
                order: order
            };
        }
    },
    systemDatePathList: {
        key: "systemDatePathList",
        type: new Object(),
        data: function(name, path, order) {
            return {
                name: name,
                path: path,
                order: order
            };
        }
    },
    batchLogPathList: {
        key: "batchLogPathList",
        type: new Object(),
        data: function(name, path, order) {
            return {
                name: name,
                path: path,
                order: order
            };
        }
    }
};

const appState = {
    module: new Object(),
    overflow: new Array()
};
const storage = { data: new Object() };
