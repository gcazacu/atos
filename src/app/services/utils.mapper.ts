export function deleteRoleOfEmployee(payloadData, employees) {
  const {roleId, employeeId} = payloadData;
  const employeeToUpdate = employees.findIndex(employee => employee.id === employeeId);
  employees[employeeToUpdate].roles = employees[employeeToUpdate].roles.filter(item => item !== roleId);
  return employees;
}

export function addRoleToEmployee(payloadData, employees) {
  const {roleId, employeeId, emptyRole} = payloadData;
  const employeeToUpdate = employees.findIndex(employee => employee.id === employeeId);

  if (emptyRole) {
    employees[employeeToUpdate].roles = [];
  }
  employees[employeeToUpdate].roles = [...employees[employeeToUpdate].roles, roleId];

  return employees
}

export function updateRoles(payloadData, employees) {
  const {addRole, removeRole} = payloadData;
  if (removeRole) {
    return deleteRoleOfEmployee(payloadData, employees);
  }
  if (addRole) {
    return addRoleToEmployee(payloadData, employees);
  }
}

export function addPermissionsBasedOnRoles(employeeRoles, roles) {
  const getEmployeeRolesId = employeeRoles && employeeRoles.map(role => {
    return roles.find(item => item.id === role).permissions
  });
  const permissions = [].concat.apply([], getEmployeeRolesId);
  return permissions.filter((item, index) => permissions.indexOf(item)===index);
}
