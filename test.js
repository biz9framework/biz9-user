/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: User - Test
*/
// -- biz9 --
const {Config,Data_Config,Table,Field}=require('./constant');
const {Log,Str,Obj,Response_Logic,Response_Field,Status_Type,Num}=require("biz9-utility");
const {Data_Logic,Data_Value_Type,Data_Table,Data_Field,Data_Response_Field}=require("/home/think1/www/doqbox/biz9-framework/biz9-data-app/source");
const {User_Logic,User_Field,User_Response_Field,User_Url}=require("./");
// -- other --
const async = require('async');
var assert = require('better-assert');

/* - DEFINE -
 * 1. actions /
 */
//9_actions - 9_test_actions
describe('actions', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
    let user = {};
    let user_test = {};
    let users_test = [];
    let users_test_count = 3;
   before(function() {
        console.log('BiZ-ACTIONS-START');
    });
    it("actions", function(done){
        async.series([
            async function(call){
                // -- get-user, get-test-user, get-test-users --
                // -- get-parent --
                user = Data_Logic.get(Table.USER,0);
                Log.w('99_user',user);

                // -- get-parent --
                /*
                let user_item = Data_Logic.get(Table.USER,99);
                let user = Data_Logic.get(Table.USER,999);
                user_test = Data_Logic.get(Table.USER,0,{test:true,parent:parent_item,user:user});
                Log.w('99_user_test',user_test);
                */

                /*
                // -- get-parents --
                parents_test = Data_Logic.get(Table.PRODUCT,0,{test:true,count:3,parent:parent_item,user:user});
                Log.w('99_parents_test',parents_test);

                // -- get-search --
                search = Data_Logic.get_search(Table.BLANK,{id:'123'});
                Log.w('99_search',search);

                //-- get-foreign --
                foreign = Data_Logic.get_foreign(Data_Value_Type.ITEMS,Table.BLANK,Data_Field.ID,Data_Field.TITLE,{title:'sub_values'});
                Log.w('99_foreign',foreign);
                */
            },
            function(call){
                /*
                // -- assert --
                // -- assert-parent --
                assert(parent.table === Table.PRODUCT);
                assert(parent.id === 0);
                // -- assert-test-parent --
                assert(parent_test.table === Table.PRODUCT);
                assert(Str.check_is_null(parent_test.cost) === false);
                assert(Str.check_is_null(parent_test.old_cost) === false);
                assert(Str.check_is_null(parent_test.category) === false);
                assert(parent_test.parent_table === Table.BLANK);
                assert(parent_test.parent_id === 99);
                assert(parent_test.user_table === Table.USER);
                assert(parent_test.user_id === 999);

                // -- assert-parents --
                assert(parents_test.length === 3);

                // -- assert-search --
                assert(search.table === Table.BLANK);
                assert(search.page_current === 1);
                // -- assert-foreign --
                assert(foreign.value_type === Data_Value_Type.ITEMS);
                assert(foreign.foreign_table === Table.BLANK);
                assert(foreign.title === 'sub_values');
                */

                call();
            },
        ],
            function(error, result){
                done();
            });
    });
    after(function() {
        // -- response --
        /*
        console.log('ACTION-DONE');
        Log.w('ACTIONS-RESPONSE-STATUS',response.status);
        Log.w('ACTIONS-RESPONSE-MESSAGE',response.message);
        Log.w('ACTIONS-DATA',data);
        */
    });
});


/*
//9_blank - 9_test_blank
describe.skip('blank', function() {
    let database = {};
    let response=Response_Logic.get();
    let data = {};
    let option = {};
   before(function() {
        console.log('BLANK-START');
    });
    it("blank", function(done){
        async.series([
            async function(call){
                // -- get-database --
                const [biz_response,biz_data] = await Database.get(Data_Config);
                database = biz_data;
            },
            async function(call){
                // -- blank-data --
                const [biz_response,biz_data] = await Data.post(database,PARENT.table,PARENT,option);
                response = biz_response;
                data = biz_data;
                Log.w('BIZ-RESPONSE',response);
                Log.w('BIZ-DATA',data);
            },
            function(call){
                // -- assert --
                assert(Str.check_is_null(data.id) === false);
                assert(response.message === Data_Logic.get_message_by_response_field(Response_Field.POST_CONFIRM));
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
        console.log('BLANK-DONE');
        Log.w('BLANK-RESPONSE-STATUS',response.status);
        Log.w('BLANK-RESPONSE-MESSAGE',response.message);
        Log.w('BLANK-DATA',data);
    });
});
*/

