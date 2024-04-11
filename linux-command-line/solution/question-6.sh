
# Download the works of Shakespeare
curl https://www.gutenberg.org/files/100/100-0.txt > shakespeare.txt

# Count how many words are there in the file
wc -w shakespeare.txt 

# Count how many lines of this file
wc -l shakespeare.txt

# Counting the occurences of different words
# -i for case insensitive and -c for counting 

# Wrong solution: Can you explain why?
grep -ic Romeo shakespeare.txt

# Compared to the correct solution here, what is the difference?
grep -o -i Romeo shakespeare.txt | wc -l

# Here is the correct solutions for couting occurences of different words
# The -o option in grep stands for "only-matching." 
# When you use grep -o, it will only output the portions of a matching line that fit 
# the specified pattern. Normally, grep will return the entire line if it finds a match 
# to your pattern within it. The -o option is useful when you want to see only the part 
# of the line that matches your search term, not the whole line.
# This option is particularly useful when combined with other commands through piping, 
# for instance, if you want to count occurrences of a word in a text:

# Hamlet should be the winner for the most mentions
grep -o -i Romeo shakespeare.txt | wc -l     # = 317
grep -o -i Juliet shakespeare.txt | wc -l    # = 210
grep -o -i Macbeth shakespeare.txt | wc -l   # = 288
grep -o -i Hamlet shakespeare.txt | wc -l    # = 475
grep -o -i Duncan shakespeare.txt | wc -l    # = 38

# The total amount of mentions of these five characters?
# -E is for the regular expression search so we can use "|" to say add multiple patterns to search for
# This should be = 1328 = 317 + 210 + 288 + 475 + ls38
grep -o -iE "Romeo|Juliet|Macbeth|Hamlet|Duncan" shakespeare.txt | wc -l   

