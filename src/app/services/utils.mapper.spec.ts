import * as utils from './utils.mapper';
import {addRoleToEmployee} from "./utils.mapper";

describe('Utils Mapper', () => {
  const employeesMockList = [
    {
      "id": 1,
      "firstName": "Charmaine",
      "lastName": "Richardson",
      "phone": "+4 (952) 555-3857",
      "address": "609 Brigham Street, Allensworth, Missouri, 5813",
      "email": "charmaine.richardson@endipin.com",
      "roles": [
        "automationTester"
      ]
    },
    {
      "id": 2,
      "firstName": "Lyons",
      "lastName": "Mccoy",
      "phone": "+4 (864) 600-2080",
      "address": "497 Monitor Street, Urbana, Oklahoma, 4313",
      "email": "lyons.mccoy@sybixtex.com",
      "roles": [
        "developer", "automationTester"
      ]
    },
    {
      "id": 3,
      "firstName": "Lyons",
      "lastName": "Mccoy",
      "phone": "+4 (864) 600-2080",
      "address": "497 Monitor Street, Urbana, Oklahoma, 4313",
      "email": "lyons.mccoy@sybixtex.com",
      "roles": []
    }
  ];

  const permissionMockList = [
    {
      "id": 1,
      "displayName": "Pull from Git",
      "application": "Bitbucket"
    },
    {
      "id": 2,
      "displayName": "Push in Git",
      "application": "Bitbucket"
    },
    {
      "id": 3,
      "displayName": "Change Git settings",
      "application": "Bitbucket"
    },
    {
      "id": 4,
      "displayName": "View Jira Backlog",
      "application": "Jira"
    },
    {
      "id": 5,
      "displayName": "Report Bug",
      "application": "Jira"
    },
    {
      "id": 6,
      "displayName": "Add User Story",
      "application": "Jira"
    },
    {
      "id": 7,
      "displayName": "Change Sprint Setup",
      "application": "Jira"
    },
    {
      "id": 8,
      "displayName": "Add timesheet",
      "application": "Internal"
    },
    {
      "id": 9,
      "displayName": "View timesheet of other employees",
      "application": "Internal"
    }
  ];

  const rolesList = [
    {
      "id": "employee",
      "displayName": "Employee",
      "permissions": [
        8
      ]
    },
    {
      "id": "automationTester",
      "displayName": "Automation Tester",
      "permissions": [
        1,
        4,
        5
      ]
    },
    {
      "id": "manualTester",
      "displayName": "Manual Tester",
      "permissions": [
        1,
        4,
        5
      ]
    },
    {
      "id": "devOps",
      "displayName": "DevOps Engineer",
      "permissions": [
        1,
        2,
        3
      ]
    },
    {
      "id": "developer",
      "displayName": "Application Developer",
      "permissions": [
        1,
        2,
        4,
        5,
        6
      ]
    },
    {
      "id": "teamLeader",
      "displayName": "Team Leader",
      "permissions": []
    },
    {
      "id": "productOwner",
      "displayName": "Product Owner",
      "permissions": [
        4,
        5,
        6,
        7
      ]
    },
    {
      "id": "scrumMaster",
      "displayName": "Scrum Master",
      "permissions": [
        4,
        5,
        6,
        7
      ]
    },
    {
      "id": "healthAndSafetySpecialist",
      "displayName": "Health and Safety Specialist",
      "permissions": []
    },
    {
      "id": "hrBusinessPartner",
      "displayName": "HR Business Partner ",
      "permissions": []
    },
    {
      "id": "hrCoordinator",
      "displayName": "HR Coordinator",
      "permissions": [
        8,
        9
      ]
    }
  ];

  it('should delete role of employee', () => {
    const payload = {roleId: "developer", employeeId: 2};
    const result = utils.deleteRoleOfEmployee(payload, employeesMockList);
    expect(result[1].roles.length).toBe(1)
  });

  it('should add role to employee without roles', () => {
    const payload = {roleId: "scrumMaster", employeeId: 3, emptyRole: true};
    const result = utils.addRoleToEmployee(payload, employeesMockList);
    expect(result[2].roles.length).toBe(1);
    expect(result[2].roles[0]).toBe('scrumMaster');
  });

  it('should add role to employee with existing roles', () => {
    const payload = {roleId: "scrumMaster", employeeId: 1, emptyRole: false};
    const result = utils.addRoleToEmployee(payload, employeesMockList);
    expect(result[0].roles.length).toBe(2);
    expect(result[0].roles[0]).toBe('automationTester');
    expect(result[0].roles[1]).toBe('scrumMaster');
  });

  it('should call deleteRoleOfEmployee function', () => {
    const payload = {removeRole: true, roleId: "developer", employeeId: 2};
    const result = utils.updateRoles(payload, employeesMockList);
    expect(result[1].roles.length).toBe(1);
  });

  it('should add addRoleToEmployee functions', () => {
    const payload = {addRole: true, roleId: "scrumMaster", employeeId: 3, emptyRole: true};
    const result = utils.updateRoles(payload, employeesMockList);
    expect(result[2].roles.length).toBe(1);
  });

  it('should add the corresponding permissions list based on employee list', () => {
    const employeeRoles = ['automationTester', 'scrumMaster', 'devOps'];
    const result = utils.addPermissionsBasedOnRoles(employeeRoles, rolesList);
    expect(result.length).toBe(7);
    expect(result.findIndex(item => item === 5)).not.toBe(-1);
  });

});
