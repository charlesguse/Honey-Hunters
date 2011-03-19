import web
import game
import game.gameManagement
import game.gameBoardHex
import uuid
        
urls = (
    '/HH/Debug/(.*)/(.*)/(\d*,\d*)', 'HoneyHuntersDebug',
    '/HH/Status/(.*)/(.*)', 'HoneyHuntersGameStatus',
    '/HH/Move/(.*)/(.*)/(\d*)/(\d*)', 'HoneyHuntersMove',
    '/HH/SetupHex/(.*)/(.*)', 'HoneyHuntersSetupHexGame',
    '/HH/SetupHex/(.*)', 'HoneyHuntersSetupHexGame',
    '/HH/TotalGames', 'HoneyHuntersTotalGames',
)
app = web.application(urls, globals())
games = game.gameManagement.GameManagement()

class HoneyHuntersDebug:        
    def GET(self, game, playerId, move):
        #if not game: 
        #    game = -1
        #if not playerId:
        #    playerId = -2
        #if not move:
        #    move = -3
        return 'Game: \'' + str(game) + '\'\nPlayer: \'' + str(playerId) + '\'' + '\nMove: \'' + str(move) + '\''
        
class HoneyHuntersTotalGames:        
    def GET(self):
        return len(games.games)
        
class HoneyHuntersGameStatus:        
    def GET(self, gameId, playerId):
        if games.Validate(gameId, playerId) == False:
            return False
        try:
            currentGame = games.GetGame(gameId)
            return {
                'Turn' : currentGame.PlayersTurn(playerId),
                currentGame.GetPlayerName(playerId) : currentGame.GetPlayerScore(playerId),
                currentGame.GetOtherPlayerName(playerId) : currentGame.GetOtherPlayerScore(playerId),
                'Board' : currentGame.displayBoard,
                'Winner' : currentGame.CheckWinner(playerId)
            }
        except KeyError:
            return False

class HoneyHuntersMove:        
    def GET(self, gameId, playerId, x, y):
        if games.Validate(gameId, playerId) == False or not x or not y:
            return False
        currentGame = games.GetGame(gameId)
        return currentGame.MakeMove(playerId, x, y)     

class HoneyHuntersSetupHexGame:        
    def GET(self, gameId, name = game.gameBoardBase.GameBoardBase.NAME_NOT_SET):
        if not gameId: 
            return False
        if not name:
            name = game.gameBoardBase.GameBoardBase.NAME_NOT_SET
        if games.GameExists(gameId) == False:
            newgame = game.gameBoardHex.GameBoardHex()
            games.NewGame(gameId, newgame)
        
        currentGame = games.GetGame(gameId)
        if currentGame.PlayersExist() == False:
            playerId = str(uuid.uuid4())
            if currentGame.SetPlayer(playerId, name):
                return playerId
        return False

if __name__ == "__main__":
    app.run()
