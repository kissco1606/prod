const Storage = function () {
    this.efs = ELEMENTS.func.storage;
    this.key = null;
    this.type = null;
};
Storage.prototype = {
    local: function () {
        this.type = this.efs.local;
        return this;
    },
    session: function () {
        this.type = this.efs.session;
        return this;
    },
    setKey: function (key) {
        this.key = key;
        return this;
    },
    get: function () {
        const w = window;
        const key = this.key;
        const type = this.type
        let data = null;
        if (type && key) {
            data = (type === this.efs.local ? w.localStorage : w.sessionStorage).getItem(key);
            data = jsonParse(data);
        }
        return data;
    },
    decryptionGet: function () {
        const w = window;
        const key = this.key;
        const type = this.type
        let data = null;
        if (type && key) {
            data = (type === this.efs.local ? w.localStorage : w.sessionStorage).getItem(key);
            data = jsonParse(decryptData(data));
        }
        return data;
    },
    set: function (data) {
        const w = window;
        const key = this.key;
        const type = this.type;
        const jsonData = JSON.stringify(data);
        if (type && key) {
            (type === this.efs.local ? w.localStorage : w.sessionStorage).setItem(key, jsonData);
        }
        return null;
    },
    encryptionSet: function (data) {
        const w = window;
        const key = this.key;
        const type = this.type;
        const jsonData = encryptData(JSON.stringify(data));
        if (type && key) {
            (type === this.efs.local ? w.localStorage : w.sessionStorage).setItem(key, jsonData);
        }
        return null;
    },
    remove: function () {
        const w = window;
        const key = this.key;
        const type = this.type;
        if (type && key) {
            (type === this.efs.local ? w.localStorage : w.sessionStorage).removeItem(key);
        }
        return null;
    },
    clear: function () {
        const w = window;
        const key = this.key;
        const type = this.type;
        if (type && key) {
            (type === this.efs.local ? w.localStorage : w.sessionStorage).clear();
        }
        return null;
    }
};

function getSerialNumber() {
    const seed = SERIAL.seed;
    const size = SERIAL.size;
    const seedLength = seed.length;
    let serialNumber = '';
    for (var i = 0; i < size; i++) {
        serialNumber += seed[Math.floor(Math.random() * seedLength)];
    }
    return serialNumber;
};

function encryptData(data) {
    let encryptedData = '';
    try {
        const serialNumber = getSerialNumber();
        encodedData = CryptoJS.enc.Utf8.parse(data);
        encryptedData = CryptoJS.AES.encrypt(data, serialNumber).toString();
        encryptedData = encryptedData + serialNumber;
    }
    catch (e) { }
    return encryptedData;
};

function decryptData(data) {
    let decodedData = '';
    try {
        if (data) {
            const size = SERIAL.size;
            const pos = data.length - size;
            const serialNumber = data.substr(pos);
            const trueData = data.substring(0, pos);
            decodedData = CryptoJS.AES.decrypt(trueData, serialNumber).toString(CryptoJS.enc.Utf8);
        }
    }
    catch (e) { }
    return decodedData;
};

function jsonParse(data) {
    let parsed = data;
    try {
        parsed = JSON.parse(data);
    }
    catch (e) { }
    return parsed;
};

function getDoc(name, option) {
    switch (option) {
        case els.types.id: {
            return document.getElementById(name);
        }
        case els.types.class: {
            return document.getElementsByClassName(name);
        }
        default: {
            return null;
        }
    }
};

function qs(name, option, doc = document) {
    switch (option) {
        case els.types.id: {
            return doc.querySelector(`#${name}`);
        }
        case els.types.class: {
            return doc.querySelector(`.${name}`);
        }
        default: {
            return doc.querySelector(name);
        }
    }
};

function getNode(id) {
    return id ? $(`#${id}`) : null;
};

function getElement(tagName, option) {
    return tagName ? $(`<${tagName} />`, option) : null;
};

function getYearsArray(start = 2000, end = 2100) {
    let year = start;
    const array = new Array();
    while (year <= end) {
        array.push(year);
        ++year;
    };
    return array;
};

function getMonthArray() {
    let month = 1;
    const end = CALENDAR.define.monthSize;
    const array = new Array();
    while (month <= end) {
        array.push(month);
        ++month;
    };
    return array;
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

function toUpperCase(str, position = 0) {
    if (!typeIs(position).number) return str.toUpperCase();
    return str.charAt(position).toUpperCase() + str.slice(position + 1);
};

function repetitive(char, size) {
    let setChar = '';
    for (let i = 0; i < size; i++) {
        setChar += setChar + char;
    }
    return setChar;
};

function isNotNumber(num) {
    return num == 'NaN' || num == 'NaN:NaN';
};

function setDigitSize(len, char, fillChar = SYNTAX.zeroString, fillPos = SYNTAX.left) {
    const strChar = String(char);
    const repetition = repetitive(fillChar, len);
    const getFilled = () => {
        let mergedChar = '';
        switch (fillPos) {
            case SYNTAX.left: {
                mergedChar = `${repetition}${strChar}`.slice(len * -1);
                break;
            }
            case SYNTAX.right: {
                mergedChar = `${strChar}${repetition}`.slice(0, len);
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

function setDigitSizeWithMinus(len, char, fillChar = SYNTAX.zeroString, fillPos = SYNTAX.left) {
    const strChar = String(char);
    const minusFlag = strChar.match(REG_EXP.minus) ? true : false;
    const minus = SYMBOL.minus;
    const passedChar = strChar.replace(REG_EXP.minus, '');
    return `${minusFlag ? minus : ''}${setDigitSize(len, passedChar, fillChar, fillPos)}`;
};

function getDateFormat(year, month, date) {
    return `${year}/${setDigitSize(2, month)}/${setDigitSize(2, date)}`;
};

function getDateTimeFormat(year, month, date, hours, minutes, sec = '00') {
    return `${year}/${setDigitSize(2, month)}/${setDigitSize(2, date)} ${setDigitSize(2, hours)}:${setDigitSize(2, minutes)}:${setDigitSize(2, sec)}`;
};

function getDateFormatFromSystemDate(systemDate) {
    const y = systemDate.getFullYear();
    const m = systemDate.getMonth() + 1;
    const d = systemDate.getDate();
    return `${y}/${setDigitSize(2, m)}/${setDigitSize(2, d)}`;
};

function convertToViewTime(infoYear, infoMonth, infoDate, systemTime) {
    if (!systemTime) return '';
    const d = new Date(systemTime);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    let h = d.getHours();
    const m = d.getMinutes();
    if (getDateFormat(year, month, date) !== getDateFormat(infoYear, infoMonth, infoDate)) {
        h = Number(h) + 24;
    };
    const viewTime = `${setDigitSize(2, h)}:${setDigitSize(2, m)}`;
    return isNotNumber(viewTime) ? '' : viewTime;
};

function convertToSystemTime(year, month, date, viewTime) {
    if (!viewTime) return '';
    let overTimeSum = 0;
    const vArry = viewTime.split(SYMBOL.map);
    let h = Number(vArry[0]);
    const m = vArry[1];
    const remainder = h % 24;
    if (h >= 24) {
        overTimeSum = 1;
        h = remainder;
    }
    const ymd = getDateFormat(year, month, date);
    const d = new Date(ymd);
    d.setDate(d.getDate() + overTimeSum);
    const nYmd = getDateFormatFromSystemDate(d);
    const nViewTime = `${setDigitSize(2, h)}:${setDigitSize(2, m)}`;
    const time = `${nViewTime}:00`;
    const fullDateTime = `${nYmd} ${time}`;
    const systemTime = new Date(fullDateTime).getTime();
    return systemTime;
};

function calculateDiffTime(inTime, outTime, optional = 0) {
    if (!typeIs(inTime).number || !typeIs(outTime).number) {
        return null;
    }
    const i = new Date(inTime);
    const o = new Date(outTime);
    const diff = (o.getTime() - i.getTime()) + optional;
    const hDiv = BASIS.hours_divider;
    const mDiv = BASIS.minutes_divider;
    const diffHours = parseInt(diff / hDiv);
    const diffMinutes = parseInt((diff % hDiv) / mDiv);
    const result = `${setDigitSizeWithMinus(2, diffHours)}:${setDigitSize(2, diffMinutes)}`;
    return result;
};

function sumTimeArray(timeArray) {
    const hoursStack = new Array();
    const minutesStack = new Array();
    timeArray.forEach((time) => {
        if (time.match(REG_EXP.customTime)) {
            const t = time.split(SYMBOL.map);
            hoursStack.push(parseInt(t[0]));
            minutesStack.push(parseInt(t[1]));
        }
    });
    if (isVoid(hoursStack) || isVoid(minutesStack)) return '';
    const sumH = hoursStack.reduce((pre, curr) => pre + curr);
    const sumM = minutesStack.reduce((pre, curr) => pre + curr);
    const totalH = sumH + Math.floor(sumM / 60);
    const totalM = sumM % 60;
    return `${setDigitSize(2, totalH)}:${setDigitSize(2, totalM)}`;
};

function getCustomizedTime(time, optional = 0) {
    if (!time) return null;
    return time + (optional * BASIS.system_minutes);
};

const ROUND_TIME = function (viewTime) {
    this.viewTime = viewTime;
    this.criteria = BASIS.criteriaDef;
    this.type = so.roundType.round;
};
ROUND_TIME.prototype = {
    setCriteria: function (criteria) {
        this.criteria = criteria;
        return this;
    },
    setType: function (type) {
        this.type = type;
        return this;
    },
    get: function () {
        if (!this.viewTime) return '';
        const timeArray = this.viewTime.split(SYMBOL.map);
        const hours = Number(timeArray[0]);
        const minutes = Number(timeArray[1]);
        const criteria = this.criteria;
        const roundType = so.roundType;
        let roundedMin = minutes;
        let roundedHours = hours;
        switch (this.type) {
            case roundType.round: {
                roundedMin = criteria * Math.round(minutes / criteria);
                if (roundedMin >= 60) {
                    roundedMin = 0;
                    roundedHours += 1;
                }
                break;
            }
            case roundType.roundUp: {
                roundedMin = criteria * Math.ceil(minutes / criteria);
                if (roundedMin >= 60) {
                    roundedMin = 0;
                    roundedHours += 1;
                }
                break;
            }
            case roundType.roundDown: {
                roundedMin = criteria * Math.floor(minutes / criteria);
                if (roundedMin >= 60) {
                    roundedMin = 0;
                    roundedHours += 1;
                }
                break;
            }
            default: {
                return viewTime;
            }
        }
        return `${setDigitSize(2, roundedHours)}:${setDigitSize(2, roundedMin)}`;
    }
};

function getSelectOption(id) {
    return { class: ecs.calendarSelect, id: id };
};

function getDefaultCalendarValue(array, thisValue, size) {
    const end = array[array.length - 1];
    const getValue = (index) => {
        const value = array[index];
        ++index;
        return value;
    };
    let defaultValue = thisValue;
    let [count, index] = [0, 0];
    while (count <= size) {
        let d = thisValue + count;
        d = d <= end ? d : getValue(index);
        if (array.indexOf(d) >= 0) {
            defaultValue = d;
            break;
        }
        ++count;
    }
    return defaultValue;
};

function createCalendarApi(year, month) {
    const getHoliday = (date, lieuDay = true) => {
        const holidayData = JapaneseHolidays.isHoliday(date, lieuDay);
        const holidayObj = {
            holidayName: isVoid(holidayData) ? '' : holidayData,
            isHoliday: isVoid(holidayData) ? false : true
        };
        return holidayObj;
    };
    const getDay = (date) => {
        const index = date.getDay();
        const dayData = CALENDAR.days[index];
        const dayObj = {
            index: index,
            name_en: dayData.en,
            name_jp: dayData.jp
        };
        return dayObj;
    };
    const calendarState = {
        [year]: {
            [month]: {
                date: new Object(),
                option: STRUCTURE.option
            }
        }
    };
    const dateStart = 1;
    const dateEnd = new Date(year, month, 0).getDate();
    let date = dateStart;
    while (date <= dateEnd) {
        const thisDate = new Date(getDateFormat(year, month, date));
        const dayDefine = getDay(thisDate);
        const holidayDefine = getHoliday(thisDate, true);
        const isWeekend = dayDefine.index === 0 || dayDefine.index === 6;
        const isHoliday = holidayDefine.isHoliday;
        calendarState[year][month].date[date] = {
            dayIndex: dayDefine.index,
            dayName_en: dayDefine.name_en,
            dayName_jp: dayDefine.name_jp,
            isWeekend: isWeekend,
            isHoliday: isHoliday,
            holidayName: holidayDefine.holidayName,
            workInfo: STRUCTURE.workInfo
        }
        ++date;
    }
    return calendarState;
};

function getProperty(obj, map) {
    const fromObj = Immutable.fromJS(obj).getIn(map);
    const toObj = fromObj.toJS();
    return toObj;
};

function typeIs(data) {
    const typeObject = new Object;
    const typeString = Object.prototype.toString.call(data).slice(8, -1);
    Object.keys(TYPES).forEach((key) => typeObject[key] = (TYPES[key] === typeString));
    return typeObject;
};

function addEvent($item, eventObj) {
    const type = eventObj.type;
    const func = eventObj.func;
    const param = eventObj.param;
    $item.on(type, (e) => func(e, param));
};

function getCustomTextField(formId, option, value = '') {
    const eid = els.id;
    const ecs = els.class;
    const etg = els.tag;
    const $input = getElement(etg.input);
    if (option) $input.attr(option);
    $input.attr({ type: 'text', id: formId });
    $input.addClass(ecs.customTextField);
    $input.val(value);
    return $input;
};

function getDividerItem() {
    const etg = els.tag;
    const $divider = getElement(etg.hr);
    return $divider;
};

const MaterialItem = function () {
    this.option = null;
    this.label = null;
    this.item = null;
};
MaterialItem.prototype = {
    setOption: function (option) {
        this.option = option;
        return this;
    },
    setLabel: function (label) {
        this.label = label;
        return this;
    },
    setEvent: function (eventObj) {
        if (!this.item) return null;
        this.item.on(eventObj.type, (e) => eventObj.func(e, eventObj.param));
        return this;
    },
    icon: function () {
        const ecs = els.class;
        const etg = els.tag;
        const $item = getElement(etg.i);
        if (this.option) $item.attr(this.option);
        if (this.label) $item.text(this.label);
        $item.addClass(ecs.materialIcons);
        this.item = $item;
        return this;
    },
    button: function () {
        const ecs = els.class;
        const etg = els.tag;
        const $item = getElement(etg.button);
        if (this.option) $item.attr(this.option);
        if (this.label) $item.text(this.label);
        $item.addClass(ecs.materialButton);
        this.item = $item;
        return this;
    },
    iconButton: function (iconName, iconOption) {
        const ecs = els.class;
        const etg = els.tag;
        const $item = getElement(etg.div);
        if (this.option) $item.attr(this.option);
        if (this.label) $item.text(this.label);
        $item.addClass(getClasses(ecs.materialButton, ecs.iconButton, ecs.rippleEffect));
        const $icon = new MaterialItem().setOption(iconOption).setLabel(iconName).icon().item;
        $item.append($icon);
        this.item = $item;
        return this;
    },
    tooltip: function (forId) {
        const ecs = els.class;
        const etg = els.tag;
        const $item = getElement(etg.div);
        if (this.option) $item.attr(this.option);
        if (this.label) $item.text(this.label);
        $item.addClass(getClasses(ecs.tooltip));
        $item.attr({ for: forId });
        this.item = $item;
        return this;
    },
    radioButton: function (name, forId, defaultValue = '', isChecked = false) {
        const ecs = els.class;
        const etg = els.tag;
        const etp = els.types;
        const $item = getElement(etg.label);
        if (this.option) $item.attr(this.option);
        $item.attr({ for: forId });
        $item.addClass(getClasses(ecs.materialRadio, ecs.rippleEffect));
        const inputOption = {
            type: etp.radio,
            class: getClasses(ecs.materialRadioButton),
            id: forId,
            name: name,
            value: defaultValue,
            checked: isChecked
        };
        const $input = getElement(etg.input, inputOption);
        const $span = getElement(etg.span, { class: getClasses(ecs.materialRadioLabel) });
        if (this.label) $span.text(this.label);
        [$input, $span].forEach((item) => $item.append(item));
        componentHandler.upgradeElement($item[0]);
        this.item = $item;
        return this;
    },
    checkbox: function (forId, isChecked = false) {
        const ecs = els.class;
        const etg = els.tag;
        const etp = els.types;
        const $item = getElement(etg.label);
        if (this.option) $item.attr(this.option);
        $item.attr({ for: forId });
        $item.addClass(getClasses(ecs.materialCheckbox, ecs.rippleEffect));
        const inputOption = {
            type: etp.checkbox,
            class: getClasses(ecs.materialCheckboxInput),
            id: forId,
            checked: isChecked
        };
        const $input = getElement(etg.input, inputOption);
        const $span = getElement(etg.span, { class: getClasses(ecs.materialCheckboxLabel) });
        if (this.label) $span.text(this.label);
        [$input, $span].forEach((item) => $item.append(item));
        componentHandler.upgradeElement($item[0]);
        this.item = $item;
        return this;
    },
    textField: function (forId, defaultValue = '', isFloating = true) {
        const ecs = els.class;
        const etg = els.tag;
        const etp = els.types;
        const $item = getElement(etg.div);
        const $div = getElement(etg.div);
        if (this.option) $div.attr(this.option);
        $div.attr({ for: forId });
        $div.addClass(getClasses(ecs.materialTextField, isFloating ? ecs.materialFloatingLabel : ''));
        const inputOption = {
            type: etp.text,
            class: getClasses(ecs.materialTextFieldInput),
            id: forId,
            value: defaultValue
        };
        const $input = getElement(etg.input, inputOption);
        const $label = getElement(etg.label, { class: getClasses(ecs.materialTextFieldLabel) });
        if (this.label) $label.text(this.label);
        [$input, $label].forEach((item) => $div.append(item));
        componentHandler.upgradeElement($div[0]);
        $item.append($div);
        this.item = $item;
        return this;
    }
};

const Transaction = function () {
    this.fromState = null;
    this.state = null;
    this.map = null;
};
Transaction.prototype = {
    connect: function (state, map) {
        if (state) {
            this.fromState = state;
            this.state = Immutable.fromJS(state);
        }
        if (map) this.map = map;
        return this;
    },
    select: function () {
        if (!this.fromState || !this.map) return null;
        return Immutable.fromJS(this.fromState).getIn(this.map).toJS();
    },
    update: function (data) {
        if (!this.fromState || !this.state || !this.map) return null;
        const updated = this.state.updateIn(this.map, (item) => item.merge(data));
        this.fromState = updated.toJS();
        state.data = this.fromState;
        return this;
    },
    delete: function () {
        if (!this.fromState || !this.state || !this.map) return null;
        const updated = this.state.deleteIn(this.map);
        const rootMap = td.map.calendar;
        const filtered = updated.setIn(rootMap, updated.getIn(rootMap).filter((item, key) => item.size >= 1));
        this.fromState = filtered.toJS();
        state.data = this.fromState;
        return this;
    },
    async: function () {
        return new Promise((resolve, reject) => {
            const los = new Storage().local().setKey(KEYS.state);
            los.encryptionSet(state.data);
            return resolve();
        });
    }
};

function getCalendarMap(obj) {
    const mapObj = new Object();
    const cloneObj = $.extend(true, {}, obj);
    const key = Object.getOwnPropertyNames(cloneObj)[0];
    const exists = state.data[KEYS.calendar][key];
    const map = td.map.calendar.concat();
    mapObj.data = cloneObj;
    if (exists) {
        mapObj.data = cloneObj[key];
        map.push(key);
    }
    mapObj.map = map;
    return mapObj;
};

function getClasses() {
    const classes = new Array();
    const argumentsList = Array.prototype.slice.call(arguments);
    argumentsList.forEach((item) => {
        classes.push(item);
    });
    const size = classes.length;
    return size >= 1 ? classes.join(SYMBOL.whiteSpace) : '';
};

function createTableList(list) {
    const ei = els.id;
    const ecs = els.class;
    const etg = els.tag;
    const eic = els.icons;
    const evt = els.event;
    const $calendarList = getNode(ei.calendarList);
    const collection = Object.keys(list);
    if (collection.length >= 1) {
        $calendarList.empty();
        collection.forEach((key) => {
            const monthData = list[key];
            const monthCollection = Object.keys(monthData);
            monthCollection.forEach((mKey) => {
                const rowName = `${key}/${setDigitSize(2, mKey)}`;
                const $row = getElement(etg.tr);
                const $nameCol = getElement(etg.td, { class: ecs.tableCellNonNumeric });
                const $actionCol = getElement(etg.td, { class: getClasses(ecs.textCenter, ecs.width100) });
                $nameCol.text(rowName);
                const eventObj = {
                    type: evt.click,
                    func: onDelete,
                    param: { y: key, m: mKey }
                };
                const $deleteIconButton = new MaterialItem().iconButton(eic.remove_outline, { class: ecs.deleteIconButton }).setEvent(eventObj).item;
                $actionCol.html($deleteIconButton);
                $row.append($nameCol).append($actionCol);
                $row.click(() => openEditor(eventObj.param));
                $calendarList.prepend($row);
            });
        });
    }
    else {
        $calendarList.empty();
        const $row = getElement(etg.tr, { id: ei.listNothing });
        const $col = getElement(etg.td, { colspan: '2', class: ecs.textCenter }).text(CAPTIONS.nothing);
        $calendarList.append($row.append($col));
    }
};

function getDayDefines(data, key) {
    const d = data[key];
    const defineObj = {
        dateId: key,
        name: d.dayName_en,
        name_jp: d.dayName_jp,
        isWeekday: !d.isHoliday && !d.isWeekend,
        isHoliday: d.isHoliday,
        isSunday: d.isWeekend && d.dayIndex === 0,
        isSaturday: d.isWeekend && d.dayIndex === 6
    };
    return defineObj;
};

function getWorkList(date, info) {
    const param = screen_state.parameter;
    const workList = new Array();
    const typeA = info.typeA;
    const typeB = info.typeB;
    [typeA, typeB].forEach((item) => {
        Object.keys(item).forEach((key) => {
            const systemTime = item[key];
            const viewTime = systemTime ? convertToViewTime(param.y, param.m, date, systemTime) : null;
            workList.push(viewTime);
        });
    });
    return workList;
};

function getLabelClass(d) {
    if (d.isHoliday || d.isSunday) {
        return ecs.redColor;
    }
    else if (d.isSaturday) {
        return ecs.blueColor;
    }
    return '';
};

function getRowsData(data) {
    const etg = els.tag;
    const ecs = els.class;
    const rowsData = new Object();
    const rowHeaders = new Array();
    const sheetData = new Array();

    Object.keys(data).forEach((key) => {
        const dateObj = getDayDefines(data, key);
        const name = `${setDigitSize(2, dateObj.dateId)}(${dateObj.name})`;
        const classNames = getClasses(getLabelClass(dateObj));
        const $label = getElement(etg.label, { class: classNames }).text(name);
        rowHeaders.push($label[0].outerHTML);
        const workList = getWorkList(key, data[key].workInfo);
        sheetData.push(workList);
    });
    rowsData.rowHeaders = rowHeaders;
    rowsData.sheetData = sheetData;
    return rowsData;
};

function getColHeaders() {
    const etg = els.tag;
    const ecs = els.class;
    const colHeaders = new Array();
    CAPTIONS.editorColumns.forEach((item, i) => {
        const classNames = i <= 1 ? ecs.typeAColumn : ecs.typeBColumn;
        const $label = getElement(etg.label, { class: classNames }).text(item);
        colHeaders.push($label[0].outerHTML);
    });
    return colHeaders;
};

function applyClass(elem, classNames) {
    if (!Handsontable.dom.hasClass(elem, className)) {
        Handsontable.dom.addClass(elem, className);
    }
};

function getSpreadSettings(cols, rows, rowHeaders, colHeaders, sheetData) {
    const ecs = els.class;
    const settings = {
        startCols: cols,
        startRows: rows,
        maxCols: cols,
        maxRows: rows,
        rowHeaders: rowHeaders,
        colHeaders: colHeaders,
        stretchH: 'all',
        contextMenu: false,
        renderAllRows: false,
        autoWrapRow: true,
        columnSorting: false,
        sortIndicator: false,
        manualColumnMove: false,
        manualColumnResize: false,
        afterGetRowHeader: function (col, TH) {
            TH.className = ecs.textLeft;
        },
        data: sheetData
    };
    return settings;
};

const SpreadSheet = function () {
    this.workbook = null;
    this.gridDoc = null;
};
SpreadSheet.prototype = {
    setGrid: function (gridId) {
        this.gridDoc = document.querySelector(`#${gridId}`);
        return this;
    },
    create: function (data) {
        return new Promise((resolve, reject) => {
            const dateData = data.date;
            const cols = sd.colSize;
            const rows = Object.keys(dateData).length;
            const rowsData = getRowsData(dateData);
            const rowHeaders = rowsData.rowHeaders;
            const colHeaders = getColHeaders();
            const sheetData = rowsData.sheetData;
            const spreadSettings = getSpreadSettings(cols, rows, rowHeaders, colHeaders, sheetData);
            this.workbook = new Handsontable(this.gridDoc, spreadSettings);
            return resolve();
        });
    },
    destroy: function () {
        if (this.workbook) {
            this.workbook.destroy();
            this.workbook = void 0;
        }
    },
    get: function () {
        return this;
    }
};

function getCheckedValueByDOM(id) {
    return document.getElementById(id).checked;
};

function getCheckedValueById(id) {
    return $(`input[id=${id}]:checked`).val();
};

function getCheckedValueByName(name) {
    return $(`input[name=${name}]:checked`).val();
};

function lockAction() {
    screen_state.allowedAction = false;
};

function unlockAction(timer = 1000) {
    setTimeout(() => screen_state.allowedAction = true, timer);
};
