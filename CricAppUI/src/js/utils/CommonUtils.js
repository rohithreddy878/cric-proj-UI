define(['ojs/ojcore','knockout', 'jquery','utils/Constants','ojs/ojvalidator-regexp',
        'ojs/ojasyncvalidator-length',
        'ojs/ojarraydataprovider','ojs/ojconverter-datetime'], 
function (oj,ko,$, Constants, RegExpValidator,AsyncLengthValidator,ArrayDataProvider,
          converterDatetime){
    
    function CommonUtils(){
        var self = this;

        /** common call for ajax functions */
        self.ajaxCall = function (requestType, reqUrl, payload, contentType, dataType, async, successCallBack, failureCallBack, completeCallBack) {
            //console.log(payload);
            $.ajax({
                type: requestType,
                url: reqUrl,
                data: ((requestType == 'GET') || (requestType == 'DELETE')) ? "" : JSON.stringify(payload),
                contentType: (requestType == 'DELETE') ? "" : contentType,
                dataType: (requestType == 'DELETE') ? "" : dataType,
                async: async,
                beforeSend: function(){
                //document.getElementById('global-loader-progresscircle').style.display = "block";
                },
                success: function (res) {
                    //console.log(res);
                    successCallBack(res);
                },
                failure: function (errMsg) {
                    //console.log(errMsg);
                    failureCallBack(errMsg);
                },
                complete: function (xhr, res) {
                    //document.getElementById('global-loader-progresscircle').style.display = "none";
                   completeCallBack(xhr.responseText, xhr);
                }
            });
        };
        
        /** Function to change router path */
        self.changeRoute = function (routerArgs,routerPath, routerParams) {
            routerArgs.router.go(
                {
                    path: routerPath,
                    params: routerParams
                }
            );
        }
    

        /* 
        self.getLoggedInUserInfo = function(){
            if(self.loggedInUserInfo() != null && self.loggedInUserInfo() != undefined){
                return self.loggedInUserInfo();
            }
            else{
                var loggedInUserInfoUrl = Constants.SERVICES_CONTEXT_PATH + "loggedInUser";
                self.ajaxCall("GET", loggedInUserInfoUrl, {}, "", "json", false,
                    //success callback
                    function (data) {
                        successAjaxCalls++;
                    },
                    //failure callback
                    function (data) {
                        failedAjaxCalls++;
                    },
                    // complete call back
                    (xhr, res) => {
                        totalAjaxCalls++; 
                        if (res.status == 200){
                            var data = res.responseJSON;
                            self.loggedInUserInfo = ko.observable({
                                "email":data["email"],
                                "isAdmin":(data["isAdmin"]=="Y") ? true : false,
                                "name": self.formatEmailToName(data["email"]),
                                "userId": data["userId"]
                            });
                        }
                    }
                );
                return self.loggedInUserInfo();
            }    
        }
        */

        self.getLookupsInfo = function(lookupName, lookupCode){
            var result = null;
            var lookupsUrl = Constants.SERVICES_CONTEXT_PATH + "lookups?lookupName="+lookupName+"&lookupCode="+lookupCode;
            self.ajaxCall("GET",lookupsUrl,{},"","json",false,
                //success callback
                function (data) {
                },
                //failuer callback
                function (data) {
                },
                //complete callback
                (xhr, res) => {
                    if(res.status == 200){
                        result = res.responseJSON;
                    }   
                }   
            );
            return result;
        }

        self.getErrorObject = function(errorMessage){
           if(errorMessage=="" || errorMessage==null || errorMessage==undefined) return null; 
           // Error:CRICPLY009:No player Found with id- 2411
           var errorArray = errorMessage.split(":"); 
           var error = {
               "code": errorArray[1],
               "message": errorArray[2]
           };
           return error;
        }
        
        /** function to get user initials from email */
        self.getUserInitials = function (userEmail) {
            var user = userEmail.split("@")[0];
            var userNames = user.split(".");
            var userInitials;
            if (userNames.length == 1)
                userInitials = userNames[0][0] + userNames[0][1];
            else
                userInitials = userNames[0][0] + userNames.slice(-1)[0][0];
            return userInitials.toUpperCase();
        }

        self.getCurrentReadSysdate = function(){
            //desired format: MMM dd, yyyy hh:mm a
            var today = new Date();

            var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
            var curMonth = months[today.getMonth()] ;
            var dayOfMonth = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate();
            var curYear = today.getFullYear();
            var curHour = today.getHours() > 12 ? today.getHours() - 12 : (today.getHours() < 10 ? "0" + today.getHours() : today.getHours());
            var curMinute = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
            var curMeridiem = today.getHours() > 12 ? "PM" : "AM";

            var str = curMonth + " " +  dayOfMonth + ", " + curYear + " " + curHour + ":" + curMinute + " " + curMeridiem;
            console.log("date string: " + str);
            return str;

        }

        
        self.formatEmailToName = function(email){
            email = email.replaceAll('.', ' ');
            var temp = email.split(" ");
            var name = '';
            for(var t in temp){
                if(temp[t][0])
                name += temp[t][0].toUpperCase() + temp[t].slice(1, temp[t].length) + ' ';
            }
            return name;
        }

        self.validateGroup = function (trackerId) {
            const tracker = document.getElementById(trackerId);
            if (tracker.valid === "valid") {
              return true;
            }
            else {
              // show messages on all the components that are invalidHiddden, i.e., the
              // required fields that the user has yet to fill out.
              tracker.showMessages();
              tracker.focusOn("@firstInvalidShown");
              return false;
            }
        }

        self.getFormattedCurrentUTCTime = function () {
            var currentDate = new Date();
            var options = {
                pattern: 'MMM d, y h:mm a',
                timeZoneName: 'UTC',
                isoStrFormat: "local"
            }
            var UTCConverter = new converterDatetime.IntlDateTimeConverter(options);
            var currentUTCDate = UTCConverter.format(currentDate.toISOString());
            currentUTCDate = currentUTCDate + Constants.TIMEZONE_MEANING;
            return currentUTCDate;
        }

        self.formPlaying11Para = function(playing11List){
            team = playing11List.team.name;
            pslist = ['player1','player2','player3','player4','player5','player6','player7','player8','player9','player10','player11'];
            ps = ': ';
            for(p in pslist){
                t = pslist[p];
                if(playing11List[t]!=null){
                    player=playing11List[t];
                    if(player.commonName!=null && player.commonName!="" && player.commonName!=undefined){
                        ps = ps+player.commonName+', ';
                    }
                    else{
                        ps = ps+player.name+', ';
                    }
                }
            }
            let lastIndex = ps.lastIndexOf(",");
            if (lastIndex !== -1) {
                ps = ps.substring(0, lastIndex) + ps.substring(lastIndex + 1);
            }
            return [team,ps];
        }

        self.shortenMatchName = function(longName, team1, team2){
                // Extracting abbreviations
            var t1Abbr = team1.displayName;
            var t2Abbr = team2.displayName;
    
            var shortName = longName.replace(team1.name, t1Abbr).replace(team2.name, t2Abbr);
    
            return shortName;
        }

        self.getEventStageDisplay = function(eventStage){
                if (/^\d+$/.test(eventStage)) {
                    return 'M' + eventStage;
                } else {
                    return eventStage;
                }
        }

        self.formulateOutStringForBatter = function(out,bowler,fielder1,fielder2,kind){
            // out types: ["caught","bowled","lbw","run out","stumped","caught and bowled",
            //             "retired out","retired hurt","hit wicket","obstructing the field"]
            outString = "";
            if(!out) outString = "not out";  
            else{
                if(kind == "lbw") outString = "lbw b "+  bowler;
                else if(kind == "caught") outString = "c "+fielder1 +" b "+  bowler;
                else if(kind == "bowled") outString = "b "+  bowler;
                else if(kind == "stumped") outString = "st "+fielder1 +" b "+  bowler;
                else if(kind == "caught and bowled") outString = "c&b "+  bowler;
                else if(kind == "retired out") outString = "retd out";
                else if(kind == "retired hurt") outString = "retd hurt";
                else if(kind == "hit wicket") outString = "hit wckt";
                else if(kind == "obstructing the field") outString = "obs";
                else if(kind == "run out") {
                    outString = "run out (" +fielder1;
                    if(fielder2!=null && fielder2!="") outString = outString+"/"+fielder2;
                    outString = outString + ")"
                }

            }
            return outString;

        }

    }
    return new CommonUtils();
});