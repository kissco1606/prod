function init() {
    const ei = els.id;
    const $import = getNode(ei.import);
    const $export = getNode(ei.export);
    const $save = getNode(ei.save);
    const $print = getNode(ei.print);
    const $settings = getNode(ei.settings);
    const $quill = getNode(ei.quill);
    const $viewerClose = getNode(ei.viewerClose);
    const $copy = getNode(ei.copy);
    $import.click(() => importAction());
    $export.click(() => exportAction());
    $save.click(() => saveAction());
    $print.click(() => openViewer());
    $settings.click(() => openSettings());
    $quill.click(() => openRegisterDialog());
    $viewerClose.click(() => closeViewer());
    $copy.click(() => copyToClipboard());
    setLocalData().then(() => initList());
    setTabsEvent();
    initScreen();

    const one = 86400000;

    const a = convertToSystemTime(2018, 6, 18, '09:00');
    const m = convertToSystemTime(2018, 6, 20, '13:53');
    const od = new Date(m);
    const oY = od.getFullYear();
    const oM = od.getMonth() + 1;
    const oD = od.getDate();
    const start = convertToSystemTime(oY, oM, oD, '12:00');
    const end = convertToSystemTime(oY, oM, oD, '13:00');
    const base_sub = Math.floor((m - a) / one) * BASIS.system_hours;
    let last_sub = 0;
    if (m > start && m < end) {
        last_sub = m - start;
    }
    else if (m >= end) {
        last_sub = BASIS.system_hours;
    }
    console.log(base_sub);
    console.log(last_sub);
    console.log(calculateDiffTime(a, m));
    console.log(calculateDiffTime(a, m, (base_sub + last_sub) * -1));
};

function initScreen() {
    const ei = els.id;
    const ecs = els.class;
    const $screen = getNode(ei.screenContainer);
    initTabs();
    setListHeader();
    $screen.addClass(ecs.screenView);
};

function initTabs() {
    const ei = els.id;
    const ecs = els.class;
    const $mainTabs = getNode(ei.tabsContainer);
    $mainTabs.parent(`.${ecs.materialTabBarContainer}`).addClass(ecs.hide);
};

function initSection(tabId) {
    document.getElementById(tabId).click();
};

function setTabsEvent() {
    const ei = els.id;
    const eat = els.attributes;
    const tabIds = [ei.listTab, ei.editorTab];
    const viewerTabIds = [ei.typeATab, ei.typeBTab];
    const typeKeys = [KEYS.typeA, KEYS.typeB];
    tabIds.forEach((id) => getNode(id).click(() => onTabsChange(id)));
    viewerTabIds.forEach((id, i) => getNode(id).click(() => screen_state.viewer = typeKeys[i]));
};

function onTabsChange(id) {
    const ei = els.id;
    switch (id) {
        case ei.listTab: {
            setListHeader();
            if (screen_state.spreadSheet) {
                screen_state.spreadSheet.destroy();
            }
            break;
        }
        case ei.editorTab: {
            setEditorHeader();
            break;
        }
    }
};

function initHeaderActions() {
    const ei = els.id;
    const ecs = els.class;
    const eic = els.icons;
    const $import = getNode(ei.import);
    const $export = getNode(ei.export);
    const $save = getNode(ei.save);
    const $print = getNode(ei.print);
    const $settings = getNode(ei.settings);
    switch (screen_state.tabType) {
        case ei.listTab: {
            $import.removeClass(ecs.hide);
            $save.addClass(ecs.hide);
            $print.addClass(ecs.hide);
            $settings.addClass(ecs.hide);
            break;
        }
        case ei.editorTab: {
            $import.addClass(ecs.hide);
            $save.removeClass(ecs.hide);
            $print.removeClass(ecs.hide);
            $settings.removeClass(ecs.hide);
            break;
        }
    };
};

function setListHeader() {
    const ei = els.id;
    const ecs = els.class;
    const eic = els.icons;
    const $headerIcon = getNode(ei.headerIconContainer);
    const $headerTitle = getNode(ei.headerTitle);
    const $icon = new MaterialItem().setLabel(eic.timeline).icon().item;
    $headerIcon.empty().append($icon);
    $headerIcon.removeClass(ecs.cursorPointer);
    $headerIcon.click(() => { });
    $headerTitle.text(CAPTIONS.headerTitle);
    screen_state.tabType = ei.listTab;
    initHeaderActions();
};

function setEditorHeader() {
    const ei = els.id;
    const ecs = els.class;
    const eic = els.icons;
    const param = screen_state.parameter;
    const $headerIcon = getNode(ei.headerIconContainer);
    const $headerTitle = getNode(ei.headerTitle);
    const $icon = new MaterialItem().setLabel(eic.arrow_back).icon().item;
    $headerIcon.empty().append($icon);
    $headerIcon.addClass(ecs.cursorPointer);
    $headerIcon.click(() => initSection(ei.listTab));
    $headerTitle.text(`${param.y}/${setDigitSize(2, param.m)}`);
    screen_state.tabType = ei.editorTab;
    initHeaderActions();
};

function setLocalData() {
    return new Promise((resolve, reject) => {
        const los = new Storage().local().setKey(KEYS.state);
        const data = jsonParse(los.decryptionGet());
        if (data) {
            state.data = $.extend(true, {}, data);
            return resolve();
        }
    });
};

function initList() {
    const list = $.extend(true, {}, state.data.calendar);
    createTableList(list);
};

function openRegisterDialog() {
    const dialog = new Dialog();
    dialog.setContent(CAPTIONS.calendarDownload, getCalendarSelector());
    dialog.open(registCalendarList);
};

function getCalendarSelector() {
    const cs = state.data.calendar;
    const eid = els.id;
    const ecs = els.class;
    const etg = els.tag;
    const eattr = els.attributes;
    const [startYear, endYear] = [2018, 2050];
    const years = getYearsArray(startYear, endYear).filter((y) => !cs[y] || Object.keys(cs[y]).length < CALENDAR.define.monthSize);
    const thisYear = new Date().getFullYear();
    const defaultYear = getDefaultCalendarValue(years, thisYear, (years.length - 1));
    const $container = getElement(etg.div);
    const $yearSelectContainer = getElement(etg.div, { class: ecs.selectContainer });
    const $yearSelect = getElement(etg.select, getSelectOption(eid.yearSelect));
    years.forEach((year) => {
        const $option = getElement(etg.option, { value: year }).text(year);
        if (year === defaultYear) {
            $option.attr({ selected: eattr.selected });
        }
        $yearSelect.append($option);
    });
    const $monthSelectContainer = getElement(etg.div, { class: ecs.selectContainer });
    $yearSelect.change((e) => initMonthSelector(e.target.value, $monthSelectContainer));
    $yearSelectContainer.append($yearSelect);
    $container.append($yearSelectContainer).append($monthSelectContainer);
    initMonthSelector(defaultYear, $monthSelectContainer);
    return $container;
};

function initMonthSelector(year, $monthSelectContainer) {
    $monthSelectContainer.empty();
    const cs = state.data.calendar;
    const eid = els.id;
    const ecs = els.class;
    const etg = els.tag;
    const eattr = els.attributes;
    const month = getMonthArray().filter((m) => !cs[year] || !cs[year][m]);
    const thisYear = new Date().getFullYear();
    const thisMonth = thisYear == year ? new Date().getMonth() + 1 : CALENDAR.define.monthStart;
    const defaultMonth = getDefaultCalendarValue(month, thisMonth, (month.length - 1));
    const $monthSelect = getElement(etg.select, getSelectOption(eid.monthSelect));
    month.forEach((mon) => {
        const $option = getElement(etg.option, { value: mon }).text(mon);
        if (mon === defaultMonth) {
            $option.attr({ selected: eattr.selected });
        }
        $monthSelect.append($option);
    });
    $monthSelectContainer.append($monthSelect);
};

function registCalendarList(closeDialog) {
    const eid = els.id;
    const year = getNode(eid.yearSelect).val();
    const month = getNode(eid.monthSelect).val();
    if (isVoid(year) || isVoid(month)) {
        new Notification().open(MESSAGES.invalid_access);
        return false;
    }
    const cs = createCalendarApi(year, month);
    const mapObj = getCalendarMap(cs);
    const ts = new Transaction().connect(state.data, mapObj.map);
    ts.update(mapObj.data).async().then(() => initList());
    closeDialog();
};