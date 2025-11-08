declare const client: {
    api: {
        v1: {
            health: import("hono/client").ClientRequest<{
                $get: {
                    input: {};
                    output: {
                        status: string;
                        time: string;
                        env: string;
                    };
                    outputFormat: "json";
                    status: 200;
                };
            }>;
        };
    };
} & {
    api: {
        v1: {
            "*": import("hono/client").ClientRequest<{}>;
        };
    };
} & {
    api: {
        v1: {
            admin: {
                auth: {
                    login: import("hono/client").ClientRequest<{
                        $post: {
                            input: {};
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
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
                            status: 200;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                auth: {
                    logout: import("hono/client").ClientRequest<{
                        $post: {
                            input: {};
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
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
                            status: 200;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                doctors: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
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
                            json: {
                                name: string;
                                email?: string | undefined;
                                specialization: string;
                                contactNumber?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                name: string;
                                email?: string | undefined;
                                specialization: string;
                                contactNumber?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: {
                                contactNumber: string | null;
                                createdAt: string;
                                email: string | null;
                                id: string;
                                name: string;
                                specialization: string;
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
    };
} & {
    api: {
        v1: {
            admin: {
                doctors: {
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
                                data: null;
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
                                data: null;
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
                            status: 200;
                        };
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
                                data: null;
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
                                data: null;
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
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    specialization?: string | undefined;
                                    contactNumber?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 404;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    specialization?: string | undefined;
                                    contactNumber?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    specialization?: string | undefined;
                                    contactNumber?: string | undefined;
                                };
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
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                doctors: {
                    bulk: import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    doctors: {
                                        name: string;
                                        email?: string | undefined;
                                        specialization: string;
                                        contactNumber?: string | undefined;
                                    }[];
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    doctors: {
                                        name: string;
                                        email?: string | undefined;
                                        specialization: string;
                                        contactNumber?: string | undefined;
                                    }[];
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    created: {
                                        contactNumber: string | null;
                                        createdAt: string;
                                        email: string | null;
                                        id: string;
                                        name: string;
                                        specialization: string;
                                        verified: boolean | null;
                                    }[];
                                    errors: {
                                        index: number;
                                        doctor: {
                                            name: string;
                                            email?: string | undefined;
                                            specialization: string;
                                            contactNumber?: string | undefined;
                                        };
                                        error: string;
                                    }[];
                                    totalRequested: number;
                                    totalCreated: number;
                                    totalErrors: number;
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
        };
    };
} & {
    api: {
        v1: {
            hp: {
                auth: {
                    login: import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    token: string;
                                    hp: {
                                        id: string;
                                        name: string;
                                        email: string;
                                    };
                                } | null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: import("hono/utils/http-status").ContentfulStatusCode;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                auth: {
                    register: import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    name: string;
                                    email: string;
                                    otp: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    token: string;
                                    hp: {
                                        id: string;
                                        name: string;
                                        email: string;
                                    };
                                } | null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: import("hono/utils/http-status").ContentfulStatusCode;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                auth: {
                    "verify-email": import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    email: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    email: string;
                                } | null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: import("hono/utils/http-status").ContentfulStatusCode;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: import("hono/client").ClientRequest<{
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
                            json: {
                                doctorId: string;
                                scheduleType: "daily" | "monthly" | "weekly";
                                weekDays?: number[] | undefined;
                                monthDays?: number[] | undefined;
                                timeSlots: {
                                    dayOfWeek?: number | undefined;
                                    dayOfMonth?: number | undefined;
                                    startTime: string;
                                    endTime: string;
                                    maxBookings: number;
                                }[];
                                isActive?: boolean | undefined;
                            };
                        };
                        output: {};
                        outputFormat: string;
                        status: import("hono/utils/http-status").StatusCode;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: {
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
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 401;
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
                                data: null;
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
                                data: null;
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
                            status: 200;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: {
                    ":id": {
                        disable: import("hono/client").ClientRequest<{
                            $post: {
                                input: {
                                    param: {
                                        id: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 401;
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
                                    data: null;
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
                                    data: null;
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
                                status: 200;
                            };
                        }>;
                    };
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: {
                    ":id": {
                        enable: import("hono/client").ClientRequest<{
                            $post: {
                                input: {
                                    param: {
                                        id: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 401;
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
                                    data: null;
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
                                    data: null;
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
                                status: 200;
                            };
                        }>;
                    };
                };
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                "send-code": import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                phone: string;
                            };
                        };
                        output: {};
                        outputFormat: string;
                        status: import("hono/utils/http-status").StatusCode;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                "verify-code": import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                phone: string;
                                code: string;
                            };
                        };
                        output: {};
                        outputFormat: string;
                        status: import("hono/utils/http-status").StatusCode;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                profile: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
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
                            data: null;
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
                            json: {
                                name?: string | undefined;
                                email?: string | undefined;
                                dateOfBirth?: string | undefined;
                                profilePicture?: string | undefined;
                            };
                        };
                        output: {};
                        outputFormat: string;
                        status: import("hono/utils/http-status").StatusCode;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                profile: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                members: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
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
                                userId: string;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                name: string;
                                gender: "female" | "male" | "other";
                                age: string;
                                phone: string | null;
                                createdAt: string;
                                updatedAt: string;
                            }[] | null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                    $post: {
                        input: {
                            json: {
                                name: string;
                                age: number;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                gender: "female" | "male" | "other";
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name: string;
                                age: number;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                gender: "female" | "male" | "other";
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                name: string;
                                age: number;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                gender: "female" | "male" | "other";
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: {
                                id: string;
                                userId: string;
                                name: string;
                                age: string;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                gender: "female" | "male" | "other";
                                phone: string | null;
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
    };
} & {
    api: {
        v1: {
            users: {
                members: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                booking: import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                memberId: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                memberId: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                memberId: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: {
                                bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                createdAt: string;
                                date: string;
                                id: string;
                                memberId: string;
                                paymentId: string | null;
                                scheduleDaysId: string;
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
    };
} & {
    api: {
        v1: {
            users: {
                booking: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                booking: {
                    ":bookingId": import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 404;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    bookings: {
                                        id: string;
                                        scheduleDaysId: string;
                                        memberId: string;
                                        date: string;
                                        bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                        paymentId: string | null;
                                        createdAt: string;
                                    };
                                    doctors: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        specialization: string;
                                        contactNumber: string | null;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    healthcare_providers: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        type: string | null;
                                        address: string | null;
                                        contactNumber: string | null;
                                        password: string;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    members: {
                                        id: string;
                                        userId: string;
                                        relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                        name: string;
                                        gender: "female" | "male" | "other";
                                        age: string;
                                        phone: string | null;
                                        createdAt: string;
                                        updatedAt: string;
                                    } | null;
                                    schedule_days: {
                                        id: string;
                                        scheduleId: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                    } | null;
                                    schedules: {
                                        id: string;
                                        hpId: string;
                                        doctorId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        daysMask: number | null;
                                        scheduleStatus: "active" | "cancelled" | "deleted" | "inactive" | null;
                                        maxBookings: number;
                                        createdAt: string;
                                    } | null;
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
        };
    };
} & {
    api: {
        v1: {
            users: {
                booking: {
                    ":bookingId": {
                        cancel: import("hono/client").ClientRequest<{
                            $post: {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 404;
                            } | {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 500;
                            } | {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: {
                                        id: string;
                                        scheduleDaysId: string;
                                        memberId: string;
                                        date: string;
                                        bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                        paymentId: string | null;
                                        createdAt: string;
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
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                booking: {
                    all: import("hono/client").ClientRequest<{
                        $get: {
                            input: {};
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
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
                                    bookings: {
                                        id: string;
                                        scheduleDaysId: string;
                                        memberId: string;
                                        date: string;
                                        bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                        paymentId: string | null;
                                        createdAt: string;
                                    };
                                    doctors: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        specialization: string;
                                        contactNumber: string | null;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    healthcare_providers: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        type: string | null;
                                        address: string | null;
                                        contactNumber: string | null;
                                        password: string;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    members: {
                                        id: string;
                                        userId: string;
                                        relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                        name: string;
                                        gender: "female" | "male" | "other";
                                        age: string;
                                        phone: string | null;
                                        createdAt: string;
                                        updatedAt: string;
                                    } | null;
                                    schedule_days: {
                                        id: string;
                                        scheduleId: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                    } | null;
                                    schedules: {
                                        id: string;
                                        hpId: string;
                                        doctorId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        daysMask: number | null;
                                        scheduleStatus: "active" | "cancelled" | "deleted" | "inactive" | null;
                                        maxBookings: number;
                                        createdAt: string;
                                    } | null;
                                }[] | null;
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
} & {
    api: {
        v1: {
            users: {
                booking: {
                    member: {
                        ":memberId": import("hono/client").ClientRequest<{
                            $get: {
                                input: {
                                    param: {
                                        memberId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 403;
                            } | {
                                input: {
                                    param: {
                                        memberId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 500;
                            } | {
                                input: {
                                    param: {
                                        memberId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: {
                                        bookings: {
                                            id: string;
                                            scheduleDaysId: string;
                                            memberId: string;
                                            date: string;
                                            bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                            paymentId: string | null;
                                            createdAt: string;
                                        };
                                        doctors: {
                                            id: string;
                                            name: string;
                                            email: string | null;
                                            specialization: string;
                                            contactNumber: string | null;
                                            createdAt: string;
                                            verified: boolean | null;
                                        } | null;
                                        healthcare_providers: {
                                            id: string;
                                            name: string;
                                            email: string;
                                            type: string | null;
                                            address: string | null;
                                            contactNumber: string | null;
                                            password: string;
                                            createdAt: string;
                                            verified: boolean | null;
                                        } | null;
                                        schedule_days: {
                                            id: string;
                                            scheduleId: string;
                                            day: number | null;
                                            startTime: string;
                                            endTime: string;
                                        } | null;
                                        schedules: {
                                            id: string;
                                            hpId: string;
                                            doctorId: string;
                                            scheduleType: "daily" | "monthly" | "weekly";
                                            daysMask: number | null;
                                            scheduleStatus: "active" | "cancelled" | "deleted" | "inactive" | null;
                                            maxBookings: number;
                                            createdAt: string;
                                        } | null;
                                    }[] | null;
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
    };
};
export type Client = typeof client;
export declare const hcWithType: (baseUrl: string, options?: import("hono").ClientRequestOptions | undefined) => {
    api: {
        v1: {
            health: import("hono/client").ClientRequest<{
                $get: {
                    input: {};
                    output: {
                        status: string;
                        time: string;
                        env: string;
                    };
                    outputFormat: "json";
                    status: 200;
                };
            }>;
        };
    };
} & {
    api: {
        v1: {
            "*": import("hono/client").ClientRequest<{}>;
        };
    };
} & {
    api: {
        v1: {
            admin: {
                auth: {
                    login: import("hono/client").ClientRequest<{
                        $post: {
                            input: {};
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
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
                            status: 200;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                auth: {
                    logout: import("hono/client").ClientRequest<{
                        $post: {
                            input: {};
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
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
                            status: 200;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                doctors: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
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
                            json: {
                                name: string;
                                email?: string | undefined;
                                specialization: string;
                                contactNumber?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                name: string;
                                email?: string | undefined;
                                specialization: string;
                                contactNumber?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: {
                                contactNumber: string | null;
                                createdAt: string;
                                email: string | null;
                                id: string;
                                name: string;
                                specialization: string;
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
    };
} & {
    api: {
        v1: {
            admin: {
                doctors: {
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
                                data: null;
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
                                data: null;
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
                            status: 200;
                        };
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
                                data: null;
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
                                data: null;
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
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    specialization?: string | undefined;
                                    contactNumber?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 404;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    specialization?: string | undefined;
                                    contactNumber?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    specialization?: string | undefined;
                                    contactNumber?: string | undefined;
                                };
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
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                doctors: {
                    bulk: import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    doctors: {
                                        name: string;
                                        email?: string | undefined;
                                        specialization: string;
                                        contactNumber?: string | undefined;
                                    }[];
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    doctors: {
                                        name: string;
                                        email?: string | undefined;
                                        specialization: string;
                                        contactNumber?: string | undefined;
                                    }[];
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    created: {
                                        contactNumber: string | null;
                                        createdAt: string;
                                        email: string | null;
                                        id: string;
                                        name: string;
                                        specialization: string;
                                        verified: boolean | null;
                                    }[];
                                    errors: {
                                        index: number;
                                        doctor: {
                                            name: string;
                                            email?: string | undefined;
                                            specialization: string;
                                            contactNumber?: string | undefined;
                                        };
                                        error: string;
                                    }[];
                                    totalRequested: number;
                                    totalCreated: number;
                                    totalErrors: number;
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
        };
    };
} & {
    api: {
        v1: {
            hp: {
                auth: {
                    login: import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    token: string;
                                    hp: {
                                        id: string;
                                        name: string;
                                        email: string;
                                    };
                                } | null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: import("hono/utils/http-status").ContentfulStatusCode;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                auth: {
                    register: import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    name: string;
                                    email: string;
                                    otp: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    token: string;
                                    hp: {
                                        id: string;
                                        name: string;
                                        email: string;
                                    };
                                } | null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: import("hono/utils/http-status").ContentfulStatusCode;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                auth: {
                    "verify-email": import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    email: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    email: string;
                                } | null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: import("hono/utils/http-status").ContentfulStatusCode;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: import("hono/client").ClientRequest<{
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
                            json: {
                                doctorId: string;
                                scheduleType: "daily" | "monthly" | "weekly";
                                weekDays?: number[] | undefined;
                                monthDays?: number[] | undefined;
                                timeSlots: {
                                    dayOfWeek?: number | undefined;
                                    dayOfMonth?: number | undefined;
                                    startTime: string;
                                    endTime: string;
                                    maxBookings: number;
                                }[];
                                isActive?: boolean | undefined;
                            };
                        };
                        output: {};
                        outputFormat: string;
                        status: import("hono/utils/http-status").StatusCode;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: {
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
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 401;
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
                                data: null;
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
                                data: null;
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
                            status: 200;
                        };
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: {
                    ":id": {
                        disable: import("hono/client").ClientRequest<{
                            $post: {
                                input: {
                                    param: {
                                        id: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 401;
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
                                    data: null;
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
                                    data: null;
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
                                status: 200;
                            };
                        }>;
                    };
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: {
                    ":id": {
                        enable: import("hono/client").ClientRequest<{
                            $post: {
                                input: {
                                    param: {
                                        id: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 401;
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
                                    data: null;
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
                                    data: null;
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
                                status: 200;
                            };
                        }>;
                    };
                };
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                "send-code": import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                phone: string;
                            };
                        };
                        output: {};
                        outputFormat: string;
                        status: import("hono/utils/http-status").StatusCode;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                "verify-code": import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                phone: string;
                                code: string;
                            };
                        };
                        output: {};
                        outputFormat: string;
                        status: import("hono/utils/http-status").StatusCode;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                profile: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
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
                            data: null;
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
                            json: {
                                name?: string | undefined;
                                email?: string | undefined;
                                dateOfBirth?: string | undefined;
                                profilePicture?: string | undefined;
                            };
                        };
                        output: {};
                        outputFormat: string;
                        status: import("hono/utils/http-status").StatusCode;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                profile: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                members: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
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
                                userId: string;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                name: string;
                                gender: "female" | "male" | "other";
                                age: string;
                                phone: string | null;
                                createdAt: string;
                                updatedAt: string;
                            }[] | null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                    $post: {
                        input: {
                            json: {
                                name: string;
                                age: number;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                gender: "female" | "male" | "other";
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name: string;
                                age: number;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                gender: "female" | "male" | "other";
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                name: string;
                                age: number;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                gender: "female" | "male" | "other";
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: {
                                id: string;
                                userId: string;
                                name: string;
                                age: string;
                                relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                gender: "female" | "male" | "other";
                                phone: string | null;
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
    };
} & {
    api: {
        v1: {
            users: {
                members: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                booking: import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                memberId: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                memberId: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: null;
                            error: import("hono/utils/types").JSONValue;
                            timestamp: string;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                memberId: string;
                            };
                        };
                        output: {
                            success: boolean;
                            statusCode: number;
                            message: string;
                            data: {
                                bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                createdAt: string;
                                date: string;
                                id: string;
                                memberId: string;
                                paymentId: string | null;
                                scheduleDaysId: string;
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
    };
} & {
    api: {
        v1: {
            users: {
                booking: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                booking: {
                    ":bookingId": import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 404;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
                                error: import("hono/utils/types").JSONValue;
                                timestamp: string;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: {
                                    bookings: {
                                        id: string;
                                        scheduleDaysId: string;
                                        memberId: string;
                                        date: string;
                                        bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                        paymentId: string | null;
                                        createdAt: string;
                                    };
                                    doctors: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        specialization: string;
                                        contactNumber: string | null;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    healthcare_providers: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        type: string | null;
                                        address: string | null;
                                        contactNumber: string | null;
                                        password: string;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    members: {
                                        id: string;
                                        userId: string;
                                        relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                        name: string;
                                        gender: "female" | "male" | "other";
                                        age: string;
                                        phone: string | null;
                                        createdAt: string;
                                        updatedAt: string;
                                    } | null;
                                    schedule_days: {
                                        id: string;
                                        scheduleId: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                    } | null;
                                    schedules: {
                                        id: string;
                                        hpId: string;
                                        doctorId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        daysMask: number | null;
                                        scheduleStatus: "active" | "cancelled" | "deleted" | "inactive" | null;
                                        maxBookings: number;
                                        createdAt: string;
                                    } | null;
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
        };
    };
} & {
    api: {
        v1: {
            users: {
                booking: {
                    ":bookingId": {
                        cancel: import("hono/client").ClientRequest<{
                            $post: {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 404;
                            } | {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 500;
                            } | {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: {
                                        id: string;
                                        scheduleDaysId: string;
                                        memberId: string;
                                        date: string;
                                        bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                        paymentId: string | null;
                                        createdAt: string;
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
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                booking: {
                    all: import("hono/client").ClientRequest<{
                        $get: {
                            input: {};
                            output: {
                                success: boolean;
                                statusCode: number;
                                message: string;
                                data: null;
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
                                    bookings: {
                                        id: string;
                                        scheduleDaysId: string;
                                        memberId: string;
                                        date: string;
                                        bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                        paymentId: string | null;
                                        createdAt: string;
                                    };
                                    doctors: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        specialization: string;
                                        contactNumber: string | null;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    healthcare_providers: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        type: string | null;
                                        address: string | null;
                                        contactNumber: string | null;
                                        password: string;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    members: {
                                        id: string;
                                        userId: string;
                                        relation: "child" | "friend" | "other" | "parent" | "sibling" | "spouse";
                                        name: string;
                                        gender: "female" | "male" | "other";
                                        age: string;
                                        phone: string | null;
                                        createdAt: string;
                                        updatedAt: string;
                                    } | null;
                                    schedule_days: {
                                        id: string;
                                        scheduleId: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                    } | null;
                                    schedules: {
                                        id: string;
                                        hpId: string;
                                        doctorId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        daysMask: number | null;
                                        scheduleStatus: "active" | "cancelled" | "deleted" | "inactive" | null;
                                        maxBookings: number;
                                        createdAt: string;
                                    } | null;
                                }[] | null;
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
} & {
    api: {
        v1: {
            users: {
                booking: {
                    member: {
                        ":memberId": import("hono/client").ClientRequest<{
                            $get: {
                                input: {
                                    param: {
                                        memberId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 403;
                            } | {
                                input: {
                                    param: {
                                        memberId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: null;
                                    error: import("hono/utils/types").JSONValue;
                                    timestamp: string;
                                };
                                outputFormat: "json";
                                status: 500;
                            } | {
                                input: {
                                    param: {
                                        memberId: string;
                                    };
                                };
                                output: {
                                    success: boolean;
                                    statusCode: number;
                                    message: string;
                                    data: {
                                        bookings: {
                                            id: string;
                                            scheduleDaysId: string;
                                            memberId: string;
                                            date: string;
                                            bookingStatus: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | null;
                                            paymentId: string | null;
                                            createdAt: string;
                                        };
                                        doctors: {
                                            id: string;
                                            name: string;
                                            email: string | null;
                                            specialization: string;
                                            contactNumber: string | null;
                                            createdAt: string;
                                            verified: boolean | null;
                                        } | null;
                                        healthcare_providers: {
                                            id: string;
                                            name: string;
                                            email: string;
                                            type: string | null;
                                            address: string | null;
                                            contactNumber: string | null;
                                            password: string;
                                            createdAt: string;
                                            verified: boolean | null;
                                        } | null;
                                        schedule_days: {
                                            id: string;
                                            scheduleId: string;
                                            day: number | null;
                                            startTime: string;
                                            endTime: string;
                                        } | null;
                                        schedules: {
                                            id: string;
                                            hpId: string;
                                            doctorId: string;
                                            scheduleType: "daily" | "monthly" | "weekly";
                                            daysMask: number | null;
                                            scheduleStatus: "active" | "cancelled" | "deleted" | "inactive" | null;
                                            maxBookings: number;
                                            createdAt: string;
                                        } | null;
                                    }[] | null;
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
    };
};
export default hcWithType;
