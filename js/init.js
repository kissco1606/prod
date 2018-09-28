function init() {
    const db = new DB();
    db.setDriver().setConnection(def.uid, def.pwd);
};