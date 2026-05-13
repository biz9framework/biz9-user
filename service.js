// -- biz9 --
const {Log,Str,Obj,Status_Type,Response_Logic} = require("biz9-utility");
const {Data_Response_Field} = require("biz9-data-app");
const {User_Response_Field} = require("./");
const {Remote} = require("biz9-remote");
// -- other --
const {Config} = require("./constant");
const async = require('async');
class Service {
    /* -- DEFINE --
     * --- login / (url,user)
     * --- post / (url,user)
     * --- register / (url,user)
     */
     // -- 9_ping
    static ping = (url) => {
        return new Promise((callback) => {
            let response = Response_Logic.get();
            let data = {};
            async.series([
                async function(call){
                    const [biz_response,biz_data] = await Remote.post(url);
                    response = biz_response;
                    call();
                },
                async function(call){
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_URL,Status_Type.OK,url,{title:Config.TITLE}));
                    call();
                },
            ],
                function(error, result){
                    callback(response);
                });
        });
    };
    // - 9_login 9_user_login
    static login = (url,user,option) => {
        return new Promise((callback) => {
            let response = Response_Logic.get();
            let data = {};
            option = !Obj.check_is_empty(option) ? option : {};
            async.series([
                async function(call){
                    // -- user-login --
                    const form_data = {user:user,option:option};
                    const [biz_response,biz_data] = await Remote.post(url,form_data);
                    response = biz_response;
                    data = biz_data;
                    call();
                },
                async function(call) {
                    // -- response-param --
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_URL,Status_Type.OK,url,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(User_Response_Field.PARAM_USER,Status_Type.OK,user,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_OPTION,Status_Type.OK,option,{title:Config.TITLE}));
                    call();
                },
            ],
                function(error, result){
                    callback([response,data]);
                });
        });
    };
    // - 9_post 9_user_post
    static post = (url,user,option) => {
        return new Promise((callback) => {
            let response = Response_Logic.get();
            let data = {};
            option = !Obj.check_is_empty(option) ? option : {};
            async.series([
                async function(call){
                    // -- user-post --
                    const form_data = {user:user,option:option};
                    const [biz_response,biz_data] = await Remote.post(url,form_data);
                    response = biz_response;
                    data = biz_data;
                    call();
                },
                async function(call) {
                    // -- response-param --
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_URL,Status_Type.OK,url,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(User_Response_Field.PARAM_USER,Status_Type.OK,user,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_OPTION,Status_Type.OK,option,{title:Config.TITLE}));
                    call();
                },
            ],
                function(error, result){
                    callback([response,data]);
                });
        });
    };
    // - 9_register 9_user_register
    static register = (url,user,option) => {
        return new Promise((callback) => {
            let response = Response_Logic.get();
            let data = {};
            option = !Obj.check_is_empty(option) ? option : {};
            async.series([
                async function(call){
                    // -- user-register --
                    const form_data = {user:user,option:option};
                    const [biz_response,biz_data] = await Remote.post(url,form_data);
                    response = biz_response;
                    data = biz_data;
                    call();
                },
                async function(call) {
                    // -- response-param --
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_URL,Status_Type.OK,url,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(User_Response_Field.PARAM_USER,Status_Type.OK,user,{title:Config.TITLE}));
                    response.messages.push(Response_Logic.get_message(Data_Response_Field.PARAM_OPTION,Status_Type.OK,option,{title:Config.TITLE}));
                    call();
                },
            ],
                function(error, result){
                    callback([response,data]);
                });
        });
    };
}
module.exports = {Service};
