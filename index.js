/*
Copyright 2016 Certified CoderZ
Author: Brandon Poole Sr. (biz9framework@gmail.com)
License GNU General Public License v3.0
Description: BiZ9 Framework: User
*/
const {Scriptz}=require("biz9-scriptz");
const {Log,Str,Num,Obj}=require("biz9-utility");
const {Data_Logic} = require("biz9-data-logic");

class User_Url {
    static LOGIN="biz9/user/login";
    static LOGOUT="biz9/user/logout";
    static REGISTER="biz9/user/register";
    static POST="biz9/user/post";
    static PING_GET="biz9/user/ping_get";
    static PING_POST="biz9/user/ping_post";
}
class User_Stat {
    static POST_LOGIN="post_login";
    static POST_REGISTER="post_register";
}
class User_Table {
    static Blank='blank_biz';
    static USER='user_biz';
}
class User_Title {
    static USER='User';
    static SUPER_ADMIN='Super Admin';
    static ADMIN='Admin';
    static MANAGER='Manager';
    static USER='User';
    static GUEST='Guest';
}
class User_Type {
    //role
    static ADMIN='admin';
    static GUEST='guest';
    static MANAGER='manager';
    static SUPER_ADMIN='super_admin';
    static USER='user';
    //result
    static RESULT_OK_EMAIL = 'email_resultOK';
    static RESULT_OK_UNIQUE_EMAIL = 'unique_email_resultOK';
    static RESULT_OK_UNIQUE_USERNAME = 'unique_username_resultOK';
    static RESULT_OK_FAVORITE_ADD = 'favorite_resultOK';
    static RESULT_OK_PASSWORD = 'password_passwordOK';
    static RESULT_OK_USERNAME = 'username_resultOK';
    static RESULT_OK_USER = 'user_resultOK';
}
class User_Field {
    static USER = 'user';
    static USER_ID = 'user_id';
    static CITY = 'city';
    static COUNTRY = 'country';
    static EMAIL = 'email';
    static FIRST_NAME = 'first_name';
    static GENDER = 'gender';
    static LAST_NAME = 'last_name';
    static USERNAME = 'username';
    static PASSWORD = 'password';
    static ROLE = 'role';
    static STATE = 'state';
    static WEBSITE = 'website';
}
class User_Logic {
    static get_user_roles = () =>{
        return [
            {
                value:User_Type.SUPER_ADMIN,
                label:User_Title.SUPER_ADMIN,
                title:User_Title.SUPER_ADMIN
            },

            {
                value:User_Type.ADMIN,
                label:User_Title.ADMIN,
                title:User_Title.ADMIN
            },
            {
                value:User_Type.MANAGER,
                label:User_Title.MANAGER,
                title:User_Type.MANAGER
            },
            {
                value:User_Type.USER,
                label:User_Title.USER,
                title:User_Title.USER
            },
            {
                value:User_Type.GUEST,
                label:User_Title.GUEST,
                title:User_Title.GUEST
            },
        ];
    };
    static get_check_user = (post_user) =>{
        post_user[User_Type.RESULT_OK_USER] = false;
        post_user[User_Type.RESULT_OK_USERNAME] = false;
        post_user[User_Type.RESULT_OK_EMAIL] = false;
        post_user[User_Type.RESULT_OK_PASSWORD] = false;
        return post_user;
    }
    static get_clean_user = (post_user) =>{
        delete post_user[User_Type.RESULT_OK_USER];
        delete post_user[User_Type.RESULT_OK_USERNAME];
        delete post_user[User_Type.RESULT_OK_EMAIL];
        delete post_user[User_Type.RESULT_OK_PASSWORD];
        return post_user;
    }
    static get_user_role_by_type = (type) =>{
        let item_match =  User_Logic.get_user_roles().find(item_find => item_find.value === type);
        if(item_match){
            return item_match;
        }else{
            return {value:User_Type.GUEST,label:User_Title.GUEST,title:User_Title.GUEST};
        }
    };
    static get_country_state_city = (item) =>{
        let country_state_city = "";
        if(item.country == "United States"){
            let state = "";
            if(!Str.check_is_null(item.state)){
                country_state_city = item.state;
            }
            if(!Str.check_is_null(item.city)){
                if(!Str.check_is_null(item.state)){
                    country_state_city = item.city + ", " + item.state;
                }else{
                    country_state_city = item.city;
                }
            }
        }
        else{
            if(!Str.check_is_null(item.city)){
                country_state_city = item.city + ", " + item.country;
            }else{
                country_state_city = item.country;
            }
        }
        return country_state_city;
    }
    static get_full_name = (first_name,last_name) =>{
        let str_first_name = !Str.check_is_null(first_name) ? first_name : "";
        let str_last_name = !Str.check_is_null(last_name) ? last_name : "";
        return !Str.check_is_null(String(str_first_name + " " + str_last_name)) ? String(str_first_name + " " + str_last_name).trim() : "N/A";
    }
    static get_guest = () =>{
        return Data_Logic.get(User_Table.USER,0,{data:{is_guest:true,title_url:'guest',first_name:'Guest',last_name:'User',email:'guest@email.com',title:"Guest",country:"United States"}});
    }
    static get_request_user = (req) =>{
        if(!req || !req.session.user){
            let user=Data_Logic.get(User_Table.USER,Num.get_id(9999999),{data:{is_guest:true}});
            req.session.user=user;
        }
        return req.session.user;
    };
    static post_request_user = (req,user) =>{
        req.session.user=user;
    };
    static delete_request_user = (req) =>{
        req.session.user=null;
        delete req.session.user;
    };
    static get_test = (option) =>{
        return User_Logic.get_test_user(option);
    };
    static get_test_user = (option) =>{
        option = !Obj.check_is_empty(option) ? option : {};
        let data = Data_Logic.get(User_Table.USER,0,option);
        data.role=User_Type.GUEST;
        data.title="title_"+ Num.get_id();
        data.title_url = Str.get_title_url(data.title);
        data.username="username_"+ Num.get_id();
        data.first_name="First Name "+ Num.get_id();
        data.last_name="First Name "+ Num.get_id();
        data.email="email"+ Num.get_id() + "@email.com";
        data.city="City "+ Num.get_id();
        data.state= Region_Logic.get_states()[Num.get_id(Region_Logic.get_states().length)].label;
        data.country= Region_Logic.get_countries()[Num.get_id(Region_Logic.get_countries().length)].label;
        data.password="1234567";
        return data;
    };
}
class Region_Logic {
    static get_countries = () =>{
        return [
            {label: 'United States', value: 'United States'},
            {
                value: 'Afghanistan',
                label: 'Afghanistan'
            },
            {
                value: 'Albania',
                label: 'Albania'
            },
            {
                value: 'Algeria',
                label: 'Algeria'
            },
            {
                value: 'American Samoa',
                label: 'American Samoa'
            },
            {
                value: 'Andorra',
                label: 'Andorra'
            },
            {
                value: 'Angola',
                label: 'Angola'
            },
            {
                value: 'Anguilla',
                label: 'Anguilla'
            },
            {
                value: 'Antarctica',
                label: 'Antarctica'
            },
            {
                value: 'Antigua and Barbuda',
                label: 'Antigua and Barbuda'
            },
            {
                value: 'Argentina',
                label: 'Argentina'
            },
            {
                value: 'Armenia',
                label: 'Armenia'
            },
            {
                value: 'Aruba',
                label: 'Aruba'
            },
            {
                value: 'Australia',
                label: 'Australia'
            },
            {
                value: 'Austria',
                label: 'Austria'
            },
            {
                value: 'Azerbaijan',
                label: 'Azerbaijan'
            },
            {
                value: 'Bahamas',
                label: 'Bahamas'
            },
            {
                value: 'Bahrain',
                label: 'Bahrain'
            },
            {
                value: 'Bangladesh',
                label: 'Bangladesh'
            },
            {
                value: 'Barbados',
                label: 'Barbados'
            },
            {
                value: 'Belarus',
                label: 'Belarus'
            },
            {
                value: 'Belgium',
                label: 'Belgium'
            },
            {
                value: 'Belize',
                label: 'Belize'
            },
            {
                value: 'Benin',
                label: 'Benin'
            },
            {
                value: 'Bermuda',
                label: 'Bermuda'
            },
            {
                value: 'Bhutan',
                label: 'Bhutan'
            },
            {
                value: 'Bolivia (Plurinational State of)',
                label: 'Bolivia (Plurinational State of)'
            },
            {
                value: 'Bonaire, Sint Eustatius and Saba',
                label: 'Bonaire, Sint Eustatius and Saba'
            },
            {
                value: 'Bosnia and Herzegovina',
                label: 'Bosnia and Herzegovina'
            },
            {
                value: 'Botswana',
                label: 'Botswana'
            },
            {
                value: 'Bouvet Island',
                label: 'Bouvet Island'
            },
            {
                value: 'Brazil',
                label: 'Brazil'
            },
            {
                value: 'British Indian Ocean Territory',
                label: 'British Indian Ocean Territory'
            },
            {
                value: 'Brunei Darussalam',
                label: 'Brunei Darussalam'
            },
            {
                value: 'Bulgaria',
                label: 'Bulgaria'
            },
            {
                value: 'Burkina Faso',
                label: 'Burkina Faso'
            },
            {
                value: 'Burundi',
                label: 'Burundi'
            },
            {
                value: 'Cabo Verde',
                label: 'Cabo Verde'
            },
            {
                value: 'Cambodia',
                label: 'Cambodia'
            },
            {
                value: 'Cameroon',
                label: 'Cameroon'
            },
            {
                value: 'Canada',
                label: 'Canada'
            },
            {
                value: 'Cayman Islands',
                label: 'Cayman Islands'
            },
            {
                value: 'Central African Republic',
                label: 'Central African Republic'
            },
            {
                value: 'Chad',
                label: 'Chad'
            },
            {
                value: 'Chile',
                label: 'Chile'
            },
            {
                value: 'China',
                label: 'China'
            },
            {
                value: 'Christmas Island',
                label: 'Christmas Island'
            },
            {
                value: 'Cocos (Keeling) Islands',
                label: 'Cocos (Keeling) Islands'
            },
            {
                value: 'Colombia',
                label: 'Colombia'
            },
            {
                value: 'Comoros',
                label: 'Comoros'
            },
            {
                value: 'Congo',
                label: 'Congo'
            },
            {
                value: 'Congo (Democratic Republic of the)',
                label: 'Congo (Democratic Republic of the)'
            },
            {
                value: 'Cook Islands',
                label: 'Cook Islands'
            },
            {
                value: 'Costa Rica',
                label: 'Costa Rica'
            },
            {
                value: 'Croatia',
                label: 'Croatia'
            },
            {
                value: 'Cuba',
                label: 'Cuba'
            },
            {
                value: 'Curaçao',
                label: 'Curaçao'
            },
            {
                value: 'Cyprus',
                label: 'Cyprus'
            },
            {
                value: 'Czechia',
                label: 'Czechia'
            },
            {
                value: "Côte d'Ivoire",
                label: "Côte d'Ivoire"
            },
            {
                value: 'Denmark',
                label: 'Denmark'
            },
            {
                value: 'Djibouti',
                label: 'Djibouti'
            },
            {
                value: 'Dominica',
                label: 'Dominica'
            },
            {
                value: 'Dominican Republic',
                label: 'Dominican Republic'
            },
            {
                value: 'Ecuador',
                label: 'Ecuador'
            },
            {
                value: 'Egypt',
                label: 'Egypt'
            },
            {
                value: 'El Salvador',
                label: 'El Salvador'
            },
            {
                value: 'Equatorial Guinea',
                label: 'Equatorial Guinea'
            },
            {
                value: 'Eritrea',
                label: 'Eritrea'
            },
            {
                value: 'Estonia',
                label: 'Estonia'
            },
            {
                value: 'Ethiopia',
                label: 'Ethiopia'
            },
            {
                value: 'Falkland Islands (Malvinas)',
                label: 'Falkland Islands (Malvinas)'
            },
            {
                value: 'Faroe Islands',
                label: 'Faroe Islands'
            },
            {
                value: 'Fiji',
                label: 'Fiji'
            },
            {
                value: 'Finland',
                label: 'Finland'
            },
            {
                value: 'France',
                label: 'France'
            },
            {
                value: 'French Guiana',
                label: 'French Guiana'
            },
            {
                value: 'French Polynesia',
                label: 'French Polynesia'
            },
            {
                value: 'French Southern Territories',
                label: 'French Southern Territories'
            },
            {
                value: 'Gabon',
                label: 'Gabon'
            },
            {
                value: 'Gambia',
                label: 'Gambia'
            },
            {
                value: 'Georgia',
                label: 'Georgia'
            },
            {
                value: 'Germany',
                label: 'Germany'
            },
            {
                value: 'Ghana',
                label: 'Ghana'
            },
            {
                value: 'Gibraltar',
                label: 'Gibraltar'
            },
            {
                value: 'Greece',
                label: 'Greece'
            },
            {
                value: 'Greenland',
                label: 'Greenland'
            },
            {
                value: 'Grenada',
                label: 'Grenada'
            },
            {
                value: 'Guadeloupe',
                label: 'Guadeloupe'
            },
            {
                value: 'Guam',
                label: 'Guam'
            },
            {
                value: 'Guatemala',
                label: 'Guatemala'
            },
            {
                value: 'Guernsey',
                label: 'Guernsey'
            },
            {
                value: 'Guinea',
                label: 'Guinea'
            },
            {
                value: 'Guinea-Bissau',
                label: 'Guinea-Bissau'
            },
            {
                value: 'Guyana',
                label: 'Guyana'
            },
            {
                value: 'Haiti',
                label: 'Haiti'
            },
            {
                value: 'Heard Island and McDonald Islands',
                label: 'Heard Island and McDonald Islands'
            },
            {
                value: 'Holy See',
                label: 'Holy See'
            },
            {
                value: 'Honduras',
                label: 'Honduras'
            },
            {
                value: 'Hong Kong',
                label: 'Hong Kong'
            },
            {
                value: 'Hungary',
                label: 'Hungary'
            },
            {
                value: 'Iceland',
                label: 'Iceland'
            },
            {
                value: 'India',
                label: 'India'
            },
            {
                value: 'Indonesia',
                label: 'Indonesia'
            },
            {
                value: 'Iran (Islamic Republic of)',
                label: 'Iran (Islamic Republic of)'
            },
            {
                value: 'Iraq',
                label: 'Iraq'
            },
            {
                value: 'Ireland',
                label: 'Ireland'
            },
            {
                value: 'Isle of Man',
                label: 'Isle of Man'
            },
            {
                value: 'Israel',
                label: 'Israel'
            },
            {
                value: 'Italy',
                label: 'Italy'
            },
            {
                value: 'Jamaica',
                label: 'Jamaica'
            },
            {
                value: 'Japan',
                label: 'Japan'
            },
            {
                value: 'Jersey',
                label: 'Jersey'
            },
            {
                value: 'Jordan',
                label: 'Jordan'
            },
            {
                value: 'Kazakhstan',
                label: 'Kazakhstan'
            },
            {
                value: 'Kenya',
                label: 'Kenya'
            },
            {
                value: 'Kiribati',
                label: 'Kiribati'
            },
            {
                value: "Korea (Democratic People's Republic of)",
                label: "Korea (Democratic People's Republic of)"
            },
            {
                value: 'Korea (Republic of)',
                label: 'Korea (Republic of)'
            },
            {
                value: 'Kuwait',
                label: 'Kuwait'
            },
            {
                value: 'Kyrgyzstan',
                label: 'Kyrgyzstan'
            },
            {
                value: "Lao People's Democratic Republic",
                label: "Lao People's Democratic Republic"
            },
            {
                value: 'Latvia',
                label: 'Latvia'
            },
            {
                value: 'Lebanon',
                label: 'Lebanon'
            },
            {
                value: 'Lesotho',
                label: 'Lesotho'
            },
            {
                value: 'Liberia',
                label: 'Liberia'
            },
            {
                value: 'Libya',
                label: 'Libya'
            },
            {
                value: 'Liechtenstein',
                label: 'Liechtenstein'
            },
            {
                value: 'Lithuania',
                label: 'Lithuania'
            },
            {
                value: 'Luxembourg',
                label: 'Luxembourg'
            },
            {
                value: 'Macao',
                label: 'Macao'
            },
            {
                value: 'Macedonia (the former Yugoslav Republic of)',
                label: 'Macedonia (the former Yugoslav Republic of)'
            },
            {
                value: 'Madagascar',
                label: 'Madagascar'
            },
            {
                value: 'Malawi',
                label: 'Malawi'
            },
            {
                value: 'Malaysia',
                label: 'Malaysia'
            },
            {
                value: 'Maldives',
                label: 'Maldives'
            },
            {
                value: 'Mali',
                label: 'Mali'
            },
            {
                value: 'Malta',
                label: 'Malta'
            },
            {
                value: 'Marshall Islands',
                label: 'Marshall Islands'
            },
            {
                value: 'Martinique',
                label: 'Martinique'
            },
            {
                value: 'Mauritania',
                label: 'Mauritania'
            },
            {
                value: 'Mauritius',
                label: 'Mauritius'
            },
            {
                value: 'Mayotte',
                label: 'Mayotte'
            },
            {
                value: 'Mexico',
                label: 'Mexico'
            },
            {
                value: 'Micronesia (Federated States of)',
                label: 'Micronesia (Federated States of)'
            },
            {
                value: 'Moldova (Republic of)',
                label: 'Moldova (Republic of)'
            },
            {
                value: 'Monaco',
                label: 'Monaco'
            },
            {
                value: 'Mongolia',
                label: 'Mongolia'
            },
            {
                value: 'Montenegro',
                label: 'Montenegro'
            },
            {
                value: 'Montserrat',
                label: 'Montserrat'
            },
            {
                value: 'Morocco',
                label: 'Morocco'
            },
            {
                value: 'Mozambique',
                label: 'Mozambique'
            },
            {
                value: 'Myanmar',
                label: 'Myanmar'
            },
            {
                value: 'Namibia',
                label: 'Namibia'
            },
            {
                value: 'Nauru',
                label: 'Nauru'
            },
            {
                value: 'Nepal',
                label: 'Nepal'
            },
            {
                value: 'Netherlands',
                label: 'Netherlands'
            },
            {
                value: 'New Caledonia',
                label: 'New Caledonia'
            },
            {
                value: 'New Zealand',
                label: 'New Zealand'
            },
            {
                value: 'Nicaragua',
                label: 'Nicaragua'
            },
            {
                value: 'Niger',
                label: 'Niger'
            },
            {
                value: 'Nigeria',
                label: 'Nigeria'
            },
            {
                value: 'Niue',
                label: 'Niue'
            },
            {
                value: 'Norfolk Island',
                label: 'Norfolk Island'
            },
            {
                value: 'Northern Mariana Islands',
                label: 'Northern Mariana Islands'
            },
            {
                value: 'Norway',
                label: 'Norway'
            },
            {
                value: 'Oman',
                label: 'Oman'
            },
            {
                value: 'Pakistan',
                label: 'Pakistan'
            },
            {
                value: 'Palau',
                label: 'Palau'
            },
            {
                value: 'Palestine, State of',
                label: 'Palestine, State of'
            },
            {
                value: 'Panama',
                label: 'Panama'
            },
            {
                value: 'Papua New Guinea',
                label: 'Papua New Guinea'
            },
            {
                value: 'Paraguay',
                label: 'Paraguay'
            },
            {
                value: 'Peru',
                label: 'Peru'
            },
            {
                value: 'Philippines',
                label: 'Philippines'
            },
            {
                value: 'Pitcairn',
                label: 'Pitcairn'
            },
            {
                value: 'Poland',
                label: 'Poland'
            },
            {
                value: 'Portugal',
                label: 'Portugal'
            },
            {
                value: 'Puerto Rico',
                label: 'Puerto Rico'
            },
            {
                value: 'Qatar',
                label: 'Qatar'
            },
            {
                value: 'Romania',
                label: 'Romania'
            },
            {
                value: 'Russian Federation',
                label: 'Russian Federation'
            },
            {
                value: 'Rwanda',
                label: 'Rwanda'
            },
            {
                value: 'Réunion',
                label: 'Réunion'
            },
            {
                value: 'Saint Barthélemy',
                label: 'Saint Barthélemy'
            },
            {
                value: 'Saint Helena, Ascension and Tristan da Cunha',
                label: 'Saint Helena, Ascension and Tristan da Cunha'
            },
            {
                value: 'Saint Kitts and Nevis',
                label: 'Saint Kitts and Nevis'
            },
            {
                value: 'Saint Lucia',
                label: 'Saint Lucia'
            },
            {
                value: 'Saint Martin (French part)',
                label: 'Saint Martin (French part)'
            },
            {
                value: 'Saint Pierre and Miquelon',
                label: 'Saint Pierre and Miquelon'
            },
            {
                value: 'Saint Vincent and the Grenadines',
                label: 'Saint Vincent and the Grenadines'
            },
            {
                value: 'Samoa',
                label: 'Samoa'
            },
            {
                value: 'San Marino',
                label: 'San Marino'
            },
            {
                value: 'Sao Tome and Principe',
                label: 'Sao Tome and Principe'
            },
            {
                value: 'Saudi Arabia',
                label: 'Saudi Arabia'
            },
            {
                value: 'Senegal',
                label: 'Senegal'
            },
            {
                value: 'Serbia',
                label: 'Serbia'
            },
            {
                value: 'Seychelles',
                label: 'Seychelles'
            },
            {
                value: 'Sierra Leone',
                label: 'Sierra Leone'
            },
            {
                value: 'Singapore',
                label: 'Singapore'
            },
            {
                value: 'Sint Maarten (Dutch part)',
                label: 'Sint Maarten (Dutch part)'
            },
            {
                value: 'Slovakia',
                label: 'Slovakia'
            },
            {
                value: 'Slovenia',
                label: 'Slovenia'
            },
            {
                value: 'Solomon Islands',
                label: 'Solomon Islands'
            },
            {
                value: 'Somalia',
                label: 'Somalia'
            },
            {
                value: 'South Africa',
                label: 'South Africa'
            },
            {
                value: 'South Georgia and the South Sandwich Islands',
                label: 'South Georgia and the South Sandwich Islands'
            },
            {
                value: 'South Sudan',
                label: 'South Sudan'
            },
            {
                value: 'Spain',
                label: 'Spain'
            },
            {
                value: 'Sri Lanka',
                label: 'Sri Lanka'
            },
            {
                value: 'Sudan',
                label: 'Sudan'
            },
            {
                value: 'Suriname',
                label: 'Suriname'
            },
            {
                value: 'Svalbard and Jan Mayen',
                label: 'Svalbard and Jan Mayen'
            },
            {
                value: 'Swaziland',
                label: 'Swaziland'
            },
            {
                value: 'Sweden',
                label: 'Sweden'
            },
            {
                value: 'Switzerland',
                label: 'Switzerland'
            },
            {
                value: 'Syrian Arab Republic',
                label: 'Syrian Arab Republic'
            },
            {
                value: 'Taiwan Republic of China',
                label: 'Taiwan Republic of China'
            },
            {
                value: 'Tajikistan',
                label: 'Tajikistan'
            },
            {
                value: 'Tanzania, United Republic of',
                label: 'Tanzania, United Republic of'
            },
            {
                value: 'Thailand',
                label: 'Thailand'
            },
            {
                value: 'Timor-Leste',
                label: 'Timor-Leste'
            },
            {
                value: 'Togo',
                label: 'Togo'
            },
            {
                value: 'Tokelau',
                label: 'Tokelau'
            },
            {
                value: 'Tonga',
                label: 'Tonga'
            },
            {
                value: 'Trinidad and Tobago',
                label: 'Trinidad and Tobago'
            },
            {
                value: 'Tunisia',
                label: 'Tunisia'
            },
            {
                value: 'Turkey',
                label: 'Turkey'
            },
            {
                value: 'Turkmenistan',
                label: 'Turkmenistan'
            },
            {
                value: 'Turks and Caicos Islands',
                label: 'Turks and Caicos Islands'
            },
            {
                value: 'Tuvalu',
                label: 'Tuvalu'
            },
            {
                value: 'Uganda',
                label: 'Uganda'
            },
            {
                value: 'Ukraine',
                label: 'Ukraine'
            },
            {
                value: 'United Arab Emirates',
                label: 'United Arab Emirates'
            },
            {
                value: 'United Kingdom of Great Britain and Northern Ireland',
                label: 'United Kingdom of Great Britain and Northern Ireland'
            },
            {
                value: 'United States Minor Outlying Islands',
                label: 'United States Minor Outlying Islands'
            },
            {
                value: 'United States of America',
                label: 'United States of America'
            },
            {
                value: 'Uruguay',
                label: 'Uruguay'
            },
            {
                value: 'Uzbekistan',
                label: 'Uzbekistan'
            },
            {
                value: 'Vanuatu',
                label: 'Vanuatu'
            },
            {
                value: 'Venezuela (Bolivarian Republic of)',
                label: 'Venezuela (Bolivarian Republic of)'
            },
            {
                value: 'Vietnam',
                label: 'Vietnam'
            },
            {
                value: 'Virgin Islands (British)',
                label: 'Virgin Islands (British)'
            },
            {
                value: 'Virgin Islands (U.S.)',
                label: 'Virgin Islands (U.S.)'
            },
            {
                value: 'Wallis and Futuna',
                label: 'Wallis and Futuna'
            },
            {
                value: 'Western Sahara',
                label: 'Western Sahara'
            },
            {
                value: 'Yemen',
                label: 'Yemen'
            },
            {
                value: 'Zambia',
                label: 'Zambia'
            },
            {
                value: 'Zimbabwe',
                label: 'Zimbabwe'
            },
            {
                value: 'Åland Islands',
                label: 'Åland Islands'
            }
        ];
    };
    static get_states = () =>{
        return       [
            {
                label: "Other",
                value: "Other"
            },
            { label: "Alaska", value: "Alaska" },
            { label: "Alabama", value: "Alabama" },
            { label: "Arkansas", value: "Arkansas" },
            { label: "Arizona", value: "Arizona" },
            { label: "California", value: "California" },
            { label: "Colorado", value: "Colorado" },
            { label: "Connecticut", value: "Connecticut" },
            { label: "District of Columbia", value: "District of Columbia" },
            { label: "Delaware", value: "Delaware" },
            { label: "Florida", value: "Florida" },
            { label: "Georgia", value: "Georgia" },
            { label: "Hawaii", value: "Hawaii" },
            { label: "Iowa", value: "Iowa" },
            { label: "Idaho", value: "Idaho" },
            { label: "IL", value: "Illinois" },
            { label: "Illinois", value: "Indiana" },
            { label: "Kansas", value: "Kansas" },
            { label: "Kentucky", value: "Kentucky" },
            { label: "Louisiana", value: "Louisiana" },
            { label: "Massachusetts", value: "Massachusetts" },
            { label: "Maryland", value: "Maryland" },
            { label: "Maine", value: "Maine" },
            { label: "Michigan", value: "Michigan" },
            { label: "Minnesota", value: "Minnesota" },
            { label: "Missouri", value: "Missouri" },
            { label: "Mississippi", value: "Mississippi" },
            { label: "Montana", value: "Montana" },
            { label: "North Carolina", value: "North Carolina" },
            { label: "North Dakota", value: "North Dakota" },
            { label: "Nebraska", value: "Nebraska" },
            { label: "New Hampshire", value: "New Hampshire" },
            { label: "New Jersey", value: "New Jersey" },
            { label: "New Mexico", value: "New Mexico" },
            { label: "Nevada", value: "Nevada" },
            { label: "New York", value: "NewYork" },
            { label: "Ohio", value: "Ohio" },
            { label: "Oklahoma", value: "Oklahoma" },
            { label: "Oregon", value: "Oregon" },
            { label: "Pennsylvania", value: "Pennsylvania" },
            { label: "Rhode Island", value: "Rhode Island" },
            { label: "South Carolina", value: "South Carolina" },
            { label: "South Dakota", value: "South Dakota" },
            { label: "Tennessee", value: "Tennessee" },
            { label: "Texas", value: "Texas" },
            { label: "Utah", value: "Utah" },
            { label: "Virginia", value: "Virginia" },
            { label: "Vermont", value: "Vermont" },
            { label: "Washington", value: "Washington" },
            { label: "Wisconsin", value: "Wisconsin" },
            { label: "West Virginia", value: "West Virginia" },
            { label: "Wyoming", value: "Wyoming" },
        ];
    }
}
module.exports = {
    Region_Logic,
    User_Field,
    User_Logic,
    User_Stat,
    User_Title,
    User_Table,
    User_Type,
    User_Url
};
