
#!/bin/bash

# Download the dataset
curl -L -O https://github.com/TomHuynhSG/public_datasets/blob/master/small_cat_dog_dataset.zip?raw=true

# rename the downloaded file
mv small_cat_dog_dataset.zip\?raw\=true small_cat_dog.zip

# Make sure you install zip first
sudo yum install unzip -y

# unzip the downloaded file
unzip small_cat_dog.zip

mkdir SORTED_DATA

# make two new directories cat and dog in the parent directory
mkdir SORTED_DATA/cat SORTED_DATA/dog

# move images starting with cat name to cat directory
mv DATA/cat* SORTED_DATA/cat

# move images starting with dog name to cat directory
mv DATA/dog* SORTED_DATA/dog


# Inform user of completion
echo "The script is done!"