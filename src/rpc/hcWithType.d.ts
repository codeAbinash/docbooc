import { hc } from 'hono/client';
declare const client: {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: {
        "*": import("hono/client").ClientRequest<{}>;
    };
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: {
        users: {
            "send-code": import("hono/client").ClientRequest<{
                $post: {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 500;
                } | {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: {
                            phone: any;
                        } | null;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 200;
                };
            }>;
        };
    };
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: {
        users: {
            "verify-code": import("hono/client").ClientRequest<{
                $post: {
                    input: {
                        form?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 500;
                } | {
                    input: {
                        form?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 400;
                } | {
                    input: {
                        form?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: {
                            token: string;
                            user: {
                                id: string;
                                name: string | null;
                                phone: string;
                                email: string | null;
                                dateOfBirth: string | null;
                                profilePicture: string | null;
                                createdAt: string;
                                updatedAt: string;
                            };
                            isNewUser: boolean;
                        } | null;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 200 | 201;
                };
            }>;
        };
    };
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: {
        users: {
            profile: import("hono/client").ClientRequest<{
                $get: {
                    input: {};
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 500;
                } | {
                    input: {};
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 404;
                } | {
                    input: {};
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: {
                            user: {
                                id: string;
                                name: string | null;
                                phone: string;
                                email: string | null;
                                dateOfBirth: string | null;
                                profilePicture: string | null;
                                createdAt: string;
                                updatedAt: string;
                            };
                        } | null;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 200;
                };
                $put: {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 500;
                } | {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 404;
                } | {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 400;
                } | {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: {
                            user: {
                                id: string;
                                name: string | null;
                                phone: string;
                                email: string | null;
                                dateOfBirth: string | null;
                                profilePicture: string | null;
                                createdAt: string;
                                updatedAt: string;
                            };
                        } | null;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 200;
                };
            }>;
        };
    };
} & {
    api: {
        users: {
            profile: {
                [x: string]: import("hono/client").ClientRequest<{}>;
            };
        };
    };
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: {
        hp: {
            [x: string]: import("hono/client").ClientRequest<{}>;
        };
    };
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: {
        hp: {
            "doctor-schedules": import("hono/client").ClientRequest<{
                $get: {
                    input: {};
                    output: {
                        message: string;
                    };
                    outputFormat: "json";
                    status: import("hono/utils/http-status").ContentfulStatusCode;
                };
                $post: {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 500;
                } | {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 404;
                } | {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: {
                            id: string;
                            createdAt: string;
                            hpId: string;
                            doctorId: string;
                            scheduleType: "daily" | "weekly" | "monthly";
                            daysMask: number | null;
                            scheduleStatus: "cancelled" | "active" | "deleted" | null;
                        } | null;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 201;
                };
            }>;
        };
    };
} & {
    api: {
        hp: {
            "doctor-schedules": {
                ":id": import("hono/client").ClientRequest<{
                    $delete: {
                        input: {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 404;
                    } | {
                        input: {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: {
        admin: {
            auth: {
                login: import("hono/client").ClientRequest<{
                    $post: {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 200;
                    } | {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        admin: {
            auth: {
                logout: import("hono/client").ClientRequest<{
                    $post: {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 200;
                    } | {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    };
                }>;
            };
        };
    };
} & {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: "Hello Hono!";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    api: {
        admin: {
            doctors: import("hono/client").ClientRequest<{
                $get: {
                    input: {};
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 500;
                } | {
                    input: {};
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: {
                            id: string;
                            name: string;
                            email: string | null;
                            specialization: string;
                            contactNumber: string | null;
                            createdAt: string;
                            verified: boolean | null;
                        }[] | null;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 200;
                };
                $post: {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: import("hono/utils/types").JSONValue;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 500;
                } | {
                    input: {
                        json?: any;
                    };
                    output: {
                        success: boolean;
                        statusCode: number;
                        message: string;
                        data: {
                            id: string;
                            email: string | null;
                            name: string;
                            specialization: string;
                            contactNumber: string | null;
                            createdAt: string;
                            verified: boolean | null;
                        } | null;
                        error: import("hono/utils/types").JSONValue;
                        timestamp: string;
                    };
                    outputFormat: "json";
                    status: 201;
                };
            }>;
        };
    };
} & {
    api: {
        admin: {
            doctors: {
                bulk: import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json?: any;
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json?: any;
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: any;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 201;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        admin: {
            doctors: {
                ":id": import("hono/client").ClientRequest<{
                    $get: {
                        input: {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 404;
                    } | {
                        input: {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                email: string | null;
                                specialization: string;
                                contactNumber: string | null;
                                createdAt: string;
                                verified: boolean | null;
                            } | null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                    $put: {
                        input: {
                            json?: any;
                        } & {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json?: any;
                        } & {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 404;
                    } | {
                        input: {
                            json?: any;
                        } & {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                email: string | null;
                                specialization: string;
                                contactNumber: string | null;
                                createdAt: string;
                                verified: boolean | null;
                            } | null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                    $delete: {
                        input: {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 404;
                    } | {
                        input: {
                            param: {
                                id: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
};
export type Client = typeof client;
export declare const hcWithType: (...args: Parameters<typeof hc>) => Client;
export default hcWithType;
