#!/bin/bash 


cd frontend/client-ui
rm -r build
npm run build

echo 'Production build has finished...'