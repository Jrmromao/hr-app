#!/bin/bash 
echo 'installing pip dependencies'
pip install -r ./backend/services/DepartmentLambdas/Create/requirements.txt -t ./layer/
echo 'DONE with PIP'
cd frontend/client-ui
rm -r build
npm run build

echo 'Finished building optimized production build...'