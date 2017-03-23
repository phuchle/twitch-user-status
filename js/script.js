// returns object
function getStreamInfo() {
  var users = ["ESL_SC2", "ESL_Overwatch", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "gronkh", "sacriel"];

  users.forEach(user => {
    var streamInfo = {};
    var url = "https://wind-bow.gomix.me/twitch-api/streams/" + user+ "?callback=?";

    $.getJSON(url, data => {
      if (data.stream === null) {
        streamInfo["channelStatus"] = "offline";
        streamInfo["channelDescription"] = "offline";
      }

      else {
        streamInfo["channelStatus"]  = "online";
        streamInfo["channelDescription"]  = data.stream.channel.status;
        streamInfo["url"] =  data.stream.channel.url;
        streamInfo["logo"] = data.stream.channel.logo;
      }

      streamInfo["user"] = user;
      showStreamInfo(streamInfo);
    });

  });
}

// helper function that changes channel status if account is closed
function channelExists(userToCheck) {
  var channelStillExists;
  var url = "https://wind-bow.gomix.me/twitch-api/channels/" + userToCheck + "?callback=?";
  var tempStatus = document.getElementById(userToCheck + "Description");

  $.getJSON(url, response => {
     channelStillExists = response.status !== 404;
    if (channelStillExists === false) {
      tempStatus.innerText = "Channel is closed";
    }
  });

}

// creates elements
function showStreamInfo(info) {
  var container = document.getElementById('twitch-channels');
  var channelStatus = info.channelStatus;
  var channelDescription = info.channelDescription;
  var user = info.user;
  var url = info.url;
  var game = info.game;
  var logo_url = info.logo;
  var list = document.createElement("li");
  // list.class = channelStatus.replace(/\s+/g, "-");
  list.setAttribute("class", channelStatus);

  // make logo img
  var logo = document.createElement("img");
  logo_url === undefined ? "" : logo.src = logo_url;
  logo.setAttribute("class", "logo");

  // make link to user's channel
  var link = document.createElement("a");
  url === undefined ? "" : link.href = url;
  link.innerText = user;

  // make description
  var description = document.createElement("p");
  description.innerText = channelDescription;
  description.id = user + "Description";

  // append the info to list item
  list.append(logo);
  list.append(link);
  list.append(description);

  container.append(list);
  channelExists(user);
}

document.addEventListener("DOMContentLoaded", function() {
  getStreamInfo();
  $(".selector").click(function(){
    $(".selector").removeClass("active");
    $(this).addClass("active");
    var channelStatus = $(this).attr("id");
    if (channelStatus == "all-filter") {
      $(".online, .offline").show();
    }
    else if (channelStatus == "online-filter") {
      $(".online").show();
      $(".offline").hide();
    }
    else if (channelStatus == "offline-filter") {
      $(".offline").show();
      $(".online").hide();
    }
  });
});
