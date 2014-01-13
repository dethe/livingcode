'''
Just Enough of AIMA to solve Boggle with a 3x hex board, stripping away all flexibility
'''

def bisect_left(a, x, lo=0, hi=None):
    """Return the index where to insert item x in list a, assuming a is sorted.

    The return value i is such that all e in a[:i] have e < x, and all e in
    a[i:] have e >= x.  So if x already appears in the list, a.insert(x) will
    insert just before the leftmost x already there.

    Optional args lo (default 0) and hi (default len(a)) bound the
    slice of a to be searched.
    """

    if lo < 0:
        raise ValueError('lo must be non-negative')
    if hi is None:
        hi = len(a)
    while lo < hi:
        mid = (lo+hi)//2
        if a[mid] < x: lo = mid+1
        else: hi = mid
    return lo
    
def bisect_right(a, x, lo=0, hi=None):
    """Return the index where to insert item x in list a, assuming a is sorted.

    The return value i is such that all e in a[:i] have e <= x, and all e in
    a[i:] have e > x.  So if x already appears in the list, a.insert(x) will
    insert just after the rightmost x already there.

    Optional args lo (default 0) and hi (default len(a)) bound the
    slice of a to be searched.
    """

    if lo < 0:
        raise ValueError('lo must be non-negative')
    if hi is None:
        hi = len(a)
    while lo < hi:
        mid = (lo+hi)//2
        if x < a[mid]: hi = mid
        else: lo = mid+1
    return lo

def sum(seq):
    """Sum the elements seq[i].
    Ex: sum([1, 2, 3]) ==> 6 """
    return reduce(operator.add, seq, 0)
    
def compute_neighbors(size):
    if size != 19:
        raise ValueError, 'This is not generalized, only works with hex of side length==3'
    return [
        (1,3,4), (0,2,4,5), (1,5,6),
        (0,4,7,8), (0,1,3,5,8,9), (1,2,4,6,9,10),(2,5,10,11),
        (3,8,12),(3,4,7,9,12,13),(4,5,8,10,13,14),(5,6,9,11,14,15),(6,10,15),
        (7,8,13,16), (8,9,12,14,16,17),(9,10,13,15,17,18),(10,11,14,18),
        (12,13,17),(13,14,16,18),(14,15,17)]
        
class Boggle(object):
    """Find all the words in a Boggle board.
    Ex: b = Boggle(); b.solve(); b.solve()"""
    def __init__(self, wordlist=None):
        global the_wordlist      
        if wordlist is None:
            if the_wordlist is None:
                the_wordlist = Wordlist(open("wordlist_enable"))
            wordlist = the_wordlist
        self.wordlist = wordlist
        self.wordlist_words = wordlist.words
        self.found = {}
 
    def solve(self, board):
        "Find all the words in the given board"
        self.board = board
        self.neighbors = compute_neighbors(len(board))
        self.found = {}
        for i in range(len(board)):
            lo, hi = self.wordlist.bounds[board[i]]
            self.find(lo, hi, i, [], '')
        return self
            
    def count(self):
        "Return the number of words found on the last board."
        return len(self.found)

    def words(self):
        "Return the list of words found on the last board."
        return self.found.keys()

    def score(self):
        return sum([Boggle.scores[len(w)] for w in self.words()])

    def __repr__(self):
        return '<Boggle: %d words, %d points>' % (self.count(), self.score())

    ## private:

    scores = [0, 0, 0, 1, 1, 2, 3, 5] + ([11] * 30)

    def find(self, lo, hi, i, visited, sofar):
        print 'find(%s, %s, %s, %s, "%s")' % (lo, hi, i, visited, sofar)
        if i in visited: return
        prefix, word = self.lookup(sofar, lo, hi)
        if prefix:
            if word: self.found[word] = 1; 
            visited.append(i)
            c = self.board[i]
            sofar += c
            for j in self.neighbors[i]:
                self.find(prefix, hi, j, visited, sofar)
            visited.pop()
                                    
    def lookup(self, sofar, lo, hi):
        print 'lookup("%s", %s, %s)' % (sofar, lo, hi)
        p = bisect_left(self.wordlist_words, sofar, lo, hi)
        if p >= len(self.wordlist_words): return None, None
        elif self.wordlist_words[p] == sofar: return p, sofar
        elif self.wordlist_words[p].startswith(sofar): return p, None
        else: return None, None
    

alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class Wordlist:
    def __init__(self, file_, min_len=3):
        lines = file_.read().upper().split()
        self.words = [word.strip() for word in lines if len(word) >= min_len]
        self.words.sort()
        self.bounds = {}
        for c in alphabet:
            c2 = chr(ord(c) + 1)
            self.bounds[c] = (bisect_right(self.words, c),
                              bisect_right(self.words, c2))

    def __contains__(self, word): return bisect_right(self.words, word)
    def __repr__(self): return '<Wordlist with %d words>' % len(self.words)
    def __len__(self): return len(self.words)
    
the_wordlist = None ## Will hold a Wordlist loaded from a file

