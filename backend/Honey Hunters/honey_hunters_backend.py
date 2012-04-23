from google.appengine.ext.webapp.util import run_wsgi_app
import web
import simplejson as json
import game.game_management as gm
import game.game_board_hex as gbh
import uuid                                 

accessControlAllowOriginValue = "*" #"http://nonegames.net"
        
urls = (
    '/HH/Status/(.*)/(.*)', 'HoneyHuntersGameStatus',
    '/HH/Status/(.*)', 'HoneyHuntersGameStatusDebug',
    '/HH/Move/(.*)/(.*)/(\d*)/(\d*)', 'HoneyHuntersMove',
    '/HH/SetupHex/(.*)', 'HoneyHuntersSetupHexGame',
    '/HH/JoinHex/(.*)', 'HoneyHuntersJoinHexGame',
    '/HH/TotalGames', 'HoneyHuntersTotalGames',
    '/HH/TotalStatus', 'HoneyHuntersTotalStatus'
)
app = web.application(urls, globals())
games = gm.GameManagement()

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
    def GET(self, gameId):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        if not gameId: 
            return {'Setup': False, 'Message': "Game ID is missing."}
            
        if games.GameExists(gameId) == False:
            newgame = gbh.GameBoardHex()
            games.NewGame(gameId, newgame)
            playerId = str(uuid.uuid4())
            if newgame.SetPlayer(playerId):
                games.UpdateGame(gameId, newgame)
                return {'Setup': True, 'PlayerId': playerId}
            else:
                return {'Setup': False, 'Message': "Unable to setup the player."}
        else:
            return {'Setup': False, 'Message': "Game already exists."}
            
class HoneyHuntersJoinHexGame:
    @jsonDump       
    def GET(self, gameId):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        if not gameId: 
            return {'Setup': False, 'Message': "Game ID is missing."}
        if games.GameExists(gameId) == False:
            return {'Setup': False, 'Message': "Game does not exist."}
        currentGame = games.GetGame(gameId)
        if currentGame.PlayersExist() == False:
            playerId = str(uuid.uuid4())
            if currentGame.SetPlayer(playerId):
                games.UpdateGame(gameId, currentGame)
                return {'Setup': True, 'PlayerId': playerId}
        else:
            return {'Setup': False, 'Message': "Game has already started."}
            
def main():
    application = app.wsgifunc()
    run_wsgi_app(application)

if __name__ == '__main__':
    main()