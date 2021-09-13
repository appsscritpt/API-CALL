function updateHistory() {
var cache = CacheService.getUserCache();
var symbol = cache.get("sym")
var type = cache.get("type")
var sd =cache.get("sd")
var ed = cache.get("ed")
//  console.log( cache.get("sym"))
//   console.log(cache.get("type"))
//   console.log(cache.get("sd"))
//   console.log(cache.get("ed"))
//   return
  console.log(cache.get("ed"))
 if (!symbol || !type|| !sd || !ed) {
   return
 }
  console.log(cache.get("ed"))
  /////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////
  ///////////////////////////
  var alldates 
  alldates=''
    var token ='FbmkvpJIn2F5B3sAWlozO7lWHXdh3Jvd9ulajDYalTQ'//'0eL9EgFhpR5JLMPQBBgWO1fA2diiLiDBQJmfV5uF0XQ'
    var URL_history = 'db.almanac.ai/api/data/history?auth-token='+ token
    var sym = '&symbol='+ symbol //BTCUSDT.BINA'
    if (sd) {
    alldates = '&start-date=' + sd
    }
    if (ed){
    var alldates = alldates + '&end-date='+ ed // 2020-06-01-11-00-00'
    }
    var type = '&type=' + type 
    var options = {
        "method" : "POST",
        "contentType" : "application/json",
        'muteHttpExceptions': false
    }
     url = URL_history + sym  + type + alldates
    // console.log(url)
 
    var response = UrlFetchApp.fetch(url, options);
    var content = response.getContentText()
    var jsonData = JSON.parse(content);
    var newRow =[]
    var result = []
    for (var i = 0; i < jsonData.data.length; i++) {
        var counter = jsonData.data[i];
        newRow.push([counter.open, counter.close,  counter.low,  counter.high,
                counter.symbol, counter.time, //"total-volume": 15219087,
                counter.interval, counter.exchange,//counter.period-volume
        ])
    }
      var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1AkUPK1tH_04YabfxnS0mpHK1rtN8eZdQKoMlJd2TNAs/edit#gid=0')
      var sh = ss.getSheetByName('History')
      sh.getRange(("A2:H")).clearContent()
      sh.getRange(2,1, newRow.length, newRow[0].length).setValues(newRow)
      return
}
///////////////////////////////////////////
///////////////////////////////////
///////////////////////////
////////////////////////////
function updateEventDates(){

      var cache = CacheService.getUserCache();
      id =  cache.get("eID")
     console.log(id)
if (!id) {
  return
  }
   var token ='FbmkvpJIn2F5B3sAWlozO7lWHXdh3Jvd9ulajDYalTQ'//'0eL9EgFhpR5JLMPQBBgWO1fA2diiLiDBQJmfV5uF0XQ'
  var event_id =id //'13419641'
    var URL_events = 'https://db.almanac.ai/api/events/date/' + event_id+'?auth-token='+ token
 var options = {
        "method" : "GET",
        "contentType" : "application/json",
        'muteHttpExceptions': false
    }
var response = UrlFetchApp.fetch(URL_events, options);
    var content = response.getContentText()
    var jsonData = JSON.parse(content);
    var newRow =[]
    var result = []
    for (var i = 0; i < jsonData.length; i++) {
      var counter = jsonData[i];
      newRow.push([counter.event_date_source, counter.event_time_text,  counter.event_date_description,
      counter.event_date_timestamp, counter.event_datetime_text,counter.event_date_longitude, counter.event_date_latitude, counter.event_date_id,counter.event_datetime_timezone,counter.fixed
        ])
    }
    
      var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1AkUPK1tH_04YabfxnS0mpHK1rtN8eZdQKoMlJd2TNAs/edit#gid=0')
      var sh = ss.getSheetByName('Event Dates')
      sh.getRange(("A2:J")).clearContent()
      sh.getRange(2,1, newRow.length, newRow[0].length).setValues(newRow)
      return
      

}


