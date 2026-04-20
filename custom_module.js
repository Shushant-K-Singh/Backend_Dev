BRANCH AND MERGE
================

#1 create branch "feature"
: command git branch feature
          git checkout feature

#2 add new file in feature branch
: toouch feature.txt
   git add feature.txt
   git commit -m "added feature file"

#3 switch back to main branch
  : git checkout main

#4 merge feature branch into main
: git merge feature

#5 delete
: git brach -d feature

