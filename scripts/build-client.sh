#!/bin/bash 
echo '[CompanyLambdas] installing pip dependencies'
pip install -r ./backend/services/CompanyLambdas/Create/requirements.txt -t ./layer/
echo '[DepartmentLambdas] installing pip dependencies'
echo '[EmployeeLambdas] installing pip dependencies '
echo '[OfficeLambdas] installing pip dependencies '
echo '[RoleLambdas] installing pip dependencies \n'
echo 'DONE with PIP'
cd frontend/client-ui
rm -r build
npm run build

echo 'Finished building optimized production build...'