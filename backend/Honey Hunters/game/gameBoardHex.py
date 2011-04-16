import gameBoardBase

class GameBoardHex(gameBoardBase.GameBoardBase):
    SIZE = (16, 16)
    TOTAL_HONEY = 51
    
    def BoardSize(self):
        return GameBoardHex.SIZE
    
    def TotalHoney(self):
        return GameBoardHex.TOTAL_HONEY
            
    def DisplayVisibleSpots(self, playerId, updateArr, refArray, x, y):
        if 0 <= x and x < len(refArray) and 0 <= y and y < len(refArray[x]) and len(refArray) == len(updateArr) and len(refArray[x]) == len(updateArr[x]) and updateArr[x][y] == gameBoardBase.GameBoardBase.NOT_VISIBLE:
            if refArray[x][y] == gameBoardBase.GameBoardBase.HONEY_SPOT and playerId == self.playerOne:
                self.playerOneScore += 1
            if refArray[x][y] == gameBoardBase.GameBoardBase.HONEY_SPOT and playerId == self.playerTwo:
                self.playerTwoScore += 1
            updateArr[x][y] = refArray[x][y]
            if refArray[x][y] == gameBoardBase.GameBoardBase.EMPTY_SPOT:
                # Top (odd x and even x)
                self.DisplayVisibleSpots(playerId, updateArr, refArray, x, y - 1)
                # Bottom (odd x and even x)
                self.DisplayVisibleSpots(playerId, updateArr, refArray, x, y + 1)
                # Bottom Right (odd x) or Top Right (even x)
                self.DisplayVisibleSpots(playerId, updateArr, refArray, x + 1, y)
                # Bottom Left (odd x) or Top Left (even x)
                self.DisplayVisibleSpots(playerId, updateArr, refArray, x - 1, y)
                #if odd x, do specific top left and top right
                if x % 2 == 1:
                    # Top Left
                    self.DisplayVisibleSpots(playerId, updateArr, refArray, x - 1, y - 1)
                    # Top Right
                    self.DisplayVisibleSpots(playerId, updateArr, refArray, x + 1, y - 1)
                #if even x, do specific bottom left and bottom right        
                if x % 2 == 0:
                    # Bottom Right
                    self.DisplayVisibleSpots(playerId, updateArr, refArray, x + 1, y + 1)
                    # Bottom Left
                    self.DisplayVisibleSpots(playerId, updateArr, refArray, x - 1, y + 1)
            
    
    def AddHoneyToTile(self, arr, x, y):
        arr[x][y] = gameBoardBase.GameBoardBase.HONEY_SPOT
        # Top (odd x and even x)
        self.UpdateArrayInBound(arr, x, y - 1)
        # Bottom (odd x and even x)
        self.UpdateArrayInBound(arr, x, y + 1)
        # Bottom Right (odd x) or Top Right (even x)
        self.UpdateArrayInBound(arr, x + 1, y)
        # Bottom Left (odd x) or Top Left (even x)
        self.UpdateArrayInBound(arr, x - 1, y)
        #if odd x, do specific top left and top right
        if x % 2 == 1:
            # Top Left
            self.UpdateArrayInBound(arr, x - 1, y - 1)
            # Top Right
            self.UpdateArrayInBound(arr, x + 1, y - 1)
        #if even x, do specific bottom left and bottom right        
        if x % 2 == 0:
            # Bottom Right
            self.UpdateArrayInBound(arr, x + 1, y + 1)
            # Bottom Left
            self.UpdateArrayInBound(arr, x - 1, y + 1)
                
    