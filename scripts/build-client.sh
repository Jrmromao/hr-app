#!/bin/bash 


cd frontend/client-ui
rm -r build
npm run build

echo 'Finished building optimized production build...'