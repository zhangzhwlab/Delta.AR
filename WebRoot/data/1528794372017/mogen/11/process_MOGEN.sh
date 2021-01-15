#PBS -N MOGEN.11.sh

#PBS -e /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/MOGEN.11.err
#PBS -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/MOGEN.11.out
#PBS -q workq
date -d"now" +%s 
date
perl /share/backup2/deltabakcup/hic/scripts20160514/generate_MoGEN_IFmatrix_3column.pl -i /share/backup2/deltabakcup/circosweb2016/circosweb/download/11_50000.matrix -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/chr11_50000.mogen.if.txt
/share/backup2/deltabakcup/hic/software/jdk1.7.0_72/bin/java -jar /share/backup2/deltabakcup/hic/scripts20160514/Normalizer.jar -i /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/chr11_50000.mogen.if.txt -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/chr11_50000.nm.txt -m 1
perl /share/backup2/deltabakcup/hic/scripts20160514/process_normalize_matrix_MOGEN.pl -i /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/chr11_50000.nm.txt -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/chr11_50000.mogen.nm.txt -p 1
perl /share/backup2/deltabakcup/hic/scripts20160514/generate_MoGEN_configfile.pl -i /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/chr11_50000.mogen.nm.txt -od /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/mogen_output -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11 -c 11 -bin 50000 -ithresh 0.0435 -adist 1.5 -cdist 6.0 -pmdist 0.2 -nmdist 50 -lrate 0.01 -miterate 200000 -pmxdw 200.0 -pmindw 1.0 -nmindw 40.0 -nmxdw 1.0
java -jar /share/backup2/deltabakcup/hic/scripts20160514/3DGenerator.jar /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/11_50000.txt
perl /share/backup2/deltabakcup/hic/scripts20160514/MOGEN_pdb2xyz.pl -indir /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/mogen_output -o /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/11.xyz -c 11 -bin 50000 -bsfile /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/11/chr11_50000.mogen.nm.txt.binindex.srt -jb 1528794372017 -tpath /share/backup2/deltabakcup/circosweb2016/circosweb/ -sb 90 -sp hg19 -dir /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen
date
date -d"now" +%s 
touch /share/backup2/deltabakcup/circosweb2016/circosweb//data/1528794372017/mogen/mogen.finish
