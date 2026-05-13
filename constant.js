const Config = {
    TITLE:'BiZ9-User',
    APP_ID:"test-stage-may",
    PORT_ID: "1904",
    HOST:"http://localhost:1904",
}
class Url {
    static PING="ping";
}
class Table {
    static BLANK = 'blank_biz';
    static PRODUCT = 'product_biz';
    static USER = 'user_biz';
};
module.exports = {
    Config,
    Table,
    Url
}
