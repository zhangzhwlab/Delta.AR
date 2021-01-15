#PBS -N fasthic.11.sh
#PBS -e /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fasthic.11.err
#PBS -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fasthic.11.out
#PBS -q workq
#PBS -l nodes=1:ppn=1
date -d"now" +%s 
date
gzip /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/11_50000.matrix.fragment
gzip /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/11_50000.matrix.countfreq
python /share/backup2/deltabakcup/hic/software/fit-hi-c/bin/fit-hi-c.py -l fithic -f /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/11_50000.matrix.fragment.gz -i /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/11_50000.matrix.countfreq.gz -L -1 -U -1 -b 100 -p 1 -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic --quiet
gunzip /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fithic.spline_pass1.significances.txt.gz
java -jar /share/backup2/deltabakcup/hic/software/GenerateFithicMatrix.jar /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fithic.spline_pass1.significances.txt 41 50000 /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fithic_11_50000.matrix
perl /share/backup2/deltabakcup/hic/scripts20160514/fithic2fasthic.pl -b 50000 -i /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fithic.spline_pass1.significances.txt -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic
/share/backup2/deltabakcup/hic/software/jdk1.7.0_72/bin/java -jar /share/backup2/deltabakcup/hic/software/callpeak_fasthic/FastHiC.jar --interaction /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fithic.spline_pass1.significances.txt.fasthic --outprob /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fasthic_Results_SFA.txt --outestimator /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fasthic_Estimated_Parameters_SFA.txt --iter 300
perl /share/backup2/deltabakcup/hic/scripts20160514/fasthic2gff3.pl -pl /share/backup2/deltabakcup/hic/scripts20160514/ -c 11 -b 50000 -i /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fasthic_Results_SFA.txt -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic -o1 /share/backup2/deltabakcup/circosweb2016/circosweb//jbrowse/1528794372017/tracks/arc/11 -f 0.95 -sb 90 -spos 0 -ref /share/backup2/deltabakcup/circosweb2016/circosweb/ -sp hg19
cp /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/11.gff3.tabix /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/11.gff3.tabix1
/share/backup2/deltabakcup/hic/software/tabix-master/bgzip /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/11.gff3.tabix
/share/backup2/deltabakcup/hic/software/tabix-master/tabix -p gff -s 1 -b 4 -e 5 /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/11.gff3.tabix.gz
date
date -d"now" +%s 
touch /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/fasthic/fasthic.finish
