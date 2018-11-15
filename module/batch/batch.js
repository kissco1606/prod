const BatchModule = function() {
	this.Define = {
		ELEMENTS: {
			id: {
				batchHeader: "batch-header",
				batchContents: "batch-contents",
                batchMenuContainer: "batch-menu-container",
                headerToolsConfigIcon: "header-tools-config-icon",
                applicationPage: "application-page",
                batchSchedulerCard: "batch-scheduler-card"
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
            title: "Batch Management",
            exec: "exec",
            batchScheduler: "Batch Scheduler"
		},
		TYPES: {
            message: {
                required: "required",
                matchWhitespace: "match-whitespace"
            },
            page: {
                application: "application"
            },
            path: {
            },
        },
		MESSAGES: {
		}
	};
	this.state = {
	};
};
BatchModule.prototype = {
	initBatchModule: function() {
		const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seStyle = _this.Define.ELEMENTS.style;
        const captions = _this.Define.CAPTIONS;
        const $container = jqById(eId.container);
        $container.css({ "margin-top": seStyle.headerHeight, "background-color": seStyle.backgroundColor });
        const $header = jqNode("header", { id: getHeaderId() });
        const $contents = jqNode("div", { id: getContentsId() });
        const $headerTitle = jqNode("div", { id: eId.headerTitle });
        const $titleIcon = jqNode("i", { class: eIcon.fileCode });
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
        const $menuContainer = jqNode("div", { id: seId.batchMenuContainer, class: eClass.menuContainer });
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
        const $menuContainer = jqById(seId.batchMenuContainer);
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
    getCheckObject: function(value, name) {
        return {
            value: value,
            name: name
        };
    },
    validation: function() {
        const _this = this;
        const msgTypes = _this.Define.TYPES.message;
        const result = {
            error: false,
            message: null
        };
        const argumentsList = Array.prototype.slice.call(arguments);
        const errorMsg = new Array();
        argumentsList.forEach(function(arg) {
            const value = arg.value;
            const name = arg.name;
            if(!value) {
                result.error = true;
                errorMsg.push(_this.getMessage(msgTypes.required, name));
            }
            else if(value.match(new RegExp(SIGN.ws, "g"))) {
                result.error = true;
                errorMsg.push(_this.getMessage(msgTypes.matchWhitespace, name));
            }
        });
        if(result.error) {
            result.message = errorMsg.join(SIGN.br);
        }
        return result;
    },
    getMessage: function(type, msg) {
        const _this = this;
        const msgTypes = _this.Define.TYPES.message;
        switch(type) {
            case msgTypes.required: {
                msg = msg + " is required";
                break;
            }
            case msgTypes.matchWhitespace: {
                msg = msg + " : whitespace is not allowed";
                break;
            }
        }
        return msg;
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
                id: seId.batchSchedulerCard,
                title: captions.batchScheduler,
                contents: _this.buildBatchScheduler()
            }
        ];
        cardList.forEach(function(item) {
            $cardContainer.append(buildCard(item));
        });
        $screen.append($cardContainer);
        $contents.append($screen);
        return null;
    },
    buildBatchScheduler: function() {
        const _this = this;
        const seId = _this.Define.ELEMENTS.id;
        const seClass = _this.Define.ELEMENTS.class;
        const captions = _this.Define.CAPTIONS;
        const $container = jqNode("div", { class: seClass.contentsContainer });
        return $container;
    }
};
