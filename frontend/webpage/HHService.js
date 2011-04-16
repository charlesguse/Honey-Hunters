function HHService(serverUrl, gameId) {
  this.gameId = gameId;
  this.ajaxServer = serverUrl;
  this.lastReturnValue = null;
}

HHService.prototype.setupGame = function(playerName) {
  var ajaxUrl = this.ajaxServer + "/SetupHex/" + this.gameId;
  if (playerName != null && playerName != "")
    ajaxUrl += "/" + playerName;
    
  $.ajax({
    url: ajaxUrl,
    async: false,
    dataType: 'json',
    context: this,
    success: function(data) { this.lastReturnValue = data; }
  });
  
  return this.lastReturnValue;
}

HHService.prototype.getGameState = function(playerId) {
  var ajaxUrl = this.ajaxServer + "/Status/" + this.gameId + "/" + playerId;
    
  $.ajax({
    url: ajaxUrl,
    async: false,
    dataType: 'json',
    context: this,
    success: function(data) { this.lastReturnValue = data; }
  });
  
  return this.lastReturnValue;
}

HHService.prototype.submitMove = function(playerId, x, y) {
  var ajaxUrl = this.ajaxServer + "/Move/" + this.gameId + "/" + playerId + "/" + x + "/" + y;
    
  $.ajax({
    url: ajaxUrl,
    async: false,
    dataType: 'json',
    context: this,
    success: function(data) { this.lastReturnValue = data; }
  });
  
  return this.lastReturnValue;
}

HHService.prototype.getDebugInfo = function() {
}

HHService.prototype.getTotalGames = function() {
}