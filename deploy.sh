# cd ../webxr_test
# cp -r ../test/dist/* .
# git add --all
# git commit -a -m "deploy"
# git push origin main
scp -r dist/* denchu@www2217.sakura.ne.jp:www/webxr/
