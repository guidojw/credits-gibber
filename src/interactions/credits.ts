const creditsCommand = {
  name: 'credits',
  description: 'Get or give Roblox users credits',
  defaultPermission: false,
  options: [{
    name: 'get',
    description: 'Get a Roblox user\'s credits',
    type: 'SUB_COMMAND' as const,
    options: [{
      name: 'userid',
      description: 'The Roblox ID of the user to get the credits of',
      type: 'INTEGER' as const,
      required: true
    }]
  }, {
    name: 'give',
    description: 'Give a Roblox user\'s credits',
    type: 'SUB_COMMAND' as const,
    options: [{
      name: 'userid',
      description: 'The Roblox ID of the user to give credits to',
      type: 'INTEGER' as const,
      required: true
    }, {
      name: 'amount',
      description: 'The amount of credits to give to the user',
      type: 'INTEGER' as const,
      required: true
    }]
  }]
}

export default creditsCommand
