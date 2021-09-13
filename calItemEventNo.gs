function listCalendar(){
  var syncToken = PropertiesService.getUserProperties().getProperty('SYNC_TOKEN')
  var page = Calendar.Events.list('primary', {syncToken:syncToken}) ;
  if(page.items && page.items.length > 0){
    for(var i = 0; i< page.items.length ; i++){
      var item = page.items[i]
     event = JSON.stringify(item)
      var res = createEvent(event.summary)
      console.log(res)
    }
    syncToken= page.nextSyncToken;
  }
  PropertiesService.getUserProperties().setProperty('SYNC_TOKEN', syncToken)
}
//////////////////////////////////////////////////////
function listEventsWithinTwoMonth(){
  var calendar = CalendarApp.getDefaultCalendar();  
  var spreadsheet = SpreadsheetApp.getActiveSheet();

  var now = new Date();
  var twoMonthFromNow = new Date(now.getTime() + (24 * 60 * 60 * 30 * 4 * 1000));
  var events = calendar.getEvents(now, twoMonthFromNow);
  if (events.length > 0) {
    // Header Rows
    //spreadsheet.appendRow(["#่","id","StartTime","EndTime","Title","Description"]);
    //for (i = 0; i < events.length; i++) {
      // var event = events[i];
      // Logger.log("" + Utilities.formatDate(event.getStartTime(),"Z","YYYYMMDDhhmmss")+"\\ "+Utilities.formatDate(event.getEndTime(),"Z","YYYYMMDDhhmmss")+"\\ "+event.getTitle()+"\\ "+event.getDescription())
      finalArray = events.map(function (obj) {
        return [Utilities.formatDate(obj.getStartTime(),"Z","YYYYMMdd"),obj.getTitle()];
      });
      Logger.log(finalArray)
      return finalArray

    //}
  } else {
    return []
    //Logger.log('No upcoming events found.');
  }
}

/////////////////////////////////
function addDate(eventID,eventDate,eventTilte) {
          var token ='0eL9EgFhpR5JLMPQBBgWO1fA2diiLiDBQJmfV5uF0XQ'
            var options = {
              "method" : "POST",
              "contentType" : "application/json",
              'muteHttpExceptions': false
            }
          url = "https://db.almanac.ai/api/events/date/"+ eventID +"?auth-token=" + token + "&type=Daily&event_date=" + eventDate + "&event_date_timezone=Z&event_date_description=" + eventTilte
          var response = UrlFetchApp.fetch(url, options);
          var content = response.getContentText()
          //var json = JSON.parse(content)
          //var code =json.data.code
          Logger.log(response)
          return content
          }
