#!/home/delza/lib/bin/python2.6

from random import shuffle
from third.aima.search import Boggle

# Define the boggle dice:
default_dice = [
  list('QHIMNU'), list('AOOTTW'), list('ACHOPS'), list('DEILRX'),
  list('AAEEGN'), list('CMTIOU'), list('WHTREV'), list('EENIUS'),
  list('WEEHNG'), list('SSTIOE'), list('OOBBAJ'), list('IDTSYT'),
  list('PFSFAK'), list('RNHLNZ'), list('LYRDEV'), list('TYTREL')]

# Fix english language, change Q to QU %-) 
#default_dice[0][0] = 'QU'


def shake(dice):
  for die in dice:
    shuffle(die)
  shuffle(dice)
  return dice

def first(die):
  return die[0]

def display(board):
  display_row(board[0:4])
  display_row(board[4:8])
  display_row(board[8:12])
  display_row(board[12:16])

def display_row(row):
  print '%2s %2s %2s %2s' % tuple(row)

def format_row(row):
  return '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>' % tuple(row)
  
def roll():
  return ''.join(map(first, shake(default_dice)))
  
def word(w):
  if w.find('Q'):
    w = w.replace('Q', 'QU')
  return w.lower()
  
def play():
  board = roll()
  b = Boggle()
  b.solve(board)
  if 'Q' in board:
    idx = board.find('Q')
    board = list(board)
    board[idx] = 'Qu'
  solution = map(word, b.found.keys())
  solution.sort()
  return board, solution
  
def text_display():
  board, solution = play()
  display(board)
  print solution

def web_display():
  board, solution = play()
  print 'Content-type: text/html'
  print ''
  print '<html><head>'
  print '<style type="text/css">'
  print 'div{align:center;float:left;}'
  print 'td{font-size:750%;border:solid black 1px;'
  print '  text-align:center;vertical-align: bottom;}'
  print '</style>'
  print '<title>Boggle</title></head><body>'
  print '<div><table>'
  print format_row(board[0:4])
  print format_row(board[4:8])
  print format_row(board[8:12])
  print format_row(board[12:16])
  print '</table></div>'
  print '<div style="float:right;">'
  print '<form style="display:block;" onsubmit="return false;" action="">'
  print '<button style="clear:all;" onclick="document.getElementById(\'solution\').style.visibility = \'visible\'">Show  %s Words</button>' % len(solution)
  print '</form>'
  print '<h2>Solution</h2>'
  print '<div id="solution" style="visibility:hidden;height:400px;width:150px;overflow:auto;">'
  for word in solution:
    print '<span><a target="definition" href="http://www.google.com/search?q=define:%(word)s&ie=UTF-8&oe=UTF-8">%(word)s</a></span><br />' % {'word': word}
  print '</div>'
  print '</div>'
  print '</body></html>'

if __name__ == '__main__':
  web_display() 
  #play()
