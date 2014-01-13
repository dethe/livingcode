#!/home/delza/lib/bin/python2.6

from random import shuffle
import boggle_search as search

'''
    Baffle is like Boggle with a hexagonal board:
    
       0  1  2
     3  4   5  6
   7  8   9  10  11
    12 13  14  15
      16  17 18
'''
# Define the boggle dice:
default_dice = [
  list('QHIMNU'), list('AOOTTW'), list('ACHOPS'), list('DEILRX'),
  list('AAEEGN'), list('CMTIOU'), list('WHTREV'), list('EENIUS'),
  list('WEEHNG'), list('SSTIOE'), list('OOBBAJ'), list('IDTSYT'),
  list('PFSFAK'), list('RNHLNZ'), list('LYRDEV'), list('TYTREL'),
  list('ACDORS'), list('EENITS'), list('LEAMGI')]

# Fix english language, change Q to QU %-) 
#default_dice[0][0] = 'Qu'

def shake(dice):
  for die in dice:
    shuffle(die)
  shuffle(dice)
  return dice

def first(die):
  return die[0]

def display(board):
  display_row(board[0:3])
  display_row(board[3:7])
  display_row(board[7:12])
  display_row(board[12:16])
  display_row(board[16:19])

def display_row(row):
    l = len(row)
    if l == 3:
        print '    %2s %2s %2s' % tuple(row)
    elif l == 4:
        print '  %2s %2s %2s %2s' % tuple(row)
    elif l == 5:
        print '%2s %2s %2s %2s %2s' % tuple(row)
  
def roll():
  return map(first, shake(default_dice))
  
def word(w):
  if w.find('Q'):
    w = w.replace('Q', 'QU')
  return w.lower()
  
def play():
#  board = roll()
  board = list('USEYAOTTWHENXALOKSC')
  b = search.Boggle()
  b.solve(board)
  solution = b.found.keys()
  solution.sort()
  for i in range(len(board)):
      if board[i] == 'Q':
          board[i] = 'Qu'
  display(board)
  for s in solution: 
      print s.replace('Q', 'QU').lower()
  return board, solution
  
def text_display():
  board, solution = play()
  display(board)
  print solution


if __name__ == '__main__':
  #display(roll()) 
  play()
