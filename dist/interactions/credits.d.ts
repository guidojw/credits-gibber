declare const creditsCommand: {
    name: string;
    description: string;
    defaultPermission: boolean;
    options: {
        name: string;
        description: string;
        type: "SUB_COMMAND";
        options: {
            name: string;
            description: string;
            type: "INTEGER";
            required: boolean;
        }[];
    }[];
};
export default creditsCommand;
