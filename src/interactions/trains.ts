const trainsCommand = {
  name: 'trains',
  description: 'Get Roblox users their trains',
  defaultPermission: false,
  options: [{
    name: 'get',
    description: 'Get a Roblox user\'s trains',
    type: 'SUB_COMMAND' as const,
    options: [{
      name: 'userid',
      description: 'The Roblox ID of the user to get the trains of',
      type: 'INTEGER' as const,
      required: true
    }]
  }]
}

export default trainsCommand
