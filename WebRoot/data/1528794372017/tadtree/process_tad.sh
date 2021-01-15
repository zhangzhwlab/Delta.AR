#!/bin/sh
export PATH=$PATH:/share/backup2/deltabakcup/hic/scripts20160514
nohup perl /share/backup2/deltabakcup/hic/scripts20160514/module_tadtree.pl -c X -s 6 -g 1000 -n 20 -p 2 -q 3 -i /share/backup2/deltabakcup/visualization/download_data/GSE63525_3dmap/gm12878_18m/chrX_50kb_18m.matrix -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/tadtree -o1 /share/backup2/deltabakcup/circosweb2016/circosweb//jbrowse/1528794372017 -b 50000 -sb 2280 -eb 2640 -spos 0 > /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/tadtree/nohup.out 2>&1 &
