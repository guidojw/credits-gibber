declare const giveCommand: {
    readonly name: "give";
    readonly description: "Hands in-game credits to a Roblox user.";
    readonly options: readonly [{
        readonly name: "userid";
        readonly description: "The Roblox ID of the user to give the credits to.";
        readonly type: "USER";
        readonly required: true;
    }, {
        readonly name: "amount";
        readonly description: "The amount of credits to give to the user.";
        readonly type: "INTEGER";
        readonly required: true;
    }];
};
export default giveCommand;
