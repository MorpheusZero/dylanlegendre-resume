# Create folders that need to pre-exist
mkdir dist/content/js
mkdir dist/content/images

# Copy static files from the /src directory to the /dist directory
cp src/index.html dist/
cp src/favicon.ico dist/
cp src/content/js/main.js dist/content/js
cp src/content/images/avatar.png dist/content/images
