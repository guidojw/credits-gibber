const permissionsCommand = {
  name: 'permissions',
  description: 'Get or edit permissions for a user or a role',
  defaultPermission: false,
  options: [{
    name: 'user',
    description: 'Get or edit permissions for a user',
    type: 'SUB_COMMAND_GROUP' as const,
    options: [{
      name: 'get',
      description: 'Get permissions for a user',
      type: 'SUB_COMMAND' as const,
      options: [{
        name: 'user',
        description: 'The user to get',
        type: 'USER' as const,
        required: true
      }, {
        name: 'command',
        description: 'The command to get the permission of',
        type: 'STRING' as const,
        required: true
      }]
    }, {
      name: 'edit',
      description: 'Edit permissions for a user',
      type: 'SUB_COMMAND' as const,
      options: [{
        name: 'user',
        description: 'The user to edit',
        type: 'USER' as const,
        required: true
      }, {
        name: 'command',
        description: 'The command to give permission for',
        type: 'STRING' as const,
        required: true
      }, {
        name: 'allow',
        description: 'The state of the permission',
        type: 'STRING' as const,
        required: true,
        choices: [{
          name: 'true',
          value: 'true'
        }, {
          name: 'false',
          value: 'false'
        }, {
          name: 'none',
          value: 'none'
        }]
      }]
    }]
  }, {
    name: 'role',
    description: 'Get or edit permissions for a role',
    type: 'SUB_COMMAND_GROUP' as const,
    options: [{
      name: 'get',
      description: 'Get permissions for a role',
      type: 'SUB_COMMAND' as const,
      options: [{
        name: 'role',
        description: 'The role to get',
        type: 'ROLE' as const,
        required: true
      }, {
        name: 'command',
        description: 'The command to get the permission of',
        type: 'STRING' as const,
        required: true
      }]
    }, {
      name: 'edit',
      description: 'Edit permissions for a role',
      type: 'SUB_COMMAND' as const,
      options: [{
        name: 'role',
        description: 'The role to edit',
        type: 'ROLE' as const,
        required: true
      }, {
        name: 'command',
        description: 'The command to give permission for',
        type: 'STRING' as const,
        required: true
      }, {
        name: 'allow',
        description: 'The state of the permission',
        type: 'STRING' as const,
        required: true,
        choices: [{
          name: 'true',
          value: 'true'
        }, {
          name: 'false',
          value: 'false'
        }, {
          name: 'none',
          value: 'none'
        }]
      }]
    }]
  }]
}

export default permissionsCommand
