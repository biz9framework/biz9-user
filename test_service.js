/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: Data - Test
*/
// biz9 --
const {Log,Str,Obj,Response_Logic,Response_Field,Status_Type,Num}=require("/home/think1/www/doqbox/biz9-framework/biz9-utility/source");
const {Data_Logic,Data_Url}=require("/home/think1/www/doqbox/biz9-framework/biz9-data-app/source");
const {User_Logic,User_Field,User_Type,User_Table,User_Response_Field,User_Url}=require("/home/think1/www/doqbox/biz9-framework/biz9-user/source");
const {Remote} = require("/home/think1/www/doqbox/biz9-framework/biz9-remote/source");
const {Service}=require('./service');
const {Config,Data_Config,Table,Key}=require('./constant');
// -- other --
const async = require('async');
var assert = require('better-assert');

/* -- DEFINE --
 * ping
 * register / (user_obj)
 * login / (user_obj)
 * post / (user_obj)
*/
// -- GLOBALZ --
let USER = User_Logic.get_test();
let USER_CHECK = User_Logic.get_test();

//9_ping - 9_test_ping
describe.skip('ping', function() {
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        console.log('PING-START');
    });
    it("ping", function(done){
        async.series([
            async function(call){
                // -- post-data --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.PING);
                const [biz_response,biz_data] = await Service.ping(url);
                response = biz_response;
                Log.w('BIZ-RESPONSE-PING',response);
                Log.w('BIZ-DATA-PING',biz_data);
            },
            function(call){
                // -- assert --
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        console.log('PING-DONE');
        Log.w('PING-RESPONSE-STATUS',response.status);
        Log.w('PING-RESPONSE-MESSAGE',response.message);
    });
});
//9_register - 9_test_register
describe('register', function() { this.timeout(25000);
    // -- objz --
    let response=Response_Logic.get();
    let data = {};
    let option = {};
    // -- user-check-objz --
    user_check_response = Response_Logic.get();
    // -- register-user-check-objz --
    register_user_check_response = Response_Logic.get();
    register_user_check_data = {};
    // -- bad-email-objz --
    let bad_email_data = {};
    let bad_email_response=Response_Logic.get();
    // -- bad-user-name-objz --
    let bad_user_name_data = {};
    let bad_user_name_response=Response_Logic.get();
    // -- bad-password-objz --
    let bad_password_data = {};
    let bad_password_response=Response_Logic.get();
    before(async function() {
        // -- post-user --
        console.log(' -- BIZ9-USER-START --');
        console.log('REGISTER-START');
    });
    it("register", function(done){
        async.series([
            async function(call){
                // -- post-user-check
                const url = Remote.get_url(Config.APP_ID,Config.HOST,Data_Url.POST);
                const form_data = {table:USER_CHECK.table,data:USER_CHECK};
                const [biz_response,biz_data] = await Remote.post(url,form_data);
                user_check_response = biz_response;
                USER_CHECK = biz_data;
                Log.w('USER-CHECK-BIZ-RESPONSE',user_check_response);
                Log.w('USER-CHECK-BIZ-DATA',USER_CHECK);
            },
            async function(call){
                // -- register-user-check
                option = {register_type:User_Field.EMAIL};
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.REGISTER);
                const [biz_response,biz_data] = await Service.post(url,USER_CHECK,option);
                register_user_check_response = biz_response;
                register_user_check_data = biz_data;
                Log.w('REGISTER-USER-CHECK-BIZ-RESPONSE',register_user_check_response);
                Log.w('REGISTER_USER-CHECK-BIZ-DATA',register_user_check_data);
            },
            async function(call){
                // -- bad-email-validate-post-user-data --
                option = {register_type:User_Field.EMAIL};
                USER[User_Field.EMAIL] = 'mybademail.com';
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.REGISTER);
                const [biz_response,biz_data] = await Service.post(url,USER,option);
                bad_email_response = biz_response;
                bad_email_data = biz_data;
                Log.w('BAD-EMAIL-BIZ-RESPONSE',bad_email_response);
                Log.w('BAD-EMAIL-BIZ-DATA',bad_email_data);
            },
            async function(call){
                // -- bad-username-validate-post-user-data --
                option = {register_type:User_Field.USERNAME};
                USER[User_Field.USERNAME] = '2';
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.REGISTER);
                const [biz_response,biz_data] = await Service.post(url,USER,option);
                bad_username_response = biz_response;
                bad_username_data = biz_data;
                Log.w('BAD-USERNAME-BIZ-RESPONSE',bad_username_response);
                Log.w('BAD-USERNAME-BIZ-DATA',bad_username_data);
            },
            async function(call){
                // -- bad-password-validate-post-user-data --
                option = {register_type:User_Field.EMAIL};
                USER[User_Field.PASSWORD] = '1';
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.REGISTER);
                const [biz_response,biz_data] = await Service.post(url,USER,option);
                bad_password_response = biz_response;
                bad_password_data = biz_data;
                Log.w('BAD-PASSWORD-BIZ-RESPONSE',bad_password_response);
                Log.w('BAD-PASSWORD-BIZ-DATA',bad_password_data);
            },
            async function(call){
                // -- validate-post-user-data --
                option = {register_type:User_Field.EMAIL};
                USER[User_Field.EMAIL] = "email"+ Str.get_id() + "@email.com";
                USER[User_Field.PASSWORD] = "1234567";
                USER[User_Field.USERNAME] = "username_"+ Str.get_id();
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.REGISTER);
                const [biz_response,biz_data] = await Service.post(url,USER,option);
                response = biz_response;
                USER = biz_data;
                Log.w('BIZ-RESPONSE',response);
                Log.w('BIZ-DATA',USER);
            },
            function(call){
                // -- assert --
                // -- assert-post-user-check --
                assert(Str.check_is_null(USER_CHECK.id) === false);
                assert(user_check_response.message === Data_Logic.get_message_by_response_field(Response_Field.POST_CONFIRM));
                assert(user_check_response.status === Status_Type.SUCCESS);
                // -- assert-register-user-check
                assert(register_user_check_response.message === User_Logic.get_message_by_response_field(User_Response_Field.EMAIL_UNIQUE_FAIL));
                assert(register_user_check_response.status === Status_Type.FAIL);
                // -- assert-bad-email --
                assert(Str.check_is_null(bad_email_data.id) === true);
                assert(bad_email_response.message === User_Logic.get_message_by_response_field(User_Response_Field.EMAIL_FAIL));
                assert(bad_email_response.status === Status_Type.FAIL);
                // -- assert-username-email --
                assert(Str.check_is_null(bad_username_data.id) === true);
                assert(bad_username_response.message === 'Username must be between 3 and 31 characters long.');
                assert(bad_username_response.status === Status_Type.FAIL);
                // -- assert-bad-password --
                assert(Str.check_is_null(bad_password_data.id) === true);
                assert(bad_password_response.message === 'Password must be at least 3 characters.');
                assert(bad_password_response.status === Status_Type.FAIL);
                // -- assert-post-user --
                assert(Str.check_is_null(USER.id) === false);
                assert(response.message === User_Logic.get_message_by_response_field(User_Response_Field.REGISTER_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        console.log('REGISTER-DONE');
        Log.w('REGISTER-RESPONSE-STATUS',response.status);
        Log.w('REGISTER-RESPONSE-MESSAGE',response.message);
        Log.w('REGISTER-DATA',USER);
    });
});
//9_login - 9_test_login
describe('login', function() { this.timeout(25000);
    // -- login-objz --
    let response=Response_Logic.get();
    let data = {};
    // -- login-username-objz --
    let login_username_response=Response_Logic.get();
    let login_username_data = {};
    // -- bad_login-username-objz --
    let bad_login_username_response=Response_Logic.get();
    let bad_login_username_data = {};

    // -- bad-email-login-objz --
    let bad_email_user = USER;
    let bad_email_response=Response_Logic.get();
    let bad_email_data = {};
    // -- bad-password-login-objz --
    let bad_password_user = USER;
    let bad_password_response=Response_Logic.get();
    let bad_password_data = {};
    let option = {};
    before(function() {
        console.log('LOGIN-START');
    });
    it("login", function(done){
        async.series([
            async function(call){
                // -- get-login-email-data --
                option = {login_type:User_Field.EMAIL};
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.LOGIN);
                const [biz_response,biz_data] = await Service.login(url,USER,option);
                response = biz_response;
                data = biz_data;
                Log.w('BIZ-RESPONSE',response);
                Log.w('BIZ-DATA',data);
            },
            async function(call){
                // -- get-login-bad-email-data --
                option = {login_type:User_Field.EMAIL};
                bad_email_user[User_Field.EMAIL] ='bad-email.com';
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.LOGIN);
                const [biz_response,biz_data] = await Service.post(url,bad_email_user,option);
                bad_email_response = biz_response;
                bad_email_data = biz_data;
                Log.w('BAD-EMAIL-BIZ-RESPONSE',bad_email_response);
                Log.w('BAD-EMAIL-BIZ-DATA',bad_email_data);
            },
            async function(call){
                // -- get-login-username-data --
                option = {login_type:User_Field.USERNAME};
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.LOGIN);
                const [biz_response,biz_data] = await Service.post(url,USER,option);
                login_username_response = biz_response;
                login_username_data = biz_data;
                Log.w('BIZ-RESPONSE',login_username_response);
                Log.w('BIZ-DATA',login_username_data);
            },
            async function(call){
                // -- get-bad-login-username-data --
                option = {login_type:User_Field.USERNAME};
                USER[User_Field.USERNAME] = 'bad-username';
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.LOGIN);
                const [biz_response,biz_data] = await Service.post(url,USER,option);
                bad_login_username_response = biz_response;
                bad_login_username_data = biz_data;
                Log.w('BAD-LOGIN-USERNAME-BIZ-RESPONSE',bad_login_username_response);
                Log.w('BAD-LOGIN-USERNAME-BIZ-DATA',bad_login_username_data);
            },
            async function(call){
                // -- get-login-bad-password-data --
                option = {login_type:User_Field.EMAIL};
                bad_password_user[User_Field.EMAIL] ='email-good@gmail.com';
                bad_password_user[User_Field.PASSWORD] ='bad-password.com';
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.LOGIN);
                const [biz_response,biz_data] = await Service.post(url,bad_password_user,option);
                bad_password_response = biz_response;
                bad_password_data = biz_data;
                Log.w('BAD-PASSWORD-BIZ-RESPONSE',bad_password_response);
                Log.w('BAD-PASSWORD-BIZ-DATA',bad_password_data);
            },
            function(call){
                // -- assert --
                assert(Str.check_is_null(data.id) === false);
                assert(response.message === User_Logic.get_message_by_response_field(User_Response_Field.LOGIN_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                // -- assert-bad-email --
                assert(Str.check_is_null(bad_email_data.id) === true);
                assert(bad_email_response.message === 'Email is not valid.');
                assert(bad_email_response.status === Status_Type.FAIL);
                // -- assert-bad-username --
                assert(Str.check_is_null(bad_username_data.id) === true);
                assert(bad_login_username_response.message === User_Logic.get_message_by_response_field(User_Response_Field.LOGIN_FAIL));
                assert(bad_login_username_response.status === Status_Type.FAIL);
                // -- assert-bad-password --
                assert(Str.check_is_null(bad_password_data.id) === true);
                assert(bad_password_response.message === User_Logic.get_message_by_response_field(User_Response_Field.LOGIN_FAIL));
                assert(bad_password_response.status === Status_Type.FAIL);
                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        console.log('LOGIN-DONE');
        Log.w('LOGIN-RESPONSE-STATUS',response.status);
        Log.w('LOGIN-RESPONSE-MESSAGE',response.message);
        Log.w('LOGIN-DATA',data);
    });
});

//9_post - 9_test_post
describe('post', function() { this.timeout(25000);
    let option = {};
    // -- post-user-objz --
    let response=Response_Logic.get();
    let data = {};
    let user_post = User_Logic.get_test_user();
    // -- bad-email-post-objz --
    let bad_email_post_response=Response_Logic.get();
    let bad_email_post_data = {};
    let bad_email_post_user_post = User_Logic.get_test_user();
    // -- bad-username-post-objz --
    let bad_username_post_response=Response_Logic.get();
    let bad_username_post_data = {};
    let bad_username_post_user_post = User_Logic.get_test_user();

    // -- bad-password-post-objz --
    let bad_password_post_response=Response_Logic.get();
    let bad_password_post_data = {};
    let bad_password_post_user_post = User_Logic.get_test_user();
    // -- duplicate-email-post-objz --
    let duplicate_email_post_response=Response_Logic.get();
    let duplicate_email_post_data = {};
    let duplicate_email_post_user_post = User_Logic.get_test_user();
    // -- duplicate-username-post-objz --
    let duplicate_username_post_response=Response_Logic.get();
    let duplicate_username_post_data = {};
    let duplicate_username_post_user_post = User_Logic.get_test_user();
   before(function() {
        console.log('POST-START');
    });
    it("post", function(done){
        async.series([
            async function(call){
                // -- post-data --
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.POST);
                const [biz_response,biz_data] = await Service.post(url,user_post,option);
                response = biz_response;
                data = biz_data;
                Log.w('POST-RESPONSE',response);
                Log.w('POST-DATA',data);
            },
            async function(call){
                // -- bad-email-post-data --
                option = {post_type:User_Field.EMAIL};
                bad_email_post_user_post[User_Field.EMAIL] = 'bad-email.com'
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.POST);
                const [biz_response,biz_data] = await Service.post(url,bad_email_post_user_post,option);
                bad_email_post_response = biz_response;
                bad_email_post_data = biz_data;
                Log.w('BAD-EMAIL-POST-RESPONSE',bad_email_post_response);
                Log.w('BAD-EMAIL-POST-DATA',bad_email_post_data);
            },
            async function(call){
                // -- bad-username-post-data --
                option = {post_type:User_Field.USERNAME};
                bad_username_post_user_post[User_Field.USERNAME] = '1'
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.POST);
                const [biz_response,biz_data] = await Service.post(url,bad_username_post_user_post,option);
                bad_username_post_response = biz_response;
                bad_username_post_data = biz_data;
                Log.w('BAD-USERNAME-POST-RESPONSE',bad_username_post_response);
                Log.w('BAD-USERNAME-POST-DATA',bad_username_post_data);
            },
            async function(call){
                // -- bad-password-post-data --
                option = {post_type:User_Field.EMAIL};
                bad_password_post_user_post[User_Field.PASSWORD] = '1'
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.POST);
                const [biz_response,biz_data] = await Service.post(url,bad_password_post_user_post,option);
                bad_password_post_response = biz_response;
                bad_password_post_data = biz_data;
                Log.w('BAD-PASSWORD-POST-RESPONSE',bad_password_post_response);
                Log.w('BAD-PASSWORD-POST-DATA',bad_password_post_data);
            },
            async function(call){
                // -- duplicate-email-post-data --
                option = {post_type:User_Field.EMAIL};
                duplicate_email_post_user_post[User_Field.EMAIL] = user_post[User_Field.EMAIL];
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.POST);
                const [biz_response,biz_data] = await Service.post(url,duplicate_email_post_user_post,option);
                duplicate_email_post_response = biz_response;
                duplicate_email_post_data = biz_data;
                Log.w('DUPLICATE-EMAIL-POST-RESPONSE',duplicate_email_post_response);
                Log.w('DUPLICATE-EMAIL-POST-DATA',duplicate_email_post_data);
            },
            async function(call){
                // -- duplicate-username-post-data --
                option = {post_type:User_Field.USERNAME};
                duplicate_username_post_user_post[User_Field.USERNAME] = user_post[User_Field.USERNAME];
                const url = Remote.get_url(Config.APP_ID,Config.HOST,User_Url.POST);
                const [biz_response,biz_data] = await Service.post(url,duplicate_username_post_user_post,option);
                duplicate_username_post_response = biz_response;
                duplicate_username_post_data = biz_data;
                Log.w('DUPLICATE-USERNAME-POST-RESPONSE',duplicate_username_post_response);
                Log.w('DUPLICATE-USERNAME-POST-DATA',duplicate_username_post_data);
            },
            function(call){
                // -- assert --
                // -- post-assert --
                assert(Str.check_is_null(data.id) === false);
                assert(response.message === User_Logic.get_message_by_response_field(Response_Field.POST_CONFIRM));
                assert(response.status === Status_Type.SUCCESS);
                // -- bad-email-post-assert --
                assert(Str.check_is_null(bad_email_post_data.id) === true);
                assert(bad_email_post_response.message === User_Logic.get_message_by_response_field(User_Response_Field.EMAIL_FAIL));
                assert(bad_email_post_response.status === Status_Type.FAIL);
                // -- bad-username-post-assert --
                assert(Str.check_is_null(bad_username_post_data.id) === true);
                assert(bad_username_post_response.message === 'Username must be between 3 and 31 characters long.');
                assert(bad_username_post_response.status === Status_Type.FAIL);
                // -- bad-password-post-assert --
                assert(Str.check_is_null(bad_password_post_data.id) === true);
                assert(bad_password_post_response.message === 'Password must be at least 3 characters.');
                assert(bad_password_post_response.status === Status_Type.FAIL);
                 // -- duplicate-email-post-assert --
                assert(Str.check_is_null(duplicate_email_post_data.id) === true);
                assert(duplicate_email_post_response.message === User_Logic.get_message_by_response_field(User_Response_Field.EMAIL_UNIQUE_FAIL));
                assert(duplicate_email_post_response.status === Status_Type.FAIL);
                // -- duplicate-username-post-assert --
                assert(Str.check_is_null(duplicate_username_post_data.id) === true);
                assert(duplicate_username_post_response.message === User_Logic.get_message_by_response_field(User_Response_Field.USERNAME_UNIQUE_FAIL));
                assert(duplicate_username_post_response.status === Status_Type.FAIL);
                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        console.log('POST-DONE');
        Log.w('POST-RESPONSE-STATUS',response.status);
        Log.w('POST-RESPONSE-MESSAGE',response.message);
        Log.w('POST-DATA',data);
        console.log(' -- BIZ9-USER-DATA-END --');
    });
});

