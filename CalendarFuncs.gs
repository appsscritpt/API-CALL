function init() {
  var syncToken ;
  var page = Calendar.Events.list('primary', {}) ;
  if(page.items && page.items.length > 0){
    syncToken= page.nextSyncToken;
  }
  
  PropertiesService.getUserProperties().setProperty('SYNC_TOKEN', syncToken)
  
  ScriptApp.newTrigger('calendarSync')
  .forUserCalendar(Session.getEffectiveUser().getEmail())
  .onEventUpdated()
  .create()
}
/////////////////////////

function calendarSync(e){
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

function createEvent(event_name) {
    var token ='0eL9EgFhpR5JLMPQBBgWO1fA2diiLiDBQJmfV5uF0XQ'
    //var event_name ='Abed Test Event'
    var URL_events = 'https://db.almanac.ai/api/events'
    
    var options = {
        "method" : "POST",
        "contentType" : "application/json",
        'muteHttpExceptions': false
    }
    url ="https://db.almanac.ai/api/events?auth-token="+ token+"&event_name="+ event_name +"&event_edit=private&event_read=public"
    var response = UrlFetchApp.fetch(url, options)
    var content = response.getContentText()
     var jsonData = JSON.parse(content)
    //14090093
    //14092425
    //14095237
    //14095240
    //14095241
    return jsonData
}


// Do what you want
    //   {
    // "status": "confirmed",
    // "summary": "test",
    // "kind": "calendar#event",
    // "eventType": "default",
    // "created": "2021-09-04T12:17:55.000Z",
    // "id": "2o8irtof27jolakpr920hrgfee",
    // "reminders": {
    //     "useDefault": true
    // },
    // "sequence": 0,
    // "organizer": {
    //     "self": true,
    //     "email": "appsscriptcode@gmail.com"
    // },
    // "creator": {
    //     "email": "appsscriptcode@gmail.com",
    //     "self": true
    // },
    // "end": {
    //     "dateTime": "2021-09-04T18:00:00+03:00"
    // },
    // "updated": "2021-09-04T12:17:55.616Z",
    // "htmlLink": "https://www.google.com/calendar/event?eid=Mm84aXJ0b2YyN2pvbGFrcHI5MjBocmdmZWUgYXBwc3NjcmlwdGNvZGVAbQ",
    // "iCalUID": "2o8irtof27jolakpr920hrgfee@google.com",
    // "start": {
    //     "dateTime": "2021-09-04T17:00:00+03:00"
    // },
    // "etag": "\"3261515751232000\""
//}
