from google.appengine.ext.webapp.util import run_wsgi_app
import web
import simplejson as json
import game.game_management as gm
import game.game_board_hex as gbh
import uuid
import Queue                              

accessControlAllowOriginValue = "*" #"http://nonegames.net"
        
urls = (
    '/HH/Status/(.*)/(.*)', 'HoneyHuntersGameStatus',
    '/HH/Status/(.*)', 'HoneyHuntersGameStatusDebug',
    '/HH/Move/(.*)/(.*)/(\d*)/(\d*)', 'HoneyHuntersMove',
    '/HH/SetupHex/(.*)', 'HoneyHuntersSetupHexGame',
    '/HH/JoinHex/(.*)', 'HoneyHuntersJoinHexGame',
    '/HH/MatchmakerHex', 'HoneyHuntersMatchmakerHex',
    '/HH/TotalGames', 'HoneyHuntersTotalGames',
    '/HH/TotalStatus', 'HoneyHuntersTotalStatus'
)
app = web.application(urls, globals())
games = gm.GameManagement()

matchmaker_queue = Queue.Queue()

def jsonDump(func):
    def jsonizeFunc(*args, **kwargs):
        return json.dumps(func(*args, **kwargs))
    return jsonizeFunc
    
class HoneyHuntersTotalGames:
    @jsonDump
    def GET(self):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        return {'TotalGames': games.TotalGames()}
        
class HoneyHuntersTotalStatus:
    @jsonDump
    def GET(self):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        return games.GetStats()
        
class HoneyHuntersGameStatus:
    @jsonDump
    def GET(self, gameId, playerId):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        currentGame = games.GetGame(gameId)
        if games.Validate(currentGame, playerId) == False:
            return {'GameStatus': False}
        else:
            return {
                'GameStatus': True,
                'GameStart': currentGame.PlayersExist(),
                'Turn': currentGame.PlayersTurn(playerId),
                'PlayerScore': currentGame.GetPlayerScore(playerId),
                'OpponentScore': currentGame.GetOtherPlayerScore(playerId),
                'Board': currentGame.displayBoard,
                'GameOver': currentGame.CheckGameOver(),
                'Winner': currentGame.CheckWinner(playerId),
                'TotalHoney': currentGame.TotalHoney()
            }
            
class HoneyHuntersGameStatusDebug:
    @jsonDump
    def GET(self, gameId):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        currentGame = games.GetGame(gameId)
        if games.Validate(currentGame) == False:
            return {'GameStatus': False}
        else:
            playerId = currentGame.playerOne
            return {
                'GameStatus': True,
                'GameStart': currentGame.PlayersExist(),
                'Turn': currentGame.PlayersTurn(playerId),
                'PlayerScore': currentGame.GetPlayerScore(playerId),
                'OpponentScore': currentGame.GetOtherPlayerScore(playerId),
                'Board': currentGame.displayBoard,
                'GameOver': currentGame.CheckGameOver(),
                'Winner': currentGame.CheckWinner(playerId),
                'TotalHoney': currentGame.TotalHoney(),
                'GameType': currentGame.__class__.__name__ 
            }
            
class HoneyHuntersMove:
    @jsonDump
    def GET(self, gameId, playerId, x, y):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        currentGame = games.GetGame(gameId)
        if games.Validate(currentGame, playerId) == False or not x or not y:
            return {'MoveMade': False}
        else:
            moveMade = currentGame.MakeMove(playerId, int(x), int(y))
            if moveMade == True:
                moveMade = games.UpdateGame(gameId, currentGame)
            return {'MoveMade': moveMade}     
            
class HoneyHuntersSetupHexGame:
    @jsonDump
    def GET(self, game_name):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        if not game_name: 
            return {'Setup': False, 'Message': "Game ID is missing."}
        game_id = games.SetGameIdFromName(game_name)
        if game_id == None:
            return {'Setup': False, 'Message': "Game already exists."}
        newgame = gbh.GameBoardHex()
        playerId = str(uuid.uuid4())
        if newgame.SetPlayer(playerId) and games.NewGame(game_id, newgame):
            return {'Setup': True, 'GameId': game_id, 'PlayerId': playerId}
        else:
            return {'Setup': False, 'Message': "Unable to setup the game."}
            
class HoneyHuntersJoinHexGame:
    @jsonDump
    def GET(self, game_name):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        if not game_name: 
            return {'Setup': False, 'Message': "Game ID is missing."}
        game_id = games.GetGameIdFromName(game_name)
        if game_id == None:
            return {'Setup': False, 'Message': "Game does not exist."}
        currentGame = games.GetGame(game_id)
        if currentGame == None:
            return {'Setup': False, 'Message': "Game does not exist."}
        if currentGame.PlayersExist() == False:
            playerId = str(uuid.uuid4())
            if currentGame.SetPlayer(playerId) and games.UpdateGame(game_id, currentGame):
                games.RemoveGameName(game_name)
                return {'Setup': True, 'GameId': game_id, 'PlayerId': playerId}
        else:
            return {'Setup': False, 'Message': "Game has already started."}
            
class HoneyHuntersMatchmakerHex:
    @jsonDump
    def GET(self):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        if matchmaker_queue.qsize() == 0:
            newgame = gbh.GameBoardHex()
            gameId = str(uuid.uuid4())
            games.NewGame(gameId, newgame)
            playerId = str(uuid.uuid4())
            if newgame.SetPlayer(playerId):
                games.UpdateGame(gameId, newgame)
                try:
                    matchmaker_queue.put(gameId, False)
                    return {'Setup': True, 'GameId': gameId, 'PlayerId': playerId}
                except Queue.Full: 
                    games.EndGame(gameId)
                    return {'Setup': False}
        else:
            gameId = 0
            try:
                gameId = matchmaker_queue.get(False)
            except Queue.Empty:
                return {'Setup': False}
            currentGame = games.GetGame(gameId)
            if currentGame == None:
                return {'Setup': False}
            if currentGame.PlayersExist() == False:
                playerId = str(uuid.uuid4())
                if currentGame.SetPlayer(playerId):
                    games.UpdateGame(gameId, currentGame)
                    return {'Setup': True, 'GameId': gameId, 'PlayerId': playerId}
            else:
                return {'Setup': False}
            
            
def main():
    application = app.wsgifunc()
    run_wsgi_app(application)

if __name__ == '__main__':
    main()
