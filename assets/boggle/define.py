
from subprocess import Popen, PIPE
import json

def getDefinition(word):
    return Popen(['wn', word, '-over'], stdout=PIPE).communicate()[0]


def main():
    wordlist = {}
    count = 0
    too_long = []
    no_def = []
    reject_count = 0
    wordfile = open('wordlist_enable')
    for word in wordfile:
        word = word.strip()
        if len(word) > 19:
            too_long.append(word)
            reject_count += 1
        else:
            dfn = getDefinition(word)
            if dfn.strip(): 
                wordlist[word] = dfn
                count += 1
            else:
                no_def.append(word)
                reject_count += 1
    savefile = open('wordlist_dfn', 'w')
    json.dump(wordlist, savefile, indent=4, sort_keys=True)
    print 'Saved %d definitions, rejected %d words' % (count, reject_count)
    print '\n%d words had no definition found:' % len(no_def)
    no_def_f = open('wordlist_nodef', 'w')
    for word in no_def:
        print >> no_def_f, '\t%s' % word
    print'\n%d words were too long:' % len(too_long)
    too_long_f = open('wordlist_toolong', 'w')
    for word in too_long:
        print >> too_long_f, '\t%s' % word
    print ''        
    
if __name__ == '__main__':
    main()
    