/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: User - Test
*/
const async = require('async');
const assert = require('node:assert');
const {Log} = require("biz9-utility");
const {Region_Logic,User_Title,User_Type,User_Field,Table,User_Logic,User_Response} = require("./index");

/*
 * availble tests
- connect
*/
/* --- TEST CONFIG START --- */
/* --- TEST CONFIG END --- */

/* --- DATA CONFIG END --- */
//9_connect - 9_test_connect
describe('connect', function(){ this.timeout(25000);
    it("_connect", function(done){
        let error=null;
        let database = {};
        let data = {};
        async.series([
            async function(call){
                //-->

                Log.w('get_message',User_Logic.get_message_by_response(User_Response.EMAIL_UNIQUE_FAIL));
            },
        ],
            function(error, result){
                console.log('CONNECT-DONE');
                done();
            });
    });
});

