$(function () {
    init();
});

function onDelete(e, param) {
    e.stopPropagation();
    e.preventDefault();
    const deleteAction = (closeDialog) => {
        const y = param.y;
        const m = param.m;
        const ts = new Transaction().connect(state.data, td.map.schedule(y, m));
        console.log(ts.select());
        // ts.delete().async().then(() => initList());
        // closeDialog();
    };
    const dialog = new Dialog();
    dialog.setContent(getWarningTitle(), MESSAGES.confirm_list_delete);
    dialog.open(deleteAction);
};

function openEditor(param) {
    screen_state.parameter = param;
    const eid = els.id;
    initSection(eid.editorTab);
    const y = param.y;
    const m = param.m;
    const ts = new Transaction().connect(state.data, td.map.schedule(y, m));
    const data = ts.select();
    const ss = new SpreadSheet().setGrid(eid.grid);
    ss.create(data).then(() => screen_state.spreadSheet = ss.get());
};

function onReadFile(data) {
    const parsed = jsonParse(decryptData(data));
    if (parsed && typeIs(parsed.calendar).object) {
        const los = new Storage().local().setKey(KEYS.state);
        los.encryptionSet(parsed);
        setLocalData().then(() => initList());
    }
    else {
        const msg = MESSAGES.incorrect_data;
        new Notification().open(msg);
    }
};

function importAction() {
    const ei = els.id;
    if (screen_state.tabType !== ei.listTab) return false;
    new FileControl().setListenner(ei.fileListenner).allowedExtensions([fd.types.TEXT]).access(onReadFile);
};

function exportAction() {
    if (!screen_state.allowedAction) return false;
    lockAction();
    const los = new Storage().local().setKey(KEYS.state);
    const data = los.get();
    saveAsFile(data, fd.name.exportFile, fd.types.TEXT_UTF8);
    unlockAction();
};

function saveAction() {
    const ei = els.id;
    if (screen_state.tabType !== ei.editorTab) return false;
    if (!screen_state.allowedAction) return false;
    lockAction();
    saveEditorData().then(() => {
        unlockAction();
        new Notification().complete().open(MESSAGES.save_complete);
    }).catch((e) => {
        unlockAction();
        new Notification().open(e);
    });
};

function validationWorkInfo(date, info) {
    const param = screen_state.parameter;
    const [y, m] = [param.y, param.m];
    const result = {
        workInfo: info,
        flag: true
    };
    Object.keys(info).some((key) => {
        const obj = info[key];
        Object.keys(obj).some((k) => {
            let time = obj[k];
            if (time) {
                const valid = String(time).match(REG_EXP.customTime);
                if (!valid) {
                    result.flag = false;
                    return true;
                }
                time = convertToSystemTime(y, m, date, time);
            }
            result.workInfo[key][k] = time;
        });
        if (!result.flag) return true;
    });
    return result;
};

function saveEditorData() {
    if (!screen_state.spreadSheet) return false;
    return new Promise((resolve, reject) => {
        try {
            const param = screen_state.parameter;
            const [y, m] = [param.y, param.m];
            const workbook = screen_state.spreadSheet.workbook;
            const stateObj = getProperty(state.data, td.map.schedule(y, m));
            const data = workbook.getData();
            const errorStack = new Array();
            data.forEach((itemArray, i) => {
                const date = i + 1;
                const workInfo = {
                    typeA: {
                        in: itemArray[0],
                        out: itemArray[1]
                    },
                    typeB: {
                        in: itemArray[2],
                        out: itemArray[3]
                    }
                };
                const result = validationWorkInfo(date, workInfo);
                if (!result.flag) {
                    errorStack.push(MESSAGES.invalid_sheet_data(date));
                };
                stateObj[KEYS.date][date][KEYS.workInfo] = result.workInfo;
            });
            if (errorStack.length >= 1) {
                return reject(errorStack.join(SYMBOL.nextLine));
            }
            updateWorkInfo(stateObj);
            return resolve();
        }
        catch (e) {
            return reject(MESSAGES.system_error);
        }
    });
};

function updateWorkInfo(stateObj) {
    const param = screen_state.parameter;
    const [y, m] = [param.y, param.m];
    const ts = new Transaction().connect(state.data, td.map.schedule(y, m));
    ts.update(stateObj).async();
};

function openSettings() {
    const ei = els.id;
    const ecs = els.class;
    if (screen_state.tabType !== ei.editorTab) return false;
    const dialog = new Dialog();
    dialog.contentClasses(ecs.settingsContent).setContent(CAPTIONS.settingsUpper, getSettingsContent());
    dialog.open(saveSettings);
};

function saveSettings(closeDialog) {
    const optionStructure = {
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
    };
    const typeA = KEYS.typeA;
    const typeB = KEYS.typeB;
    const timestampIn = KEYS.in;
    const timestampOut = KEYS.out;
    const isHalfRound = KEYS.isHalfRound;
    const roundType = KEYS.roundType;
    const itemIds = [timestampIn, timestampOut, isHalfRound, roundType];
    let result = true;
    [typeA, typeB].forEach((type) => {
        itemIds.forEach((id) => {
            const itemId = `${type}_${id}`;
            let value;
            switch (id) {
                case isHalfRound: {
                    value = getCheckedValueByDOM(itemId);
                    break;
                }
                case roundType: {
                    value = getCheckedValueByName(itemId);
                    break;
                }
                default: {
                    value = $(`#${itemId}`).val();
                    if (!value.match(REG_EXP.timeAdjustment)) {
                        result = false;
                    }
                    else {
                        value = Number(value);
                    }
                    break;
                }
            }
            optionStructure[type][id] = value;
        });
    });
    if (!result) {
        new Notification().open(MESSAGES.invalid_input);
        return false;
    }
    const param = screen_state.parameter;
    const [y, m] = [param.y, param.m];
    const optionMap = td.map.option(y, m);
    const ts = new Transaction().connect(state.data, optionMap);
    ts.update(optionStructure).async().then(() => closeDialog());
};

function onChangeAdjustment(e, $item) {
    const target = e.target;
    const value = target.value;
    const keyCode = e.which || e.keyCode;
    const word = String.fromCharCode(keyCode);
    const isNumber = keyCode >= 48 && keyCode <= 57;
    const isKeypad = keyCode >= 96 && keyCode <= 105;
    const isBackspace = keyCode === 8;
    const isArrowKey = keyCode === 37 || keyCode === 39;
    const isTabKey = keyCode === 9;
    const isMinus = keyCode === 189;
    const isIncorrectPos = $item.get(0).selectionStart >= 1 && isMinus;
    const isOverSize = !(isBackspace || isArrowKey) && value.length >= (value.match(REG_EXP.minus) || isMinus ? 4 : 3);
    if (!(isNumber || isKeypad || isBackspace || isArrowKey || isTabKey || isMinus) || isIncorrectPos || isOverSize) {
        return false;
    }
};

function getSettingsContent() {
    const eid = els.id;
    const ecs = els.class;
    const etg = els.tag;
    const param = screen_state.parameter;
    const [y, m] = [param.y, param.m];
    const ts = new Transaction().connect(state.data, td.map.schedule(y, m));
    const stateObj = ts.select();
    const option = stateObj.option;
    const typeA = KEYS.typeA;
    const typeB = KEYS.typeB;
    const $container = getElement(etg.div);
    const optionObj = {
        [typeA]: { title: toUpperCase(CAPTIONS.typeA) },
        [typeB]: { title: toUpperCase(CAPTIONS.typeB) }
    };
    [typeA, typeB].forEach((typeKey, typeIdx) => {
        const thisOption = option[typeKey];
        const $typeContainer = getElement(etg.div, { class: getClasses(typeIdx === 0 ? ecs.paddingBottom30 : '') });
        const $title = getElement(etg.div, { class: getClasses(ecs.settingTypeTitle) }).text(optionObj[typeKey].title);
        $typeContainer.append($title);
        const $adjustment = getElement(etg.div, { class: getClasses(ecs.settingSubtitle) }).text(CAPTIONS.timeAdjustment);
        const $roundType = getElement(etg.div, { class: getClasses(ecs.settingSubtitle) }).text(CAPTIONS.timeRoundType);
        const $textFieldContainer = createTextFieldContainer(thisOption, typeKey);
        const $checkboxContainer = createCheckboxContainer(thisOption, typeKey);
        const $radioContainer = createRadioContainer(thisOption, typeKey);
        [$adjustment, $textFieldContainer, $roundType, $checkboxContainer, $radioContainer].forEach((item, i, list) => {
            $typeContainer.append(item);
            if (item === $textFieldContainer) {
                $typeContainer.append(getDividerItem());
            }
        });
        $container.append($typeContainer);
    });
    return $container;
};

function createTextFieldContainer(thisOption, typeKey) {
    const evt = els.event;
    const $textFieldContainer = getElement(etg.div);
    Object.keys(so.timestamp).forEach((key, i) => {
        const value = thisOption[key];
        const formId = `${typeKey}_${key}`;
        const inputOption = {
            class: getClasses(ecs.timestampTextField, i <= 0 ? ecs.marginRight20 : ''),
            placeholder: toUpperCase(CAPTIONS.unit)
        };
        const $item = getCustomTextField(formId, inputOption, value);
        $item.keydown((e) => onChangeAdjustment(e, $item));
        $textFieldContainer.append(getElement(etg.span).text(`${toUpperCase(CAPTIONS[key], null)} : `));
        $textFieldContainer.append($item);
    });
    return $textFieldContainer;
};

function createCheckboxContainer(thisOption, typeKey) {
    const $checkboxContainer = getElement(etg.div, { class: getClasses(ecs.paddingTop10) });
    const checked = thisOption.isHalfRound;
    const itemLabel = CAPTIONS.halfRound;
    const forId = `${typeKey}_${KEYS.isHalfRound}`;
    const $item = new MaterialItem().setLabel(itemLabel).checkbox(forId, checked).item;
    $checkboxContainer.append($item);
    return $checkboxContainer;
};

function createRadioContainer(thisOption, typeKey) {
    const $radioContainer = getElement(etg.div, { class: getClasses(ecs.paddingTopBottom10) });
    Object.keys(so.roundType).forEach((key, i) => {
        const roundType = so.roundType[key];
        const checked = roundType === thisOption.roundType;
        const itemLabel = CAPTIONS.roundType[key];
        const name = `${typeKey}_${KEYS.roundType}`;
        const forId = `${typeKey}_${KEYS.roundType}${i}`;
        const $item = new MaterialItem().setOption({ class: ecs.marginRight20 }).setLabel(itemLabel).radioButton(name, forId, roundType, checked).item;
        $radioContainer.append($item);
    });
    return $radioContainer;
};

function openViewer() {
    saveEditorData().then(() => openAction()).catch((e) => new Notification().open(e));
};

function openAction() {
    const ei = els.id;
    const ecs = els.class;
    const param = screen_state.parameter;
    const [y, m] = [param.y, param.m];
    const ts = new Transaction();
    const scheduleObj = ts.connect(state.data, td.map.schedule(y, m)).select();
    setTypeASheet(scheduleObj);
    setTypeBSheet(scheduleObj);
    const $viewerContainer = getNode(ei.viewerContainer);
    $viewerContainer.removeClass(ecs.hide);
    setTimeout(() => $viewerContainer.addClass(ecs.viewerContainer));
};

function sheetTable(data, option, viewType) {
    const ei = els.id;
    const ecs = els.class;
    const etg = els.tag;
    const param = screen_state.parameter;
    const [y, m] = [param.y, param.m];
    const $table = getElement(etg.table, { class: getClasses(ecs.materialTable, ecs.materialShadow_2dp, ecs.fullWidth) });
    const $thead = getElement(etg.thead);
    const $headRow = getElement(etg.tr);
    const cellClass = getClasses(ecs.tableCellNonNumeric, ecs.textCenter);
    CAPTIONS.viewerSheetCols.forEach((col, i) => {
        const $th = getElement(etg.th, { class: cellClass }).text(col);
        $headRow.append($th);
    });
    $thead.append($headRow);
    const $tbody = getElement(etg.tbody);
    const workedStack = new Array();
    const clipboard = new Array();
    Object.keys(data).forEach((key) => {
        const defines = getDayDefines(data, key);
        const labelClass = getLabelClass(defines);
        const thisDate = data[key];
        const workInfo = thisDate.workInfo;
        const typeInfo = workInfo[viewType];
        const fixedIn = getCustomizedTime(typeInfo[KEYS.in], option[KEYS.in]);
        const fixedOut = getCustomizedTime(typeInfo[KEYS.out], option[KEYS.out]);
        const dateLabel = `${getDateFormat(y, m, key)}(${defines.name_jp})`;
        const $dateLabel = getElement(etg.span, { class: getClasses(labelClass) }).text(dateLabel);
        const diff = calculateDiffTime(fixedIn, fixedOut, BASIS.subtractedTime);
        const criteria = option.isHalfRound ? BASIS.criteria5 : BASIS.criteriaDef;
        const worked = new ROUND_TIME(diff).setCriteria(criteria).setType(option.roundType).get();
        const inTime = convertToViewTime(y, m, key, fixedIn);
        const outTime = convertToViewTime(y, m, key, fixedOut);
        const colObj = {
            dateLabel: $dateLabel,
            in: inTime,
            out: outTime,
            worked: worked
        };
        const $tr = getElement(etg.tr);
        Object.keys(colObj).forEach((k, i) => {
            const col = colObj[k];
            const $td = getElement(etg.td, { class: cellClass }).html(col);
            $tr.append($td);
        });
        $tbody.append($tr);
        workedStack.push(worked);
        clipboard.push(`${inTime}${SYMBOL.sheetSpace}${outTime}`);
    });
    const $totalRow = getElement(etg.tr);
    [toUpperCase(CAPTIONS.total), workedStack].forEach((item, i) => {
        const col = i === 0 ? item : sumTimeArray(item);
        const colspan = i === 0 ? CAPTIONS.viewerSheetCols.length - 1 : 1;
        const $totalCol = getElement(etg.td, { class: cellClass, colspan: colspan }).text(col);
        $totalRow.append($totalCol);
    });
    $tbody.append($totalRow);
    $table.append($thead).append($tbody);
    screen_state.clipboard[viewType] = clipboard.join(SYMBOL.nextLine);
    return $table;
};

function reportTable(data, option, viewType) {
    const ei = els.id;
    const ecs = els.class;
    const etg = els.tag;
    const param = screen_state.parameter;
    const [y, m] = [param.y, param.m];
    const $table = getElement(etg.table, { class: getClasses(ecs.materialTable, ecs.materialShadow_2dp, ecs.fullWidth) });
    const $thead = getElement(etg.thead);
    const $headRow = getElement(etg.tr);
    const cellClass = getClasses(ecs.tableCellNonNumeric, ecs.textCenter);
    Object.keys(data).forEach((key) => {
        const defines = getDayDefines(data, key);
        const labelClass = getLabelClass(defines);
        const thisDate = data[key];
        const dateId = `${setDigitSize(2, defines.dateId)}(${defines.name_jp})`;
        const $th = getElement(etg.th, { class: getClasses(cellClass, labelClass) }).text(dateId);
        $headRow.append($th);
    });
    const $totalCol = getElement(etg.th).text(toUpperCase(CAPTIONS.total));
    $headRow.append($totalCol);
    $thead.append($headRow);
    const $tbody = getElement(etg.tbody);
    const workedStack = new Array();
    const clipboard = new Array();
    const clipboardH = new Array();
    const clipboardM = new Array();
    const $hoursRow = getElement(etg.tr);
    const $minutesRow = getElement(etg.tr);
    Object.keys(data).forEach((key) => {
        const thisDate = data[key];
        const workInfo = thisDate.workInfo;
        const typeInfo = workInfo[viewType];
        const fixedIn = getCustomizedTime(typeInfo[KEYS.in], option[KEYS.in]);
        const fixedOut = getCustomizedTime(typeInfo[KEYS.out], option[KEYS.out]);
        const diff = calculateDiffTime(fixedIn, fixedOut, BASIS.subtractedTime);
        const criteria = option.isHalfRound ? BASIS.criteria5 : BASIS.criteriaDef;
        const worked = new ROUND_TIME(diff).setCriteria(criteria).setType(option.roundType).get();
        const workedSplit = worked.split(SYMBOL.map);
        const hoursCol = workedSplit ? workedSplit[0] : '';
        const minutesCol = workedSplit ? workedSplit[1] : '';
        const $hoursCol = getElement(etg.td, { class: cellClass }).text(hoursCol);
        const $minutesCol = getElement(etg.td, { class: cellClass }).text(minutesCol);
        $hoursRow.append($hoursCol);
        $minutesRow.append($minutesCol);
        clipboardH.push(workedSplit[0]);
        clipboardM.push(workedSplit[1]);
        workedStack.push(worked);
    });
    const totalWorked = sumTimeArray(workedStack);
    const totalArray = totalWorked.split(SYMBOL.map);
    if (totalArray) {
        const $totalHCol = getElement(etg.td, { class: cellClass }).text(totalArray[0]);
        const $totalMCol = getElement(etg.td, { class: cellClass }).text(totalArray[1]);
        $hoursRow.append($totalHCol);
        $minutesRow.append($totalMCol);
    }
    $tbody.append($hoursRow).append($minutesRow);
    $table.append($thead).append($tbody);
    clipboard.push(clipboardH.join(SYMBOL.sheetSpace));
    clipboard.push(clipboardM.join(SYMBOL.sheetSpace));
    screen_state.clipboard[viewType] = clipboard.join(SYMBOL.nextLine);
    return $table;
};

function setTypeASheet(scheduleObj) {
    const ei = els.id;
    const ecs = els.class;
    const etg = els.tag;
    const thisType = KEYS.typeA;
    const dateData = scheduleObj.date;
    const optionData = scheduleObj.option[thisType];
    const printingMode = optionData.printingMode;
    const $container = getNode(ei.typeAViewer);
    $container.empty();
    const getTableByType = () => {
        const mode = so.printingMode;
        switch (printingMode) {
            case mode.workSheet: {
                $container.addClass(ecs.maxWidth980);
                $container.removeClass(ecs.overflowXAuto);
                return sheetTable(dateData, optionData, thisType);
            }
            case mode.workReport: {
                $container.removeClass(ecs.maxWidth980);
                $container.addClass(ecs.overflowXAuto);
                return reportTable(dateData, optionData, thisType);
            }
            default: {
                const msg = MESSAGES.system_error;
                new Notification().open(msg).exit(msg);
            }
        }
    };
    const $table = getTableByType();
    $container.append($table);
};

function setTypeBSheet(scheduleObj) {
    const ei = els.id;
    const ecs = els.class;
    const etg = els.tag;
    const thisType = KEYS.typeB;
    const dateData = scheduleObj.date;
    const optionData = scheduleObj.option[thisType];
    const printingMode = optionData.printingMode;
    const $container = getNode(ei.typeBViewer);
    $container.empty();
    const getTableByType = () => {
        const mode = so.printingMode;
        switch (printingMode) {
            case mode.workSheet: {
                $container.addClass(ecs.maxWidth980);
                $container.removeClass(ecs.overflowXAuto);
                return sheetTable(dateData, optionData, thisType);
            }
            case mode.workReport: {
                $container.removeClass(ecs.maxWidth980);
                $container.addClass(ecs.overflowXAuto);
                return reportTable(dateData, optionData, thisType);
            }
            default: {
                const msg = MESSAGES.system_error;
                new Notification().open(msg).exit(msg);
            }
        }
    };
    const $table = getTableByType();
    $container.append($table);
};

function closeViewer() {
    const ei = els.id;
    const ecs = els.class;
    const $viewerContainer = getNode(ei.viewerContainer);
    $viewerContainer.removeClass(ecs.viewerContainer);
    setTimeout(() => $viewerContainer.addClass(ecs.hide), 500);
};

function copyToClipboard() {
    const ei = els.id;
    const etg = els.tag;
    const ecm = els.command;
    const viewType = screen_state.viewer;
    const data = screen_state.clipboard[viewType];
    const clipboard = document.createElement(etg.textarea);
    document.body.appendChild(clipboard);
    clipboard.value = data;
    clipboard.select();
    document.execCommand(ecm.copy);
    document.body.removeChild(clipboard);
    new Notification().complete().open(MESSAGES.success_copy);
};