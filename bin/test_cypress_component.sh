# Description: Run a single component test
component_name="$1"
current_dir=$(pwd)
if [ -n "$component_name" ]; then
  echo "Running Cypress tests for $component_name"
  npx cypress run --component --spec "src/components/$component_name/$component_name.cy.js"
  cd $OLDPWD
  exit 1
fi

