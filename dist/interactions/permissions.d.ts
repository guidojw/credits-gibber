declare const permissionsCommand: {
    name: string;
    description: string;
    defaultPermission: boolean;
    options: ({
        name: string;
        description: string;
        type: "SUB_COMMAND_GROUP";
        options: {
            name: string;
            description: string;
            type: "SUB_COMMAND";
            options: ({
                name: string;
                description: string;
                type: "USER";
                required: boolean;
                choices?: undefined;
            } | {
                name: string;
                description: string;
                type: "STRING";
                required: boolean;
                choices?: undefined;
            } | {
                name: string;
                description: string;
                type: "STRING";
                required: boolean;
                choices: {
                    name: string;
                    value: string;
                }[];
            })[];
        }[];
    } | {
        name: string;
        description: string;
        type: "SUB_COMMAND_GROUP";
        options: {
            name: string;
            description: string;
            type: "SUB_COMMAND";
            options: ({
                name: string;
                description: string;
                type: "ROLE";
                required: boolean;
                choices?: undefined;
            } | {
                name: string;
                description: string;
                type: "STRING";
                required: boolean;
                choices?: undefined;
            } | {
                name: string;
                description: string;
                type: "STRING";
                required: boolean;
                choices: {
                    name: string;
                    value: string;
                }[];
            })[];
        }[];
    })[];
};
export default permissionsCommand;
