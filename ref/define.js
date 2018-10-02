const SYMBOL = {
    map: ':',
    contentsEnd: '@$',
    end: ';',
    objectEnd: '#',
    whiteSpace: ' ',
    sheetSpace: '	',
    nextLine: '\n',
    point: '.',
    minus: '-'
};

const ELEMENTS = {
    id: {
        screenContainer: 'screen-container',
        headerActions: 'header-actions',
        fileListenner: 'file-listenner',
        import: 'import',
        export: 'export',
        save: 'save',
        print: 'print',
        settings: 'settings',
        quill: 'quill',
        editor: 'editor',
        listTab: 'listTab',
        editorTab: 'editorTab',
        tabsContainer: 'tabs-container',
        viewerTabsContainer: 'viewer-tabs-container',
        headerIconContainer: 'header-icon-container',
        headerTitle: 'header-title',
        dialogContainer: 'dialog-container',
        dialog: 'dialog',
        dialogTitle: 'dialog-title',
        dialogContent: 'dialog-content',
        dialogOk: 'dialog-ok',
        dialogClose: 'dialog-close',
        notificationContainer: 'notification-container',
        notification: 'notification',
        notificationTitle: 'notification-title',
        notificationContent: 'notification-content',
        notificationOk: 'notification-ok',
        yearSelect: 'year-select',
        monthSelect: 'month-select',
        calendarList: 'calendar-list',
        listNothing: 'list-nothing',
        gridContainer: 'grid-container',
        grid: 'grid',
        viewerContainer: 'viewer-container',
        viewerClose: 'viewer-close',
        copy: 'copy',
        typeATab: 'typeA-tab',
        typeBTab: 'typeB-tab',
        typeASection: 'typeA-section',
        typeBSection: 'typeB-section',
        typeAViewer: 'typeA-viewer',
        typeBViewer: 'typeB-viewer'
    },
    class: {
        screenView: 'screen-view',
        flexBox: 'flex-box',
        show: 'show',
        hide: 'hide',
        hidden: 'hidden',
        bold: 'bold',
        cursorDefault: 'cursor-default',
        cursorPointer: 'cursor-pointer',
        textCenter: 'text-center',
        textLeft: 'text-left',
        textRight: 'text-right',
        width100: 'width100',
        mostTop: 'most-top',
        marginRight20: 'margin-right20',
        paddingTop10: 'padding-top10',
        paddingBottom30: 'padding-bottom30',
        paddingTopBottom10: 'padding-top-bottom10',
        paddingTopBottom20: 'padding-top-bottom20',
        maxWidth980: 'max-width980',
        overflowXAuto: 'overflow-x-auto',
        overflowyAuto: 'overflow-y-auto',
        headerButton: 'header-button',
        tooltip: 'mdl-tooltip',
        dialog: 'dialog',
        dialogContainer: 'dialog-container',
        dialogTitle: 'dialog-title',
        dialogContent: 'dialog-content',
        dialogDefaultContent: 'dialog-default-content',
        dialogActions: 'dialog-actions',
        dialogButton: 'dialog-button',
        dialogIconTitleContainer: 'dialog-icon-title-container',
        dialogIconTitle: 'dialog-icon-title',
        dialogBackdrop: 'dialog-backdrop',
        errorColor: 'error-color',
        completeColor: 'complete-color',
        warningColor: 'warning-color',
        redColor: 'red-color',
        blueColor: 'blue-color',
        calendarSelect: 'calendar-select',
        selectContainer: 'select-container',
        materialIcons: 'material-icons',
        materialButton: 'mdl-button mdl-js-button',
        iconButton: 'mdl-button--icon',
        rippleEffect: 'mdl-js-ripple-effect',
        tableCellNonNumeric: 'mdl-data-table__cell--non-numeric',
        deleteIconButton: 'delete-icon-button',
        typeAColumn: 'typeA-column',
        typeBColumn: 'typeB-column',
        materialRadio: 'mdl-radio mdl-js-radio',
        materialRadioButton: 'mdl-radio__button',
        materialRadioLabel: 'mdl-radio__label',
        materialCheckbox: 'mdl-checkbox mdl-js-checkbox',
        materialCheckboxInput: 'mdl-checkbox__input',
        materialCheckboxLabel: 'mdl-checkbox__label',
        materialTextField: 'mdl-textfield mdl-js-textfield',
        materialFloatingLabel: 'mdl-textfield--floating-label',
        materialTextFieldInput: 'mdl-textfield__input',
        materialTextFieldLabel: 'mdl-textfield__label',
        materialTabBarContainer: 'mdl-layout__tab-bar-container',
        settingTypeTitle: 'setting-type-title',
        settingSubtitle: 'setting-subtitle',
        customTextField: 'custom-textfield',
        timestampTextField: 'timestamp-textfield',
        settingsContent: 'settings-content',
        viewerContainer: 'viewer-container',
        copyIcon: 'copy-icon',
        fullWidth: 'full-width',
        materialTable: 'mdl-data-table mdl-js-data-table',
        materialShadow_2dp: 'mdl-shadow--2dp'
    },
    tag: {
        div: 'div',
        span: 'span',
        label: 'label',
        input: 'input',
        i: 'i',
        select: 'select',
        option: 'option',
        dialog: 'dialog',
        button: 'button',
        table: 'table',
        thead: 'thead',
        tbody: 'tbody',
        th: 'th',
        tr: 'tr',
        td: 'td',
        hr: 'hr',
        textarea: 'textarea'
    },
    icons: {
        timeline: 'timeline',
        arrow_back: 'arrow_back',
        cloud_upload: 'cloud_upload',
        cloud_download: 'cloud_download',
        get_app: 'get_app',
        save_alt: 'save_alt',
        settings: 'settings',
        check_circle: 'check_circle',
        delete: 'delete',
        delete_outline: 'delete_outline',
        remove_outline: 'remove_circle_outline',
        report_problem: 'report_problem',
        close: 'close',
        file_copy: 'file_copy'
    },
    types: {
        id: 'id',
        class: 'class',
        tag: 'tag',
        text: 'text',
        radio: 'radio',
        checkbox: 'checkbox'
    },
    attributes: {
        selected: 'selected',
        disabled: 'disabled',
        dataClipboardTarget: 'data-clipboard-target'
    },
    event: {
        click: 'click',
        change: 'change',
        keyup: 'keyup'
    },
    func: {
        storage: {
            local: 'localStorage',
            session: 'sessionStorage'
        }
    },
    command: {
        copy: 'copy'
    }
};

const KEYS = {
    state: 'w_m_state',
    calendar: 'calendar',
    date: 'date',
    workInfo: 'workInfo',
    typeA: 'typeA',
    typeB: 'typeB',
    isHalfRound: 'isHalfRound',
    roundType: 'roundType',
    timestamp: 'timestamp',
    in: 'in',
    out: 'out'
};

const TYPES = {
    null: 'Null',
    undefined: 'Undefined',
    string: 'String',
    number: 'Number',
    array: 'Array',
    object: 'Object',
    date: 'Date'
};

const SHEET_DEFINES = {
    colSize: 4
};

const FILE_DEFINITION = {
    read_type: {
        text: 'readAsText',
        arrayBuffer: 'readAsArrayBuffer',
        binaryString: 'readAsBinaryString',
        dataUrl: 'readAsDataURL'
    },
    types: {
        TEXT_UTF8: 'text/plain;charset=utf-8',
        TEXT: 'text/plain'
    },
    extension: {
        zip: '.zip',
        json: '.json',
        png: '.png',
        xls: '.xls',
        xlsx: '.xlsx'
    },
    contentType: {
        string: 'string',
        uint8array: 'uint8array',
        base64: 'base64',
        binarystring: 'binarystring',
        array: 'array',
        arrayBuffer: 'arrayBuffer',
        blob: 'blob',
        nodebuffer: 'nodebuffer'
    },
    name: {
        exportFile: 'work_manager_log.txt'
    }
};

const CAPTIONS = {
    headerTitle: 'Work Manager',
    ok: 'OK',
    cancel: 'CANCEL',
    calendarDownload: 'Calendar Download',
    error: 'error',
    errorUpper: 'Error',
    warning: 'warning',
    warningUpper: 'Warning',
    complete: 'complete',
    completeUpper: 'Complete',
    nothing: 'Nothing',
    editorColumns: ['TypeA : in', 'TypeA : out', 'TypeB : in', 'TypeB : out'],
    import: 'import',
    export: 'export',
    save: 'save',
    settings: 'settings',
    settingsUpper: 'Settings',
    typeA: 'typeA',
    typeB: 'typeB',
    in: 'in',
    out: 'out',
    halfRound: '5minutes round',
    roundType: {
        roundUp: 'Round up',
        round: 'Round',
        roundDown: 'Round down'
    },
    timeAdjustment: 'Time adjustment',
    timeRoundType: 'Time round type',
    unit: 'Unit: Minutes',
    viewerSheetCols: ['Date', 'In time', 'Out time', 'Work time'],
    total: 'total'
};

const MESSAGES = {
    system_error: 'System error',
    invalid_access: 'Invalid access',
    faild_read_file: 'Failed read file',
    not_allowed_extension: 'Can not read this file',
    incorrect_data: 'Incorrect data',
    invalid_input: 'Input value is incorrect',
    confirm_list_delete: 'Are you sure you want to delete this record?',
    save_complete: 'You have successfully save data',
    invalid_sheet_data: (rowNum) => `Date<${setDigitSize(2, rowNum)}> : Invalid data exists`,
    success_copy: 'Copy to your clipboard'
};

const SERIAL = {
    seed: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#$%^&',
    size: 8
};

const SYNTAX = {
    left: 'left',
    right: 'right',
    zeroString: '0',
    none: 'none'
};

const BASIS = {
    hours_divider: 1000 * 60 * 60,
    minutes_divider: 1000 * 60,
    subtractedTime: -3600000,
    system_hours: 3600000,
    system_minutes: 60000,
    criteria5: 5,
    criteriaDef: 10
};

const CALENDAR = {
    define: {
        monthStart: 1,
        monthSize: 12
    },
    days: [
        { index: 0, en: 'sun', jp: '日' },
        { index: 1, en: 'mon', jp: '月' },
        { index: 2, en: 'tue', jp: '火' },
        { index: 3, en: 'wed', jp: '水' },
        { index: 4, en: 'thu', jp: '木' },
        { index: 5, en: 'fri', jp: '金' },
        { index: 6, en: 'sat', jp: '土' },
    ]
};

const STATE_OPTIONS = {
    timestamp: {
        in: 'in',
        out: 'out'
    },
    printingMode: {
        workSheet: 'work_sheet',
        workReport: 'work_report'
    },
    roundType: {
        roundUp: 'round_up',
        round: 'round',
        roundDown: 'round_down'
    }
};
const so = STATE_OPTIONS;
const STRUCTURE = {
    workInfo: {
        typeA: { in: null, out: null },
        typeB: { in: null, out: null }
    },
    option: {
        typeA: {
            in: -30,
            out: 0,
            printingMode: so.printingMode.workSheet,
            roundType: so.roundType.round,
            isHalfRound: true
        },
        typeB: {
            in: 0,
            out: 0,
            printingMode: so.printingMode.workReport,
            roundType: so.roundType.round,
            isHalfRound: true
        }
    },
    event: {
        func: () => { },
        param: null
    }
};

const REG_EXP = {
    comment: new RegExp('[\/\*(.*?)\*\/]', 'g'),
    textExtension: new RegExp('\.(txt)', 'i'),
    defaultTime: new RegExp('^([01]?[0-9]|2[0-3]):([0-5][0-9])$', 'g'),
    customTime: new RegExp('^([0-4]?[0-9]|4[0-7]):([0-5][0-9])$', 'g'),
    minus: new RegExp('-', 'g'),
    timeAdjustment: new RegExp('^[-]?\\d{1,3}$', 'g')
};

const TRANSACTION_DEFINES = {
    map: {
        calendar: ['calendar'],
        schedule: (year, month) => ['calendar', year, month],
        option: (year, month) => ['calendar', year, month, 'option'],
        workInfo: (year, month, date) => ['calendar', year, month, 'date', date, 'workInfo']
    }
};

const screen_state = {
    tabType: ELEMENTS.id.listTab,
    parameter: new Object(),
    workbook: null,
    spreadSheet: null,
    allowedAction: true,
    viewer: KEYS.typeA,
    clipboard: {
        typeA: null,
        typeB: null
    }
};

const state = {
    data: {
        calendar: new Object()
    }
};