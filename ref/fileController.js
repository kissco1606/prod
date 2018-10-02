const FileControl = function () {
    this.readType = fd.read_type.text;
    this.listenner = null;
    this.allowed = null;
};
FileControl.prototype = {
    setListenner: function (listennerId) {
        this.listenner = getNode(listennerId);
        return this;
    },
    setReadType: function (type = fd.read_type.text) {
        this.readType = type;
        return this;
    },
    allowedExtensions: function (allowed) {
        this.allowed = allowed;
        return this;
    },
    access: function (func) {
        const allowed = this.allowed;
        const $listenner = this.listenner;
        if ($listenner) {
            $listenner.change((e) => {
                e.stopPropagation();
                const files = e.target.files;
                if (files && files.length >= 1) {
                    const file = files[0];
                    $listenner.val('');
                    if (isNotAllowed(allowed, file.type)) {
                        new Notification().open(MESSAGES.not_allowed_extension);
                        return false;
                    }
                    this.loadFile(file, func);
                }
            });
            $listenner.click();
        }
        return this;
    },
    loadFile: function (file, func) {
        const fr = new FileReader();
        fr.onload = function (e) {
            const result = e.target.result;
            func(result);
        };
        readFile(fr, this.readType, file);
    }
};

function isNotAllowed(allowed, fileType) {
    if (!typeIs(allowed).array) return false;
    let result = true;
    allowed.some((item) => {
        if (item === fileType) {
            result = false;
            return true;
        }
    });
    return result;
};

function readFile(fr, type, file) {
    if (!file) {
        return false;
    }
    switch (type) {
        case fd.read_type.arrayBuffer: {
            fr.readAsArrayBuffer(file);
            break;
        }
        case fd.read_type.binaryString: {
            fr.readAsBinaryString(file);
            break;
        }
        case fd.read_type.dataUrl: {
            fr.readAsDataURL(file);
            break;
        }
        default: {
            fr.readAsText(file);
            break;
        }
    }
};

function saveAsFile(parts, fileName, type) {
    try {
        const blob = new Blob([parts], { tpye: type });
        saveAs(blob, fileName);
    }
    catch (e) {
        faildReadFileNotice();
    }
};

function faildReadFileNotice() {
    const msg = MESSAGES.faild_read_file;
    new Notification().open(msg).exit(msg);
};