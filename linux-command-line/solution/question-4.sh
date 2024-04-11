# This is a comment

# create a directories named bash_learning
mkdir bash_learning

# change your current working directory to that directory
cd bash_learning/

# Create three folders named dir1, dir2, dir3 with one command.
mkdir dir1 dir2 dir3

# Create three empty files in each folder named file1.txt in dir1, file2.txt in dir2, file3.txt in dir3 with one command.
touch dir1/file1.txt dir2/file2.txt dir3/file3.txt

# Append 'Hello' to file1.txt, 'Bonjour' to file2.txt, 'Hallo' to file3.txt using echo.
echo Hello >> dir1/file1.txt 
echo Bonjour >> dir2/file2.txt 
echo Hallo >> dir3/file3.txt 

# Copy file1.txt to dir2, file2.txt to dir3, file3.txt to dir1.
cp dir1/file1.txt dir2
cp dir2/file2.txt dir3
cp dir3/file3.txt dir1

# from bash_learning/ find all files that contain 'Hallo' and save the result in hallo.txt
grep Hallo -r dir* > hallo.txt

# show the search result in the hallo.txt file
cat hallo.txt