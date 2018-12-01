/*
Register Steam Web API Key
Your Steam Web API Key
https://apitester.com/
https://api.steampowered.com/ISteamApps/GetAppList/v2/
https://partner.steamgames.com/doc/webapi/ISteamUser

https://partner.steamgames.com/home
https://stackoverflow.com/questions/38422824/get-steam-api-bundle-json
http://store.steampowered.com/api/appdetails?appids=49520

Steam Web APIs available
ISteamNews: Steam provides methods to fetch news feeds for each Steam game.

ISteamUserStats: Steam provides methods to fetch global stat information by game.

ISteamUser: Steam provides API calls to provide information about Steam users.

ITFItems_440: Team Fortress 2 provides API calls to use when accessing player item data.
*/

// install https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=es
// for Allow-Control-Allow-Origin: *

var publishers;
var appitemid;
var appname;

$("#start").on("click", function() {
  function rand() {
    setTimeout(function() {
      rand = Math.floor(Math.random() * Math.floor(70967));
      return rand;
    }, 10);
  }
  for (i = 0; i < 20; i++) {
    rand();

    setTimeout(function() {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          //  console.log(myObj.applist.apps[rand]);
          var selectedApplist = myObj.applist.apps[rand];
          appitemid = selectedApplist.appid;
          appitemname = selectedApplist.name;
          // console.log(appitemid);
          $("<ul>")
            .text(appitemid)
            .appendTo("#Pos");
          $("<ol>").appendTo(
            $("<ul>")
              .text(appitemname.substring(0, 15))
              .appendTo("#GameName")
          );

          //  console.log(myObj.applist.apps[4534]);
        }
      };
      xmlhttp.open("GET", "/Applist.json", false); // async off
      xmlhttp.send();
    }, 10);
    setTimeout(function() {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          //  console.log(myObj[appitemid].data.publishers, "this is the url");
          var publishers = myObj[appitemid].data.publishers;

          $("<ol>").appendTo(
            $("<li>")
              .text(publishers)
              .appendTo("#Publisher")
          );
          //console.log(myObj.applist.apps[4534]);
        }
      };
      xmlhttp.open(
        "GET",
        "http://store.steampowered.com/api/appdetails?appids=" + appitemid,
        false
      );
      var dirtest =
        "http://store.steampowered.com/api/appdetails?appids=" + appitemid;
      xmlhttp.send();
    }, 10);
    setTimeout(function() {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          // console.log(myObj[appitemid].data.publishers, "this is the url");
          //  var publishers = myObj[appitemid].data.publishers;
          console.log(myObj[appitemid].data.website);
          var website = myObj[appitemid].data.website;

          $("<ol>").appendTo(
            $("<li>")
              .text(website)
              .appendTo(
                $("<a>")
                  .attr("href", website)
                  .appendTo("#link")
              )
          );
          //console.log(myObj.applist.apps[4534]);
        } else {
          //console.log(myObj.applist.apps[4534]);
        }
      };
      xmlhttp.open(
        "GET",
        "http://store.steampowered.com/api/appdetails?appids=" + appitemid,
        false
      );
      var dirtest =
        "http://store.steampowered.com/api/appdetails?appids=" + appitemid;
      xmlhttp.send();
    }, 10);
  }
});
