const CommonModule = function() {
    this.Define = {
        ELEMENTS: {
            id: {
                commonHeader: "common-header",
                commonContents: "common-contents",
                commonMenuContainer: "common-menu-container",
                headerToolsConfigIcon: "header-tools-config-icon",
                applicationPage: "application-page",
                fileTreeCard: "file-tree-card",
                fileTreePath: "file-tree-path",
                systemDateEditor: "system-date-editor",
                dateTargetPath: "date-target-path",
                dateInput: "date-input",
                path: "path",
                clipboardLinkerCard: "clipboard-linker-card",
                clipboardLinkerCopyList: "clipboard-linker-copy-list",
                clipboardLinkerSelectArea: "clipboard-linker-select-area",
                folderGeneratorCard: "folder-generator-card",
                folderGeneratorPath: "folder-generator-path",
                copyFileCard: "copy-file-card",
                copyFileSourcePath: "copy-file-source-path",
                copyFileDestinationPath: "copy-file-destination-path"
            },
            class: {
                contentsContainer: "contents-container",
                commandArea: "command-area",
                actionArea: "action-area"
            },
            style: {
                backgroundColor: "#333",
                headerHeight: "50px",
                transitionDuration: 200
            }
        },
        CAPTIONS: {
            title: "Common Tools",
            fileTree: "File Tree",
            exec: "exec",
            clear: "clear",
            download: "download",
            path: "path",
            targetPath: "Target Path",
            systemDateEditor: "System Date Editor",
            systemDate: "System Date",
            calendar: "calendar",
            systemDatePathList: "SysDate Path List",
            edit: "edit",
            add: "add",
            read: "read",
            name: "name",
            clipboardLinker: "Clipboard Linker",
            copy: "copy",
            copyList: "Copy List",
            set: "set",
            select: "select",
            separatorType: "Separator Type",
            folderGenerator: "Folder Generator",
            copyFile: "Copy File",
            sourcePath: "Source Path",
            destinationPath: "Destination Path",
            mode: "mode",
            file: "file",
            folder: "folder",
            overwrite: "overwrite"
        },
        TYPES: {
            page: {
                application: "application"
            },
            path: {
                fileTreeWorker: "module/common/actions/fileTree.js"
            },
            phase: {
                clipboardLinker: {
                    init: "init",
                    set: "set"
                }
            },
            copyFile: {
                mode: {
                    file: "file",
                    folder: "folder"
                }
            }
        },
        MESSAGES: {
            invalid_format: "Invalid format",
            already_exits_name: "Already exists name",
            systemdate_modified_complete: "System date modified successfully",
            create_folder_complete: "Folder created successfully",
            each_source_destination: "Destination Path are different from Source Path",
            copy_file_complete: "Files are copied successfully"
        }
    };
    this.state = {
        clipboardLinker: {
            define: {
                separatorTypeRadio: {
                    name: "clipboard-linker__separator-type-radiobox",
                    type: {
                        lineBreak: {
                            label: "Line Break",
                            id: "clipboard-linker__separator-type-lineBreak",
                            value: SIGN.crlf
                        },
                        commaLineBreak: {
                            label: "Comma + Line Break",
                            id: "clipboard-linker__separator-type-commaLineBreak",
                            value: concatString(SIGN.c, SIGN.crlf)
                        }
                    }
                }
            },
            injector: { commandArea: new Array() }
        },
        copyFile: {
            define: {
                modeRadio: {
                    name: "copy-file__mode-radiobox",
                    type: {
                        file: {
                            label: upperCase(this.Define.CAPTIONS.file, 0),
                            id: "copy-file__mode-file",
                            value: this.Define.TYPES.copyFile.mode.file
                        },
                        folder: {
                            label: upperCase(this.Define.CAPTIONS.folder, 0),
                            id: "copy-file__mode-folder",
                            value: this.Define.TYPES.copyFile.mode.folder
                        }
                    }
                },
                overwriteRadio: {
                    name: "copy-file__overwrite-radiobox",
                    type: {
                        typeTrue: {
                            label: "True",
                            id: "copy-file__overwrite-true",
                            value: true
                        },
                        typeFalse: {
                            label: "False",
                            id: "copy-file__overwrite-false",
                            value: false
                        }
                    }
                }
            }
        }
    };
};
CommonModule.prototype = {
    initCommonModule: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seStyle = _this.Define.ELEMENTS.style;
        const captions = _this.Define.CAPTIONS;
        const $container = jqById(eId.container);
        $container.css({ "margin-top": seStyle.headerHeight, "background-color": seStyle.backgroundColor });
        const $header = jqNode("header", { id: getHeaderId() });
        const $contents = jqNode("div", { id: getContentsId() });
        const $headerTitle = jqNode("div", { id: eId.headerTitle });
        const $titleIcon = jqNode("i", { class: eIcon.atom });
        const $titleIconSpan = jqNode("span", { id: eId.titleIcon }).append($titleIcon);
        const $titleTextSpan = jqNode("span", { id: eId.titleText }).text(captions.title);
        $headerTitle.append($titleIconSpan).append($titleTextSpan);
        const $headerTools = jqNode("div", { id: eId.headerTools });
        const $ellipsisVIconSpan = jqNode("span", { class: classes(eClass.toolsIcon, eClass.iconButton) }).append(jqNode("i", { class: eIcon.ellipsisV }));
        $ellipsisVIconSpan.click(function(e) {
            e.stopPropagation();
            _this.openMenu();
        });
        [$ellipsisVIconSpan].forEach(function(item) { $headerTools.append(item); });
        const $menuContainer = jqNode("div", { id: seId.commonMenuContainer, class: eClass.menuContainer });
        [$headerTitle, $headerTools, $menuContainer].forEach(function(item) { $header.append(item); });
        const $screen = jqNode("div", { id: seId.applicationPage, class: eClass.screen });
        $contents.append($screen);
        [$header, $contents].forEach(function(item) { $container.append(item) });

        const titleIconSize = $titleIcon.width();
        const headerToolsSize = $headerTools.width();
        jqById(eId.titleIcon).css({ width: (Math.ceil(titleIconSize) + 2) + "px" });
        jqById(eId.headerTitle).css({ width: "calc(100% - " + Math.ceil(headerToolsSize) + "px)" });
        _this.setPage();
        fadeIn($container);
        return this;
    },
    openMenu: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const $container = jqById(eId.container);
        const $menuContainer = jqById(seId.commonMenuContainer);
        $container.click(function() { $menuContainer.removeClass(eClass.isVisible); });
        $menuContainer.empty();
        const $menu = jqNode("ul", { class: classes(eClass.menu, eClass.menuBottomRight) });
        const itemList = new Array();
        createMenuItem(itemList, eIcon.home, CAPTIONS.home, transitionMenu);
        itemList.forEach(function(item) { $menu.append(item); });
        $menuContainer.append($menu);
        setTimeout(function() { $menuContainer.addClass(eClass.isVisible); });
        return null;
    },
    setPage: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const $contents = jqById(getContentsId());
        $contents.empty();
        const $screen = jqNode("div", { id: seId.applicationPage, class: eClass.screen });
        const $cardContainer = jqNode("div", { class: eClass.cardContainer });
        const cardList = [
            {
                id: seId.fileTreeCard,
                title: captions.fileTree,
                contents: _this.buildFileTree()
            },
            {
                id: seId.systemDateEditor,
                title: captions.systemDateEditor,
                contents: _this.buildSystemDateEditor()
            },
            {
                id: seId.clipboardLinkerCard,
                title: captions.clipboardLinker,
                contents: _this.buildClipboardLinker()
            },
            {
                id: seId.folderGeneratorCard,
                title: captions.folderGenerator,
                contents: _this.buildFolderGenerator()
            },
            {
                id: seId.copyFileCard,
                title: captions.copyFile,
                contents: _this.buildCopyFile()
            }
        ];
        cardList.forEach(function(item) {
            $cardContainer.append(buildCard(item));
        });
        $screen.append($cardContainer);
        $contents.append($screen);
        return null;
    },
    createInfoObject: function(value, name) {
        return {
            value: value,
            name: name
        };
    },
    buildFileTree: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const eb = new ElementBuilder();
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $downloadButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.download));
        $container.append(eb.listAppend($actionArea, [$downloadButton]));
        const itemList = [
            {
                label: captions.targetPath,
                inputType: "input",
                inputId: seId.fileTreePath
            }
        ];
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
        });
        $downloadButton.click(function() {
            _this.downloadFileTree();
        });
        return $container;
    },
    downloadFileTree: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const loading = new Loading();
        loading.on().then(function() {
            const targetPath = _this.createInfoObject(jqById(seId.fileTreePath).val(), captions.targetPath);
            const v = new Validation();
            const vTypes = v.getTypes();
            const fileTreePathLayout = v.getLayout(v.initLayout(targetPath.value, targetPath.name), [vTypes.required]);
            v.reset().append(fileTreePathLayout);
            const result = v.exec();
            if(result.error) {
                throw new Error(result.message);
            }
            const fileTree = new FileTree(targetPath.value).build();
            const worker = new Worker(types.path.fileTreeWorker);
            worker.onmessage = function(e) {
                const fileTreeData = e.data;
                const fileName = concatString("FileTree_", fileTree.target, "_", getFileStamp(), TYPES.file.extension.csv);
                saveAsFile(fileTreeData, TYPES.file.mime.CSV, fileName);
                loading.off();
            };
            worker.onerror = function(e) {
                new Notification().error().open(e.message);
                loading.off();
            };
            worker.postMessage(fileTree);
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    buildSystemDateEditor: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const eb = new ElementBuilder();
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $loadButton = jqNode("button", { class: eClass.flatButton }).append(eb.getFontAwesomeIcon(eIcon.listAlt));
        const $calendarButton = jqNode("button", { class: eClass.flatButton }).append(eb.getFontAwesomeIcon(eIcon.calendar));
        const $execButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.exec));
        const $readButton = jqNode("button", { class: eClass.buttonColorOrange }).text(upperCase(captions.read));
        const $clearButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.clear));
        $container.append(eb.listAppend($actionArea, [$loadButton, $calendarButton, $readButton, $execButton, $clearButton]));
        const itemList = [
            {
                label: captions.targetPath,
                inputType: "input",
                inputId: seId.dateTargetPath,
                placeholder: null,
                injectId: seId.path
            },
            {
                label: captions.systemDate,
                inputType: "input",
                inputId: seId.dateInput,
                placeholder: "YYYY/MM/DD",
                injectId: null
            }
        ];
        const injector = new Object();
        const elementStack = new Array();
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            if(item.placeholder) $input.attr({ placeholder: item.placeholder });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
            if(item.injectId) injector[item.injectId] = $input;
            elementStack.push($input);
        });
        $loadButton.click(function() {
            _this.openSystemDateTemplate(injector);
        });
        $calendarButton.click(function() { _this.openCalendarApi(); });
        $execButton.click(function() { _this.editSystemDate(); });
        $readButton.click(function() { _this.readSystemDate(); })
        $clearButton.click(function() {
            elementStack.forEach(function(item) { item.val(SIGN.none); });
        });
        return $container;
    },
    dateFormatValidate: function(dateString) {
        const calendar = new Calendar();
        const def = calendar.def;
        const mode = def.mode;
        const fullDateFormat = new RegExp("^((19|20|21)[0-9]{2})\/((0[1-9])|(1[0-2]))\/((0[1-9])|([1-2][0-9])|([3][0-1]))$", "g");
        const yearMonthForamt = new RegExp("^((19|20|21)[0-9]{2})\/((0[1-9])|(1[0-2]))(\/)?$", "g");
        const yearFormat = new RegExp("^((19|20|21)[0-9]{2})(\/)?$", "g");
        if(fullDateFormat.test(dateString)) {
            return mode.ymd;
        }
        else if(yearMonthForamt.test(dateString)) {
            return mode.ym;
        }
        else if(yearFormat.test(dateString)) {
            return mode.y;
        }
        else {
            return null;
        }
    },
    openCalendarApi: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const calendar = new Calendar();
        const mode = calendar.def.mode;
        const $dateInput = jqById(seId.dateInput);
        const value = $dateInput.val();
        const valueArray = value.split(SIGN.ssh);
        const title = upperCase(captions.calendar, 0);
        const today = getToday();
        const validate = _this.dateFormatValidate(value);
        const dateObj = { y: SIGN.none, m: SIGN.none, d: SIGN.none };
        switch(validate) {
            case mode.y: {
                dateObj.y = valueArray[0];
                dateObj.m = "01";
                dateObj.d = "01";
                break;
            }
            case mode.ym: {
                dateObj.y = valueArray[0];
                dateObj.m = valueArray[1];
                dateObj.d = "01";
                break;
            }
            case mode.ymd: {
                dateObj.y = valueArray[0];
                dateObj.m = valueArray[1];
                dateObj.d = valueArray[2];
                break;
            }
            default: {
                dateObj.y = today.year;
                dateObj.m = today.month;
                dateObj.d = today.date;
                break;
            }
        }
        calendar.setMode(validate).initDateObj(dateObj);
        const subDialog = new SubDialog();
        const buildContents = function() {
            const callback = function(dateStamp) {
                $dateInput.val(dateStamp);
                subDialog.close();
            };
            const $contents = calendar.setCallback(callback).build().getContents();
            return $contents;
        };
        subDialog.setContents(title, buildContents()).disableOkButton().open();
        return null;
    },
    openSystemDateTemplate: function(elementInjector) {
        const store = new Store(storage);
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const messages = _this.Define.MESSAGES;
        const title = captions.systemDatePathList;
        const sSystemDatePathList = STRUCTURE.systemDatePathList;
        const eb = new ElementBuilder();
        const itf = new Interface(sSystemDatePathList).setRoot(store.init());
        const dialog = new Dialog();
        const $container = jqNode("div", { id: eId.interfaceListContainer });
        const buildContents = function() {
            const dSL = store.init()[itf.getKey()];
            const apply = function(info) {
                Object.keys(elementInjector).forEach(function(key) {
                    const data = info[key];
                    if(key === seId.path) {
                        const filePath = new FileSystem(data).toFilePath().getPath();
                        elementInjector[key].val(filePath);
                    }
                    else {
                        elementInjector[key].val(data);
                    }
                });
                dialog.close();
            };
            const edit = function(info) {
                openSystemDatePathListEditor(info);
            };
            const remove = function(info) {
                const callback = function(warningClose) {
                    store.connect([itf.getKey(), info.name]).delete().apply();
                    buildContents();
                    store.sync();
                    warningClose();
                };
                new Notification().warning(callback).open(MESSAGES.warning_remove_record);
            };
            if(!isVoid(dSL)) {
                const $ul = jqNode("ul");
                getObjectOrderList(dSL).forEach(function(key) {
                    const info = dSL[key];
                    const $li = jqNode("li");
                    $li.click(function(e) {
                        e.stopPropagation();
                        apply(info);
                    });
                    const $viewArea = jqNode("div", { class: eClass.viewArea });
                    const $viewTable = jqNode("table");
                    const $colgroup = jqNode("colgroup");
                    const $viewHeader = jqNode("thead");
                    const $viewBody = jqNode("tbody");
                    const $nameRow = jqNode("tr");
                    const $nameCell = jqNode("th", { colspan: "3" }).text(info.name);
                    $nameRow.append($nameCell).appendTo($viewHeader);
                    const colgroupSizeStack = [100, 10, null];
                    colgroupSizeStack.forEach(function(size) {
                        $col = jqNode("col");
                        if(size) $col.attr({ width: size });
                        $colgroup.append($col);
                    });
                    const infoObj = {
                        0: { label: upperCase(captions.path, 0) }
                    };
                    [info.path].forEach(function(item, i) {
                        const label = infoObj[i].label;
                        const $infoRow = jqNode("tr");
                        const $labelCell = jqNode("td").text(upperCase(label));
                        const $middleCell = jqNode("td").text(SIGN.gc);
                        if(i === 0) item = new FileSystem(item).toFilePath().getPath();
                        const $valueCell = jqNode("td").text(item);
                        eb.listAppend($infoRow, [$labelCell, $middleCell, $valueCell]);
                        $viewBody.append($infoRow);
                    });
                    eb.listAppend($viewTable, [$colgroup, $viewHeader, $viewBody]);
                    $viewArea.append($viewTable);
                    const $actionArea = jqNode("div", { class: eClass.actionArea });
                    const $editIcon = eb.getFontAwesomeIcon(eIcon.edit);
                    const $removeIcon = eb.getFontAwesomeIcon(eIcon.trash);
                    const $actionTable = jqNode("table");
                    const $actionBody = jqNode("tbody");
                    [$editIcon, $removeIcon].forEach(function(item, i) {
                        const $row = jqNode("tr");
                        const $cell = jqNode("td").append(item);
                        $row.append($cell).appendTo($actionBody);
                        $cell.click(function(e) {
                            e.stopPropagation();
                            switch(i) {
                                case 0: {
                                    edit(info);
                                    break;
                                }
                                case 1: {
                                    remove(info);
                                    break;
                                }
                            }
                        });
                    });
                    $actionTable.append($actionBody).appendTo($actionArea);
                    eb.listAppend($li, [$viewArea, $actionArea]);
                    $ul.append($li);
                });
                $container.empty().append($ul);
            }
            else {
                $container.empty();
            }
        };
        const openSystemDatePathListEditor = function(editData) {
            const _this = this;
            const isEditMode = !isVoid(editData);
            const info = isEditMode ? editData : itf.getInjectData(null, null);
            const subOption = { "width": "360px", "max-height": "500px" };
            const title = isEditMode ? upperCase(captions.edit, 0) : upperCase(captions.add, 0);
            const eventInjector = new Object();
            const buildSubContents = function() {
                const $container = jqNode("div", { class: eClass.interfaceListAddContainer });
                const $table = jqNode("table");
                const path = info.path ? new FileSystem(info.path).toFilePath().getPath() : info.path;
                const itemList = [
                    { key: "name", label: upperCase(captions.name), value: info.name ? info.name : SIGN.none },
                    { key: "path", label: upperCase(captions.path), value: info.path ? path : SIGN.none }
                ];
                itemList.forEach(function(item) {
                    const $row = jqNode("tr");
                    const $label = jqNode("label").text(item.label);
                    const $input = jqNode("input", { class: eClass.applicationInput, value: item.value });
                    const $labelCell = jqNode("td").append($label);
                    const $inputCell = jqNode("td").append($input);
                    eb.listAppend($row, [$labelCell, $inputCell]);
                    $table.append($row);
                    eventInjector[item.key] = $input;
                });
                $container.append($table);
                return $container;
            };
            const callback = function(dialogClose) {
                const name = _this.createInfoObject(eventInjector.name.val(), upperCase(captions.name));
                const path = _this.createInfoObject(eventInjector.path.val(), upperCase(captions.path));
                const v = new Validation();
                const vTypes = v.getTypes();
                const nameLayout = v.getLayout(v.initLayout(name.value, name.name), [vTypes.required, vTypes.notSpace]);
                const pathLayout = v.getLayout(v.initLayout(path.value, path.name), [vTypes.required]);
                v.reset().appendList([nameLayout, pathLayout]);
                const result = v.exec();
                if(result.error) {
                    new Notification().error().open(result.message);
                    return false;
                }
                const dSL = store.init()[itf.getKey()];
                if(!isVoid(dSL) && !isVoid(dSL[name.value]) && !(isEditMode && info.name === name.value)) {
                    new Notification().error().open(messages.already_exits_name);
                    return false;
                }
                const getOrder = function() {
                    if(isEditMode && !isVoid(dSL[info.name])) return dSL[info.name].order;
                    return getObjectMaxOrder(dSL) + 1;
                };
                const jsonPath = new FileSystem(path.value).toJsonPath().getPath();
                const injectData = itf.getInjectData(name.value, jsonPath, getOrder());
                itf.inject(store, injectData, name.value);
                if(isEditMode && info.name !== name.value) store.connect([itf.getKey(), info.name]).delete().apply();
                store.connect([itf.getKey()]).set(sortObjectByOrder(store.init()[itf.getKey()])).apply();
                buildContents();
                store.sync();
                dialogClose();
            };
            const okIcon = eb.getFontAwesomeIcon(eIcon.check);
            const closeIcon = eb.getFontAwesomeIcon(eIcon.times);
            new SubDialog().setContents(title, buildSubContents(), subOption).setUserButton(okIcon, closeIcon).open(callback);
        };
        const $addButton = jqNode("button").append(eb.getFontAwesomeIcon(eIcon.plus));
        $addButton.click(function() { openSystemDatePathListEditor(); });
        buildContents();
        const option = { "width": "400px", "max-height": "530px" };
        dialog.setContents(title, $container, option).setButton([$addButton]).disableOkButton().open();
    },
    readSystemDate: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const targetPath = _this.createInfoObject(jqById(seId.dateTargetPath).val(), captions.targetPath);
        const v = new Validation();
        const vTypes = v.getTypes();
        const targetPathLayout = v.getLayout(v.initLayout(targetPath.value, targetPath.name), [vTypes.required]);
        v.reset().append(targetPathLayout);
        const result = v.exec();
        if(result.error) {
            new Notification().error().open(result.message);
            return false;
        }
        try {
            const path = targetPath.value;
            const fs = new FileSystem(path);
            const data = fs.read().getData();
            const structure = {
                year: { key: "Year", value: null },
                month: { key: "Month", value: null },
                day: { key: "Day", value: null }
            };
            const setSystemDate = function(d) {
                const dataArray = d.split(SIGN.crlf);
                Object.keys(structure).forEach(function(key) {
                    const item = structure[key];
                    const map = concatString(item.key, "=");
                    const exp = new RegExp(concatString("^", map, ".+?$"), "g");
                    dataArray.some(function(line) {
                        if(exp.test(line)) {
                            item.value = line.replace(map, SIGN.none);
                            return true;
                        }
                    });
                });
            };
            const checkFileStructure = function() {
                let flag = true;
                Object.keys(structure).some(function(key) {
                    const item = structure[key];
                    if(isVoid(item.value) || !typeIs(Number(item.value)).number) {
                        flag = false;
                        return true;
                    }
                });
                return flag;
            };
            setSystemDate(data);
            if(!checkFileStructure()) throw new Error(MESSAGES.incorrect_data);
            const s = structure;
            const today = getToday();
            const todayStringFormat = [today.year, today.month, today.date].join(SIGN.ssh);
            const todaySystemObject = new Date(todayStringFormat);
            todaySystemObject.setFullYear(todaySystemObject.getFullYear() + Number(s.year.value));
            todaySystemObject.setMonth(todaySystemObject.getMonth() + Number(s.month.value));
            const pYear = todaySystemObject.getFullYear();
            const pMonth = todaySystemObject.getMonth();
            const pLastDate = new Date(pYear, pMonth, 0).getDate();
            const pConDate = today.date > pLastDate ? pLastDate : today.date;
            todaySystemObject.setDate(Number(pConDate) + Number(s.day.value));
            const calcYear = todaySystemObject.getFullYear();
            const calcMonth = setCharPadding(todaySystemObject.getMonth() + 1, 2);
            const calcDate = setCharPadding(todaySystemObject.getDate(), 2);
            const resultDateFormat = [calcYear, calcMonth, calcDate].join("/");
            jqById(seId.dateInput).val(resultDateFormat);
        }
        catch(e) {
            new Notification().error().open(e.message);
        }
    },
    editSystemDate: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const messages = _this.Define.MESSAGES;
        const calendar = new Calendar();
        const mode = calendar.def.mode;
        const targetPath = _this.createInfoObject(jqById(seId.dateTargetPath).val(), captions.targetPath);
        const systemDate = _this.createInfoObject(jqById(seId.dateInput).val(), captions.systemDate);
        const v = new Validation();
        const vTypes = v.getTypes();
        const targetPathLayout = v.getLayout(v.initLayout(targetPath.value, targetPath.name), [vTypes.required]);
        const systemDateLayout = v.getLayout(v.initLayout(systemDate.value, systemDate.name), [vTypes.required, vTypes.notSpace]);
        v.reset().appendList([targetPathLayout, systemDateLayout]);
        const result = v.exec();
        if(result.error) {
            new Notification().error().open(result.message);
            return false;
        }
        const validate = _this.dateFormatValidate(systemDate.value);
        if(validate === mode.ymd) {
            try {
                const today = getToday();
                const valueArray = systemDate.value.split(SIGN.ssh);
                const year = valueArray[0];
                const month = valueArray[1];
                const date = valueArray[2];
                const toLastDate = new Date(year, month, 0).getDate();
                const conDate = today.date > toLastDate ? toLastDate : today.date;
                const yearDiff = Number(year) - Number(today.year);
                const monthDiff = Number(month) - Number(today.month);
                const dateDiff = Number(date) - conDate;
                const path = targetPath.value;
                const fs = new FileSystem(path);
                const structure = {
                    UseSetting: true,
                    Year: yearDiff,
                    Month: monthDiff,
                    Day: dateDiff,
                    Hour: 0,
                    Minute: 0,
                    Second: 0
                };
                const data = new Array();
                Object.keys(structure).forEach(function(key) {
                    const line = concatString(key, SIGN.equal, structure[key]);
                    data.push(line);
                });
                const dataString = data.join(SIGN.crlf) + SIGN.crlf;
                fs.write(dataString);
                new Notification().complete().open(messages.systemdate_modified_complete);
            }
            catch(e) {
                new Notification().error().open(e.message);
            }
        }
        else {
            const message = concatString(captions.systemDate, " : ", messages.invalid_format);
            new Notification().error().open(message);
        }
        return null;
    },
    buildClipboardLinker: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const clipboardLinkerState = _this.state.clipboardLinker;
        const stateDef = clipboardLinkerState.define;
        const eb = new ElementBuilder();
        const injectorStack = new Array();
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $setButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.set));
        $container.append(eb.listAppend($actionArea, [$setButton]));
        const radioItemList = [
            {
                label: stateDef.separatorTypeRadio.type.lineBreak.label,
                attributes: {
                    id: stateDef.separatorTypeRadio.type.lineBreak.id,
                    name: stateDef.separatorTypeRadio.name,
                    value: stateDef.separatorTypeRadio.type.lineBreak.value
                },
                isChecked: true,
                optionClass: SIGN.none
            },
            {
                label: stateDef.separatorTypeRadio.type.commaLineBreak.label,
                attributes: {
                    id: stateDef.separatorTypeRadio.type.commaLineBreak.id,
                    name: stateDef.separatorTypeRadio.name,
                    value: stateDef.separatorTypeRadio.type.commaLineBreak.value
                },
                isChecked: false,
                optionClass: SIGN.none
             }
        ];
        const $separatorTypeCommandArea = jqNode("div", { class: seClass.commandArea });
        const $radioItem = eb.createRadio(radioItemList).getItem();
        const $separatorTypeLabel = jqNode("label").css("line-height", "2.5").text(captions.separatorType);
        const $separatorTypeRadio = jqNode("div", { class: eClass.fullWidth }).append($radioItem);
        eb.listAppend($separatorTypeCommandArea, [$separatorTypeLabel, $separatorTypeRadio]);
        $container.append($separatorTypeCommandArea);
        injectorStack.push($separatorTypeCommandArea);
        const itemList = [
            {
                label: captions.copyList,
                inputType: "textarea",
                inputId: seId.clipboardLinkerCopyList
            }
        ];
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
            injectorStack.push($commandArea);
        });
        $setButton.click(function() {
            _this.clipboardLinkerSet();
        });
        clipboardLinkerState.injector.commandArea = injectorStack;
        return $container;
    },
    actionControllerClipboardLinker: function(phase) {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.clipboardLinker;
        const $card = jqById(seId.clipboardLinkerCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $cardContents.find(concatString(".", seClass.contentsContainer));
        const $actionArea = $contentsContainer.children(concatString(".", seClass.actionArea));
        const $setButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.set));
        const $clearButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.clear));
        let itemList = new Array();
        switch(phase) {
            case phaseType.init: {
                itemList = [$setButton];
                break;
            }
            case phaseType.set: {
                itemList = [$clearButton];
                break;
            }
        }
        $actionArea.empty();
        itemList.forEach(function(item) {
            $actionArea.append(item);
        });
        $setButton.click(function() {
            _this.clipboardLinkerSet();
        });
        $clearButton.click(function() {
            _this.clipboardLinkerClear();
        });
    },
    clipboardLinkerSet: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.clipboardLinker;
        const captions = _this.Define.CAPTIONS;
        const clipboardLinkerState = _this.state.clipboardLinker;
        const stateDef = clipboardLinkerState.define;
        const separatorTypeElement = concatString("input[name=", stateDef.separatorTypeRadio.name, "]:checked");
        const separatorType = $(separatorTypeElement).val();
        const $copyList = jqById(seId.clipboardLinkerCopyList);
        const copyListValue = $copyList.val();
        const copyList = getExistArray(copyListValue.split(separatorType));
        const v = new Validation();
        const vTypes = v.getTypes();
        const existValidate = function() {
            const actionLayout = v.getActionLayout();
            if(isVoid(copyList)) {
                actionLayout.error = true;
                actionLayout.message = v.getMessage(vTypes.required, captions.copyList);
            }
            return actionLayout;
        };
        const actionObj = createObject(vTypes.required, existValidate);
        const copyListLayout = v.getLayout(v.initLayout(copyList, captions.copyList), [vTypes.required], actionObj);
        v.reset().append(copyListLayout);
        const result = v.exec();
        if(result.error) {
            new Notification().error().open(result.message);
            return false;
        }
        clipboardLinkerState.injector.commandArea.forEach(function(item) {
            new ElementBuilder(item).setDisplayNone();
        });
        const $card = jqById(seId.clipboardLinkerCard);
        const $cardContents = $card.find(concatString(".", eClass.cardContents));
        const $contentsContainer = $cardContents.find(concatString(".", seClass.contentsContainer));
        const $commandArea = jqNode("div", { id: seId.clipboardLinkerSelectArea, class: seClass.commandArea });
        copyList.forEach(function(linkText) {
            const $button = jqNode("button").text(linkText);
            $commandArea.append($button);
            $button.click(function() {
                _this.clipboardLinkerCopy(this.textContent);
            });
        });
        $contentsContainer.append($commandArea);
        _this.actionControllerClipboardLinker(phaseType.set);
        return null;
    },
    clipboardLinkerClear: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const types = _this.Define.TYPES;
        const phaseType = types.phase.clipboardLinker;
        const clipboardLinkerState = _this.state.clipboardLinker;
        jqById(seId.clipboardLinkerCopyList).val(SIGN.none);
        jqById(seId.clipboardLinkerSelectArea).remove();
        clipboardLinkerState.injector.commandArea.forEach(function(item) {
            new ElementBuilder(item).removeDisplayNone();
        });
        _this.actionControllerClipboardLinker(phaseType.init);
        return null;
    },
    clipboardLinkerCopy: function(data) {
        data = data.replace(/\n/g, SIGN.crlf);
        const r = copyToClipboard(data);
        if(r.error) {
            new Notification().error().open(r.message);
            return false;
        }
        return null;
    },
    buildFolderGenerator: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const eb = new ElementBuilder();
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $execButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.exec));
        $container.append(eb.listAppend($actionArea, [$execButton]));
        const itemList = [
            {
                label: captions.targetPath,
                inputType: "textarea",
                inputId: seId.folderGeneratorPath
            }
        ];
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
        });
        $execButton.click(function() {
            _this.generateFolder();
        });
        return $container;
    },
    generateFolder: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const captions = _this.Define.CAPTIONS;
        const types = _this.Define.TYPES;
        const messages = _this.Define.MESSAGES;
        const loading = new Loading();
        loading.on().then(function() {
            const $targetPath = jqById(seId.folderGeneratorPath);
            const targetPathValue = $targetPath.val();
            const targetPath = getExistArray(targetPathValue.split(SIGN.nl));
            const v = new Validation();
            const vTypes = v.getTypes();
            const existValidate = function(t) {
                const actionLayout = v.getActionLayout();
                if(isVoid(targetPath)) {
                    actionLayout.error = true;
                    actionLayout.message = v.getMessage(vTypes.required, captions.targetPath);
                }
                return actionLayout;
            };
            const actionObj = createObject(vTypes.required, existValidate);
            const targetPathLayout = v.getLayout(v.initLayout(targetPath, captions.targetPath), [vTypes.required], actionObj);
            v.reset().append(targetPathLayout);
            const result = v.exec();
            if(result.error) {
                throw new Error(result.message);
            }
            targetPath.forEach(function(path) {
                new FileSystem(path).createFolder(false);
            });
            new Notification().complete().open(messages.create_folder_complete);
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    },
    buildCopyFile: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const copyFileState = _this.state.copyFile;
        const stateDef = copyFileState.define;
        const eb = new ElementBuilder();
        const injectorStack = new Array();
        const $container = jqNode("div", { class: seClass.contentsContainer });
        const $actionArea = jqNode("div", { class: seClass.actionArea });
        const $execButton = jqNode("button", { class: eClass.buttonColorBalanced }).text(upperCase(captions.exec));
        const $clearButton = jqNode("button", { class: eClass.buttonColorAssertive }).text(upperCase(captions.clear));
        $container.append(eb.listAppend($actionArea, [$execButton, $clearButton]));
        const modeRadioItemList = [
            {
                label: stateDef.modeRadio.type.file.label,
                attributes: {
                    id: stateDef.modeRadio.type.file.id,
                    name: stateDef.modeRadio.name,
                    value: stateDef.modeRadio.type.file.value
                },
                isChecked: true,
                optionClass: SIGN.none
            },
            {
                label: stateDef.modeRadio.type.folder.label,
                attributes: {
                    id: stateDef.modeRadio.type.folder.id,
                    name: stateDef.modeRadio.name,
                    value: stateDef.modeRadio.type.folder.value
                },
                isChecked: false,
                optionClass: SIGN.none
             }
        ];
        const $modeCommandArea = jqNode("div", { class: seClass.commandArea });
        const $modeRadioItem = eb.createRadio(modeRadioItemList).getItem();
        const $modeLabel = jqNode("label").css("line-height", "2.5").text(upperCase(captions.mode, 0));
        const $modeRadio = jqNode("div", { class: eClass.fullWidth }).append($modeRadioItem);
        eb.listAppend($modeCommandArea, [$modeLabel, $modeRadio]);
        const overwriteRadioItemList = [
            {
                label: stateDef.overwriteRadio.type.typeTrue.label,
                attributes: {
                    id: stateDef.overwriteRadio.type.typeTrue.id,
                    name: stateDef.overwriteRadio.name,
                    value: stateDef.overwriteRadio.type.typeTrue.value
                },
                isChecked: true,
                optionClass: SIGN.none
            },
            {
                label: stateDef.overwriteRadio.type.typeFalse.label,
                attributes: {
                    id: stateDef.overwriteRadio.type.typeFalse.id,
                    name: stateDef.overwriteRadio.name,
                    value: stateDef.overwriteRadio.type.typeFalse.value
                },
                isChecked: false,
                optionClass: SIGN.none
             }
        ];
        const $overwriteCommandArea = jqNode("div", { class: seClass.commandArea });
        const $overwriteRadioItem = eb.createRadio(overwriteRadioItemList).getItem();
        const $overwriteLabel = jqNode("label").css("line-height", "2.5").text(upperCase(captions.overwrite, 0));
        const $overwriteRadio = jqNode("div", { class: eClass.fullWidth }).append($overwriteRadioItem);
        eb.listAppend($overwriteCommandArea, [$overwriteLabel, $overwriteRadio]);
        eb.listAppend($container, [$modeCommandArea, $overwriteCommandArea]);
        injectorStack.push($modeRadioItem);
        injectorStack.push($overwriteRadioItem);
        const itemList = [
            {
                label: captions.sourcePath,
                inputType: "textarea",
                inputId: seId.copyFileSourcePath
            },
            {
                label: captions.destinationPath,
                inputType: "textarea",
                inputId: seId.copyFileDestinationPath
            }
        ];
        itemList.forEach(function(item) {
            const $commandArea = jqNode("div", { class: seClass.commandArea });
            const $label = jqNode("label").text(item.label);
            const $input = jqNode(item.inputType, { id: item.inputId });
            $commandArea.append($label).append($input);
            $container.append($commandArea);
            injectorStack.push($input);
        });
        $execButton.click(function() {
            _this.copyFile();
        });
        $clearButton.click(function() {
            injectorStack.forEach(function(ele, i) {
                if(i === 0) {
                    jqById(stateDef.modeRadio.type.file.id).prop("checked", true);
                    jqById(stateDef.modeRadio.type.folder.id).prop("checked", false);
                }
                else if(i === 1) {
                    jqById(stateDef.overwriteRadio.type.typeTrue.id).prop("checked", true);
                    jqById(stateDef.overwriteRadio.type.typeFalse.id).prop("checked", false);
                }
                else {
                    ele.val(SIGN.none);
                }
            });
        });
        return $container;
    },
    copyFile: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const types = _this.Define.TYPES;
        const captions = _this.Define.CAPTIONS;
        const messages = _this.Define.MESSAGES;
        const copyFileState = _this.state.copyFile;
        const stateDef = copyFileState.define;
        const loading = new Loading();
        loading.on().then(function() {
            const modeElement = concatString("input[name=", stateDef.modeRadio.name, "]:checked");
            const overwriteElement = concatString("input[name=", stateDef.overwriteRadio.name, "]:checked");
            const mode = $(modeElement).val();
            const isOverwrite = $(overwriteElement).val();
            const $sourcePath = jqById(seId.copyFileSourcePath);
            const $destinationPath = jqById(seId.copyFileDestinationPath);
            const sourcePathValue = $sourcePath.val();
            const destinationPathValue = $destinationPath.val();
            const sourcePath = getExistArray(sourcePathValue.split(SIGN.nl));
            const destinationPath = getExistArray(destinationPathValue.split(SIGN.nl));
            const v = new Validation();
            const vTypes = v.getTypes();
            const existValidate = function(t) {
                const p = t === 0 ? sourcePath : destinationPath;
                const c = t === 0 ? captions.sourcePath : captions.destinationPath;
                const actionLayout = v.getActionLayout();
                if(isVoid(p)) {
                    actionLayout.error = true;
                    actionLayout.message = v.getMessage(vTypes.required, c);
                }
                return actionLayout;
            };
            const actionObjS = createObject(vTypes.required, existValidate.bind(null, 0));
            const actionObjD = createObject(vTypes.required, existValidate.bind(null, 1));
            const sourcePathLayout = v.getLayout(v.initLayout(sourcePath, captions.sourcePath), [vTypes.required], actionObjS);
            const destinationPathLayout = v.getLayout(v.initLayout(destinationPath, captions.destinationPath), [vTypes.required], actionObjD);
            v.reset().appendList([sourcePathLayout, destinationPathLayout]);
            const result = v.exec();
            if(result.error) {
                throw new Error(result.message);
            }
            else if(sourcePath.length != destinationPath.length) {
                throw new Error(messages.each_source_destination);
            }
            const fs = new FileSystem();
            switch(mode) {
                case types.copyFile.mode.file: {
                    sourcePath.forEach(function(sPath, i) {
                        fs.copyFile(sPath, destinationPath[i], isOverwrite);
                    });
                    break;
                }
                case types.copyFile.mode.folder: {
                    sourcePath.forEach(function(sPath, i) {
                        fs.copyFolder(sPath, destinationPath[i], isOverwrite);
                    });
                    break;
                }
            }
            new Notification().complete().open(messages.copy_file_complete);
            loading.off();
        }).catch(function(e) {
            new Notification().error().open(e.message);
            loading.off();
        });
        return null;
    }
};
