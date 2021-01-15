#PBS -N tad.sh
#PBS -e /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/tadtree/tad.err
#PBS -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/tadtree/tad.out
#PBS -q workq
#PBS -l nodes=1:ppn=1
date -d"now" +%s 
date
python /share/backup2/deltabakcup/hic/software/tadtree/final_alg/TADtree.py /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/tadtree/control_file.txt
perl /share/backup2/deltabakcup/hic/scripts20160514/tadres2gff3.pl -i /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/tadtree/11/N19.txt -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/tadtree -b 50000 -o1 /share/backup2/deltabakcup/circosweb2016/circosweb//jbrowse/1528794372017/tracks/tad/11 -sb 90 -eb 130 -spos 0
date
date -d"now" +%s 
touch /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/tadtree/tad.finish
