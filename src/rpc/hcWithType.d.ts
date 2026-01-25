declare const client: {
    api: {
        v1: {
            public: {
                departments: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                description: string | null;
                                icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                color: string | null;
                                createdAt: string;
                                updatedAt: string;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
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
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    token: string;
                                    admin: {
                                        id: string;
                                        email: string;
                                        name: string;
                                    };
                                } | undefined;
                                error: null;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name: string;
                                    email: string;
                                    otp: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    name: string;
                                    email: string;
                                    otp: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    token: string;
                                    admin: {
                                        id: string;
                                        email: string;
                                        name: string;
                                    };
                                } | undefined;
                                error: null;
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
                                        contactNumber?: string | undefined;
                                        gender?: "female" | "male" | "other" | undefined;
                                        department?: string | undefined;
                                        degrees?: string | undefined;
                                        experience?: number | undefined;
                                        specialization?: string | undefined;
                                    }[];
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    created: {
                                        contactNumber: string | null;
                                        createdAt: string;
                                        degrees: string | null;
                                        department: string | null;
                                        email: string | null;
                                        experience: number | null;
                                        gender: string | null;
                                        id: string;
                                        name: string;
                                        specialization: string | null;
                                        verified: boolean | null;
                                    }[];
                                    errors: {
                                        index: number;
                                        doctor: {
                                            name: string;
                                            email?: string | undefined;
                                            contactNumber?: string | undefined;
                                            gender?: "female" | "male" | "other" | undefined;
                                            department?: string | undefined;
                                            degrees?: string | undefined;
                                            experience?: number | undefined;
                                            specialization?: string | undefined;
                                        };
                                        error: string;
                                    }[];
                                    totalRequested: number;
                                    totalCreated: number;
                                    totalErrors: number;
                                } | undefined;
                                error: null;
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
                    ":id": import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    email: string | null;
                                    contactNumber: string | null;
                                    gender: string | null;
                                    department: string | null;
                                    degrees: string | null;
                                    experience: number | null;
                                    specialization: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                } | undefined;
                                error: null;
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
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                email: string | null;
                                contactNumber: string | null;
                                gender: string | null;
                                department: string | null;
                                degrees: string | null;
                                experience: number | null;
                                specialization: string | null;
                                createdAt: string;
                                verified: boolean | null;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                auth: {
                    "verify-email": import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    email: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    email: string;
                                } | undefined;
                                error: null;
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
                                success: true;
                                message: string;
                                data: null | undefined;
                                error: null;
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
                    $post: {
                        input: {
                            json: {
                                name: string;
                                email?: string | undefined;
                                contactNumber?: string | undefined;
                                gender?: "female" | "male" | "other" | undefined;
                                department?: string | undefined;
                                degrees?: string | undefined;
                                experience?: number | undefined;
                                specialization?: string | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                contactNumber: string | null;
                                createdAt: string;
                                degrees: string | null;
                                department: string | null;
                                email: string | null;
                                experience: number | null;
                                gender: string | null;
                                id: string;
                                name: string;
                                specialization: string | null;
                                verified: boolean | null;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                        $put: {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    contactNumber?: string | undefined;
                                    gender?: "female" | "male" | "other" | undefined;
                                    department?: string | undefined;
                                    degrees?: string | undefined;
                                    experience?: number | undefined;
                                    specialization?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    contactNumber?: string | undefined;
                                    gender?: "female" | "male" | "other" | undefined;
                                    department?: string | undefined;
                                    degrees?: string | undefined;
                                    experience?: number | undefined;
                                    specialization?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    email: string | null;
                                    contactNumber: string | null;
                                    gender: string | null;
                                    department: string | null;
                                    degrees: string | null;
                                    experience: number | null;
                                    specialization: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                } | undefined;
                                error: null;
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
                    ":id": import("hono/client").ClientRequest<{
                        $delete: {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
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
                                success: true;
                                message: string;
                                data: null | undefined;
                                error: null;
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
                departments: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                description: string | null;
                                icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                color: string | null;
                                createdAt: string;
                                updatedAt: string;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                    $post: {
                        input: {
                            json: {
                                name: string;
                                description?: string | undefined;
                                icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                color?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name: string;
                                description?: string | undefined;
                                icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                color?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                name: string;
                                description?: string | undefined;
                                icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                color?: string | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                color: string | null;
                                createdAt: string;
                                description: string | null;
                                icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                id: string;
                                name: string;
                                updatedAt: string;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                departments: {
                    ":id": import("hono/client").ClientRequest<{
                        $delete: {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
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
                                success: true;
                                message: string;
                                data: null | undefined;
                                error: null;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    description: string | null;
                                    icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                    color: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                } | undefined;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 200;
                        };
                        $put: {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    description?: string | undefined;
                                    icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                    color?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    description?: string | undefined;
                                    icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                    color?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 404;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    description?: string | undefined;
                                    icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                    color?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    description?: string | undefined;
                                    icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                    color?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    description: string | null;
                                    icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                    color: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                } | undefined;
                                error: null;
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
                "verify-code": import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                phone: string;
                                code: string;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                phone: string;
                                code: string;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                token: string;
                                user: {
                                    id: string;
                                    phone: string;
                                    email: string | null;
                                    profilePicture: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                };
                                isNewUser: boolean;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                    ":bookingId": {
                        cancel: import("hono/client").ClientRequest<{
                            $post: {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
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
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: {
                                        id: string;
                                        scheduleDaysId: string;
                                        patientId: string;
                                        date: string;
                                        queueNo: number | null;
                                        sharedCode: string | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        paymentId: string | null;
                                        createdAt: string;
                                    } | undefined;
                                    error: null;
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
                    member: {
                        ":patientId": import("hono/client").ClientRequest<{
                            $get: {
                                input: {
                                    param: {
                                        patientId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        patientId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    param: {
                                        patientId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: {
                                        bookings: {
                                            id: string;
                                            scheduleDaysId: string;
                                            patientId: string;
                                            date: string;
                                            queueNo: number | null;
                                            sharedCode: string | null;
                                            bookingStatus: "cancelled" | "confirmed" | "provisional";
                                            visitStatus: "complete" | "missed" | "ongoing";
                                            paymentId: string | null;
                                            createdAt: string;
                                        };
                                        doctors: {
                                            id: string;
                                            name: string;
                                            email: string | null;
                                            contactNumber: string | null;
                                            gender: string | null;
                                            department: string | null;
                                            degrees: string | null;
                                            experience: number | null;
                                            specialization: string | null;
                                            createdAt: string;
                                            verified: boolean | null;
                                        } | null;
                                        healthcare_providers: {
                                            id: string;
                                            name: string;
                                            email: string;
                                            contactNumber: string | null;
                                            location: string | null;
                                            pin: string | null;
                                            state: string | null;
                                            city: string | null;
                                            houseNumber: string | null;
                                            roadName: string | null;
                                            landmark: string | null;
                                            profileImage: string | null;
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
                                            maxBookings: number;
                                        } | null;
                                        schedules: {
                                            id: string;
                                            hpId: string;
                                            doctorId: string;
                                            scheduleType: "daily" | "monthly" | "weekly";
                                            daysMask: number | null;
                                            scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                            createdAt: string;
                                        } | null;
                                    }[] | undefined;
                                    error: null;
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
                doctors: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                email: string | null;
                                contactNumber: string | null;
                                gender: string | null;
                                department: string | null;
                                degrees: string | null;
                                experience: number | null;
                                specialization: string | null;
                                createdAt: string;
                                verified: boolean | null;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                members: import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                name: string;
                                dob: string;
                                gender: "female" | "male" | "other";
                                isMember?: boolean | undefined;
                                relation?: string | undefined;
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name: string;
                                dob: string;
                                gender: "female" | "male" | "other";
                                isMember?: boolean | undefined;
                                relation?: string | undefined;
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {
                            json: {
                                name: string;
                                dob: string;
                                gender: "female" | "male" | "other";
                                isMember?: boolean | undefined;
                                relation?: string | undefined;
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                name: string;
                                dob: string;
                                gender: "female" | "male" | "other";
                                isMember?: boolean | undefined;
                                relation?: string | undefined;
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                userId: string;
                                name: string | null;
                                dob: string | null;
                                relation: string | null;
                                gender: "female" | "male" | "other" | null;
                                phone: string | null;
                                isMember: boolean | null;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
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
                        output: {
                            success: true;
                            message: string;
                            data: {
                                phone: string;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
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
                                patientId: string;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                patientId: string;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                patientId: string;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                bookingStatus: "cancelled" | "confirmed" | "provisional";
                                createdAt: string;
                                date: string;
                                id: string;
                                patientId: string;
                                paymentId: string | null;
                                queueNo: number | null;
                                scheduleDaysId: string;
                                sharedCode: string | null;
                                visitStatus: "complete" | "missed" | "ongoing";
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                    all: import("hono/client").ClientRequest<{
                        $get: {
                            input: {};
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {};
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    bookings: {
                                        id: string;
                                        scheduleDaysId: string;
                                        patientId: string;
                                        date: string;
                                        queueNo: number | null;
                                        sharedCode: string | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        paymentId: string | null;
                                        createdAt: string;
                                    };
                                    doctors: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        contactNumber: string | null;
                                        gender: string | null;
                                        department: string | null;
                                        degrees: string | null;
                                        experience: number | null;
                                        specialization: string | null;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    healthcare_providers: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        contactNumber: string | null;
                                        location: string | null;
                                        pin: string | null;
                                        state: string | null;
                                        city: string | null;
                                        houseNumber: string | null;
                                        roadName: string | null;
                                        landmark: string | null;
                                        profileImage: string | null;
                                        password: string;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    members: {
                                        id: string;
                                        userId: string;
                                        relation: string | null;
                                        name: string | null;
                                        gender: "female" | "male" | "other" | null;
                                        dob: string | null;
                                        phone: string | null;
                                        isMe: boolean | null;
                                        isMember: boolean | null;
                                        createdAt: string;
                                    } | null;
                                    schedule_days: {
                                        id: string;
                                        scheduleId: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    } | null;
                                    schedules: {
                                        id: string;
                                        hpId: string;
                                        doctorId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        daysMask: number | null;
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                        createdAt: string;
                                    } | null;
                                }[] | undefined;
                                error: null;
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
                    ":bookingId": import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: true;
                                message: string;
                                data: {
                                    doctor: {
                                        id: string;
                                        name: string;
                                        department: string | null;
                                    } | null;
                                    patient: {
                                        id: string;
                                        name: string | null;
                                        dob: string | null;
                                        gender: "female" | "male" | "other" | null;
                                    } | null;
                                    schedule: {
                                        id: string | null;
                                        scheduleType: "daily" | "monthly" | "weekly" | null;
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                        startTime: string | null;
                                        endTime: string | null;
                                    };
                                    booking: {
                                        id: string;
                                        date: string;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        createdAt: string;
                                        sharedCode: string | null;
                                        queueNo: number | null;
                                    };
                                    healthcareProvider: {
                                        id: string;
                                        name: string;
                                        houseNumber: string | null;
                                        roadName: string | null;
                                        landmark: string | null;
                                        city: string | null;
                                        state: string | null;
                                        pin: string | null;
                                    } | null;
                                } | null | undefined;
                                error: null;
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
                members: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                userId: string;
                                relation: string | null;
                                name: string | null;
                                gender: "female" | "male" | "other" | null;
                                dob: string | null;
                                phone: string | null;
                                isMe: boolean | null;
                                isMember: boolean | null;
                                createdAt: string;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                    ":memberId": import("hono/client").ClientRequest<{
                        $put: {
                            input: {
                                json: {
                                    name: string;
                                    dob: string;
                                    gender: "female" | "male" | "other";
                                    isMember?: boolean | undefined;
                                    relation?: string | undefined;
                                    phone?: string | undefined;
                                };
                            } & {
                                param: {
                                    memberId: string;
                                };
                            };
                            output: {
                                error: string;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name: string;
                                    dob: string;
                                    gender: "female" | "male" | "other";
                                    isMember?: boolean | undefined;
                                    relation?: string | undefined;
                                    phone?: string | undefined;
                                };
                            } & {
                                param: {
                                    memberId: string;
                                };
                            };
                            output: {
                                success: true;
                                member: {
                                    id: string;
                                    userId: string;
                                    relation: string | null;
                                    name: string | null;
                                    gender: "female" | "male" | "other" | null;
                                    dob: string | null;
                                    phone: string | null;
                                    isMe: boolean | null;
                                    isMember: boolean | null;
                                    createdAt: string;
                                };
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
            users: {
                doctors: {
                    availability: import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 404;
                        } | {
                            input: {
                                json: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    scheduleId: string;
                                    scheduleType: "daily" | "monthly" | "weekly";
                                    healthcareProvider: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        contactNumber: string | null;
                                        city: string | null;
                                        state: string | null;
                                        pin: string | null;
                                        houseNumber: string | null;
                                        roadName: string | null;
                                        landmark: string | null;
                                        profileImage: string | null;
                                    };
                                    timeSlots: {
                                        scheduleDayId: string;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    }[];
                                }[] | undefined;
                                error: null;
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
                profile: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                user: {
                                    id: string;
                                    phone: string;
                                    email: string | null;
                                    profilePicture: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                };
                            } | undefined;
                            error: null;
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
                                gender?: "female" | "male" | "other" | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name?: string | undefined;
                                email?: string | undefined;
                                dateOfBirth?: string | undefined;
                                profilePicture?: string | undefined;
                                gender?: "female" | "male" | "other" | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {
                            json: {
                                name?: string | undefined;
                                email?: string | undefined;
                                dateOfBirth?: string | undefined;
                                profilePicture?: string | undefined;
                                gender?: "female" | "male" | "other" | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                user: {
                                    id: string;
                                    phone: string;
                                    email: string | null;
                                    profilePicture: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                };
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    email: string;
                                } | undefined;
                                error: null;
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
                bookings: {
                    list: import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                query: {
                                    doctorId?: string | undefined;
                                    date?: string | undefined;
                                    scheduleStatus?: "applied" | "approved" | "pending" | "rejected" | undefined;
                                    visitStatus?: "complete" | "missed" | "ongoing" | undefined;
                                    bookingStatus?: "cancelled" | "confirmed" | "provisional" | undefined;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                query: {
                                    doctorId?: string | undefined;
                                    date?: string | undefined;
                                    scheduleStatus?: "applied" | "approved" | "pending" | "rejected" | undefined;
                                    visitStatus?: "complete" | "missed" | "ongoing" | undefined;
                                    bookingStatus?: "cancelled" | "confirmed" | "provisional" | undefined;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    booking: {
                                        id: string;
                                        date: string;
                                        queueNo: number | null;
                                        sharedCode: string | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        createdAt: string;
                                    };
                                    scheduleDay: {
                                        id: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    };
                                    schedule: {
                                        id: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                    };
                                    doctor: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        contactNumber: string | null;
                                        specialization: string | null;
                                        department: string | null;
                                        gender: string | null;
                                    };
                                    member: {
                                        id: string;
                                        name: string | null;
                                        gender: "female" | "male" | "other" | null;
                                        relation: string | null;
                                        dob: string | null;
                                        phone: string | null;
                                    };
                                    user: {
                                        id: string;
                                        phone: string;
                                        email: string | null;
                                    };
                                }[] | undefined;
                                error: null;
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
                bookings: {
                    ":bookingId": import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: true;
                                message: string;
                                data: {
                                    booking: {
                                        id: string;
                                        date: string;
                                        queueNo: number | null;
                                        sharedCode: string | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        createdAt: string;
                                    };
                                    scheduleDay: {
                                        id: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    };
                                    schedule: {
                                        id: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                    };
                                    doctor: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        contactNumber: string | null;
                                        specialization: string | null;
                                        department: string | null;
                                        gender: string | null;
                                        degrees: string | null;
                                        experience: number | null;
                                    };
                                    member: {
                                        id: string;
                                        name: string | null;
                                        gender: "female" | "male" | "other" | null;
                                        relation: string | null;
                                        dob: string | null;
                                        phone: string | null;
                                    };
                                    user: {
                                        id: string;
                                        phone: string;
                                        email: string | null;
                                    };
                                } | undefined;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 200;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
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
                bookings: {
                    "by-doctor": {
                        ":doctorId": import("hono/client").ClientRequest<{
                            $get: {
                                input: {
                                    query: {
                                        date?: string | undefined;
                                    };
                                } & {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    query: {
                                        date?: string | undefined;
                                    };
                                } & {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: import("hono/utils/types").JSONValue;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 500;
                            } | {
                                input: {
                                    query: {
                                        date?: string | undefined;
                                    };
                                } & {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: {
                                        bookingId: string;
                                        date: string;
                                        queueNo: number | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        sharedCode: string | null;
                                        scheduleDayId: string;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                        scheduleId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        doctorId: string;
                                        doctorName: string;
                                        memberId: string | null;
                                        memberName: string | null;
                                        memberPhone: string | null;
                                    }[] | undefined;
                                    error: null;
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
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        id: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
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
                                    success: false;
                                    message: string;
                                    data: import("hono/utils/types").JSONValue;
                                    error: null;
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
                                    success: true;
                                    message: string;
                                    data: null | undefined;
                                    error: null;
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
                    ":id": import("hono/client").ClientRequest<{
                        $put: {
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
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
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
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
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
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
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
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    hpId: string;
                                    doctorId: string;
                                    scheduleType: "daily" | "monthly" | "weekly";
                                    daysMask: number | null;
                                    scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                    createdAt: string;
                                    timeSlots: {
                                        id: string;
                                        scheduleId: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    }[];
                                } | undefined;
                                error: null;
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
                doctors: {
                    all: import("hono/client").ClientRequest<{
                        $get: {
                            input: {};
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    email: string | null;
                                    contactNumber: string | null;
                                    gender: string | null;
                                    department: string | null;
                                    degrees: string | null;
                                    experience: number | null;
                                    specialization: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                }[] | undefined;
                                error: null;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name: string;
                                    email: string;
                                    otp: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    token: string;
                                    hp: {
                                        id: string;
                                        name: string;
                                        email: string;
                                    };
                                } | undefined;
                                error: null;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    token: string;
                                    hp: {
                                        id: string;
                                        email: string;
                                        name: string;
                                    };
                                } | undefined;
                                error: null;
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
                schedules: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: null | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: import("hono/client").ClientRequest<{
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
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
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
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
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
                        output: {
                            success: false;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
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
                        output: {
                            success: true;
                            message: string;
                            data: {
                                createdAt: string;
                                daysMask: number | null;
                                doctorId: string;
                                hpId: string;
                                id: string;
                                scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                scheduleType: "daily" | "monthly" | "weekly";
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                    ":id": import("hono/client").ClientRequest<{
                        $delete: {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
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
                                success: true;
                                message: string;
                                data: null | undefined;
                                error: null;
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
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        id: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
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
                                    success: false;
                                    message: string;
                                    data: import("hono/utils/types").JSONValue;
                                    error: null;
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
                                    success: true;
                                    message: string;
                                    data: null | undefined;
                                    error: null;
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
                    doctor: {
                        ":doctorId": import("hono/client").ClientRequest<{
                            $get: {
                                input: {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 404;
                            } | {
                                input: {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: {
                                        id: string;
                                        doctorId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        daysMask: number | null;
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                        createdAt: string;
                                        timeSlots: {
                                            id: string;
                                            scheduleId: string;
                                            day: number | null;
                                            startTime: string;
                                            endTime: string;
                                            maxBookings: number;
                                        }[];
                                    }[] | undefined;
                                    error: null;
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
                    day: {
                        ":scheduleDayId": import("hono/client").ClientRequest<{
                            $delete: {
                                input: {
                                    param: {
                                        scheduleDayId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        scheduleDayId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    param: {
                                        scheduleDayId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: import("hono/utils/types").JSONValue;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 500;
                            } | {
                                input: {
                                    param: {
                                        scheduleDayId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: null | undefined;
                                    error: null;
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
                doctors: {
                    "my-doctors": import("hono/client").ClientRequest<{
                        $get: {
                            input: {};
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {};
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    email: string | null;
                                    contactNumber: string | null;
                                    gender: string | null;
                                    department: string | null;
                                    degrees: string | null;
                                    experience: number | null;
                                    specialization: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                }[] | undefined;
                                error: null;
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
                bookings: {
                    patients: import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                query: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                query: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                query: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    date: string;
                                    patient: {
                                        id: string;
                                        fullName: string | null;
                                        email: string | null;
                                        dob: string | null;
                                        gender: "female" | "male" | "other" | null;
                                    };
                                    queueNo: number | null;
                                    bookingStatus: "cancelled" | "confirmed" | "provisional";
                                    visitStatus: "complete" | "missed" | "ongoing";
                                    sharedCode: string | null;
                                    paymentId: string | null;
                                }[] | null | undefined;
                                error: null;
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
                bookings: {
                    patients: {
                        ":bookingId": {
                            status: import("hono/client").ClientRequest<{
                                $put: {
                                    input: {
                                        json: {
                                            visitStatus: "complete" | "missed" | "ongoing";
                                        };
                                    } & {
                                        param: {
                                            bookingId: string;
                                        };
                                    };
                                    output: {
                                        success: false;
                                        message: string;
                                        data: null;
                                        error: null;
                                    };
                                    outputFormat: "json";
                                    status: 401;
                                } | {
                                    input: {
                                        json: {
                                            visitStatus: "complete" | "missed" | "ongoing";
                                        };
                                    } & {
                                        param: {
                                            bookingId: string;
                                        };
                                    };
                                    output: {
                                        success: false;
                                        message: string;
                                        data: null;
                                        error: null;
                                    };
                                    outputFormat: "json";
                                    status: 500;
                                } | {
                                    input: {
                                        json: {
                                            visitStatus: "complete" | "missed" | "ongoing";
                                        };
                                    } & {
                                        param: {
                                            bookingId: string;
                                        };
                                    };
                                    output: {
                                        success: true;
                                        message: string;
                                        data: {
                                            id: string;
                                            scheduleDaysId: string;
                                            patientId: string;
                                            date: string;
                                            queueNo: number | null;
                                            sharedCode: string | null;
                                            bookingStatus: "cancelled" | "confirmed" | "provisional";
                                            visitStatus: "complete" | "missed" | "ongoing";
                                            paymentId: string | null;
                                            createdAt: string;
                                        } | null | undefined;
                                        error: null;
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
} & {
    api: {
        v1: {
            hp: {
                bookings: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                doctors: {
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
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                profile: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                hp: {
                                    id: string;
                                    name: string;
                                    email: string;
                                    contactNumber: string | null;
                                    location: string | null;
                                    pin: string | null;
                                    state: string | null;
                                    city: string | null;
                                    houseNumber: string | null;
                                    roadName: string | null;
                                    landmark: string | null;
                                    profileImage: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                };
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                    $put: {
                        input: {
                            json: {
                                name?: string | undefined;
                                contactNumber?: string | undefined;
                                location?: string | undefined;
                                pin?: string | undefined;
                                state?: string | undefined;
                                city?: string | undefined;
                                houseNumber?: string | undefined;
                                roadName?: string | undefined;
                                landmark?: string | undefined;
                                profileImage?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name?: string | undefined;
                                contactNumber?: string | undefined;
                                location?: string | undefined;
                                pin?: string | undefined;
                                state?: string | undefined;
                                city?: string | undefined;
                                houseNumber?: string | undefined;
                                roadName?: string | undefined;
                                landmark?: string | undefined;
                                profileImage?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {
                            json: {
                                name?: string | undefined;
                                contactNumber?: string | undefined;
                                location?: string | undefined;
                                pin?: string | undefined;
                                state?: string | undefined;
                                city?: string | undefined;
                                houseNumber?: string | undefined;
                                roadName?: string | undefined;
                                landmark?: string | undefined;
                                profileImage?: string | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                hp: {
                                    id: string;
                                    name: string;
                                    email: string;
                                    contactNumber: string | null;
                                    location: string | null;
                                    pin: string | null;
                                    state: string | null;
                                    city: string | null;
                                    houseNumber: string | null;
                                    roadName: string | null;
                                    landmark: string | null;
                                    profileImage: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                };
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                profile: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
};
export type Client = typeof client;
export declare const hcWithType: (baseUrl: string, options?: import("hono").ClientRequestOptions | undefined) => {
    api: {
        v1: {
            public: {
                departments: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                description: string | null;
                                icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                color: string | null;
                                createdAt: string;
                                updatedAt: string;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
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
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    token: string;
                                    admin: {
                                        id: string;
                                        email: string;
                                        name: string;
                                    };
                                } | undefined;
                                error: null;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name: string;
                                    email: string;
                                    otp: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    name: string;
                                    email: string;
                                    otp: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    token: string;
                                    admin: {
                                        id: string;
                                        email: string;
                                        name: string;
                                    };
                                } | undefined;
                                error: null;
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
                                        contactNumber?: string | undefined;
                                        gender?: "female" | "male" | "other" | undefined;
                                        department?: string | undefined;
                                        degrees?: string | undefined;
                                        experience?: number | undefined;
                                        specialization?: string | undefined;
                                    }[];
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    created: {
                                        contactNumber: string | null;
                                        createdAt: string;
                                        degrees: string | null;
                                        department: string | null;
                                        email: string | null;
                                        experience: number | null;
                                        gender: string | null;
                                        id: string;
                                        name: string;
                                        specialization: string | null;
                                        verified: boolean | null;
                                    }[];
                                    errors: {
                                        index: number;
                                        doctor: {
                                            name: string;
                                            email?: string | undefined;
                                            contactNumber?: string | undefined;
                                            gender?: "female" | "male" | "other" | undefined;
                                            department?: string | undefined;
                                            degrees?: string | undefined;
                                            experience?: number | undefined;
                                            specialization?: string | undefined;
                                        };
                                        error: string;
                                    }[];
                                    totalRequested: number;
                                    totalCreated: number;
                                    totalErrors: number;
                                } | undefined;
                                error: null;
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
                    ":id": import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    email: string | null;
                                    contactNumber: string | null;
                                    gender: string | null;
                                    department: string | null;
                                    degrees: string | null;
                                    experience: number | null;
                                    specialization: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                } | undefined;
                                error: null;
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
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                email: string | null;
                                contactNumber: string | null;
                                gender: string | null;
                                department: string | null;
                                degrees: string | null;
                                experience: number | null;
                                specialization: string | null;
                                createdAt: string;
                                verified: boolean | null;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                auth: {
                    "verify-email": import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    email: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    email: string;
                                } | undefined;
                                error: null;
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
                                success: true;
                                message: string;
                                data: null | undefined;
                                error: null;
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
                    $post: {
                        input: {
                            json: {
                                name: string;
                                email?: string | undefined;
                                contactNumber?: string | undefined;
                                gender?: "female" | "male" | "other" | undefined;
                                department?: string | undefined;
                                degrees?: string | undefined;
                                experience?: number | undefined;
                                specialization?: string | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                contactNumber: string | null;
                                createdAt: string;
                                degrees: string | null;
                                department: string | null;
                                email: string | null;
                                experience: number | null;
                                gender: string | null;
                                id: string;
                                name: string;
                                specialization: string | null;
                                verified: boolean | null;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                        $put: {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    contactNumber?: string | undefined;
                                    gender?: "female" | "male" | "other" | undefined;
                                    department?: string | undefined;
                                    degrees?: string | undefined;
                                    experience?: number | undefined;
                                    specialization?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    email?: string | undefined;
                                    contactNumber?: string | undefined;
                                    gender?: "female" | "male" | "other" | undefined;
                                    department?: string | undefined;
                                    degrees?: string | undefined;
                                    experience?: number | undefined;
                                    specialization?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    email: string | null;
                                    contactNumber: string | null;
                                    gender: string | null;
                                    department: string | null;
                                    degrees: string | null;
                                    experience: number | null;
                                    specialization: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                } | undefined;
                                error: null;
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
                    ":id": import("hono/client").ClientRequest<{
                        $delete: {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
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
                                success: true;
                                message: string;
                                data: null | undefined;
                                error: null;
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
                departments: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                description: string | null;
                                icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                color: string | null;
                                createdAt: string;
                                updatedAt: string;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                    $post: {
                        input: {
                            json: {
                                name: string;
                                description?: string | undefined;
                                icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                color?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name: string;
                                description?: string | undefined;
                                icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                color?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                name: string;
                                description?: string | undefined;
                                icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                color?: string | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                color: string | null;
                                createdAt: string;
                                description: string | null;
                                icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                id: string;
                                name: string;
                                updatedAt: string;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            admin: {
                departments: {
                    ":id": import("hono/client").ClientRequest<{
                        $delete: {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
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
                                success: true;
                                message: string;
                                data: null | undefined;
                                error: null;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    description: string | null;
                                    icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                    color: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                } | undefined;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 200;
                        };
                        $put: {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    description?: string | undefined;
                                    icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                    color?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    description?: string | undefined;
                                    icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                    color?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 404;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    description?: string | undefined;
                                    icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                    color?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    name?: string | undefined;
                                    description?: string | undefined;
                                    icon?: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | undefined;
                                    color?: string | undefined;
                                };
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    description: string | null;
                                    icon: "Bone02Icon" | "Brain01Icon" | "Cardiogram02Icon" | "DigestionIcon" | "FemaleSymbolIcon" | "Medicine02Icon" | "PatientIcon" | null;
                                    color: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                } | undefined;
                                error: null;
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
                "verify-code": import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                phone: string;
                                code: string;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                phone: string;
                                code: string;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                token: string;
                                user: {
                                    id: string;
                                    phone: string;
                                    email: string | null;
                                    profilePicture: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                };
                                isNewUser: boolean;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                    ":bookingId": {
                        cancel: import("hono/client").ClientRequest<{
                            $post: {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
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
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    param: {
                                        bookingId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: {
                                        id: string;
                                        scheduleDaysId: string;
                                        patientId: string;
                                        date: string;
                                        queueNo: number | null;
                                        sharedCode: string | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        paymentId: string | null;
                                        createdAt: string;
                                    } | undefined;
                                    error: null;
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
                    member: {
                        ":patientId": import("hono/client").ClientRequest<{
                            $get: {
                                input: {
                                    param: {
                                        patientId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        patientId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    param: {
                                        patientId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: {
                                        bookings: {
                                            id: string;
                                            scheduleDaysId: string;
                                            patientId: string;
                                            date: string;
                                            queueNo: number | null;
                                            sharedCode: string | null;
                                            bookingStatus: "cancelled" | "confirmed" | "provisional";
                                            visitStatus: "complete" | "missed" | "ongoing";
                                            paymentId: string | null;
                                            createdAt: string;
                                        };
                                        doctors: {
                                            id: string;
                                            name: string;
                                            email: string | null;
                                            contactNumber: string | null;
                                            gender: string | null;
                                            department: string | null;
                                            degrees: string | null;
                                            experience: number | null;
                                            specialization: string | null;
                                            createdAt: string;
                                            verified: boolean | null;
                                        } | null;
                                        healthcare_providers: {
                                            id: string;
                                            name: string;
                                            email: string;
                                            contactNumber: string | null;
                                            location: string | null;
                                            pin: string | null;
                                            state: string | null;
                                            city: string | null;
                                            houseNumber: string | null;
                                            roadName: string | null;
                                            landmark: string | null;
                                            profileImage: string | null;
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
                                            maxBookings: number;
                                        } | null;
                                        schedules: {
                                            id: string;
                                            hpId: string;
                                            doctorId: string;
                                            scheduleType: "daily" | "monthly" | "weekly";
                                            daysMask: number | null;
                                            scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                            createdAt: string;
                                        } | null;
                                    }[] | undefined;
                                    error: null;
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
                doctors: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                name: string;
                                email: string | null;
                                contactNumber: string | null;
                                gender: string | null;
                                department: string | null;
                                degrees: string | null;
                                experience: number | null;
                                specialization: string | null;
                                createdAt: string;
                                verified: boolean | null;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            users: {
                members: import("hono/client").ClientRequest<{
                    $post: {
                        input: {
                            json: {
                                name: string;
                                dob: string;
                                gender: "female" | "male" | "other";
                                isMember?: boolean | undefined;
                                relation?: string | undefined;
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name: string;
                                dob: string;
                                gender: "female" | "male" | "other";
                                isMember?: boolean | undefined;
                                relation?: string | undefined;
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {
                            json: {
                                name: string;
                                dob: string;
                                gender: "female" | "male" | "other";
                                isMember?: boolean | undefined;
                                relation?: string | undefined;
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
                        input: {
                            json: {
                                name: string;
                                dob: string;
                                gender: "female" | "male" | "other";
                                isMember?: boolean | undefined;
                                relation?: string | undefined;
                                phone?: string | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                userId: string;
                                name: string | null;
                                dob: string | null;
                                relation: string | null;
                                gender: "female" | "male" | "other" | null;
                                phone: string | null;
                                isMember: boolean | null;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
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
                        output: {
                            success: true;
                            message: string;
                            data: {
                                phone: string;
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
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
                                patientId: string;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                patientId: string;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {
                            json: {
                                scheduleDaysId: string;
                                date: string;
                                patientId: string;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                bookingStatus: "cancelled" | "confirmed" | "provisional";
                                createdAt: string;
                                date: string;
                                id: string;
                                patientId: string;
                                paymentId: string | null;
                                queueNo: number | null;
                                scheduleDaysId: string;
                                sharedCode: string | null;
                                visitStatus: "complete" | "missed" | "ongoing";
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                    all: import("hono/client").ClientRequest<{
                        $get: {
                            input: {};
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {};
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    bookings: {
                                        id: string;
                                        scheduleDaysId: string;
                                        patientId: string;
                                        date: string;
                                        queueNo: number | null;
                                        sharedCode: string | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        paymentId: string | null;
                                        createdAt: string;
                                    };
                                    doctors: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        contactNumber: string | null;
                                        gender: string | null;
                                        department: string | null;
                                        degrees: string | null;
                                        experience: number | null;
                                        specialization: string | null;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    healthcare_providers: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        contactNumber: string | null;
                                        location: string | null;
                                        pin: string | null;
                                        state: string | null;
                                        city: string | null;
                                        houseNumber: string | null;
                                        roadName: string | null;
                                        landmark: string | null;
                                        profileImage: string | null;
                                        password: string;
                                        createdAt: string;
                                        verified: boolean | null;
                                    } | null;
                                    members: {
                                        id: string;
                                        userId: string;
                                        relation: string | null;
                                        name: string | null;
                                        gender: "female" | "male" | "other" | null;
                                        dob: string | null;
                                        phone: string | null;
                                        isMe: boolean | null;
                                        isMember: boolean | null;
                                        createdAt: string;
                                    } | null;
                                    schedule_days: {
                                        id: string;
                                        scheduleId: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    } | null;
                                    schedules: {
                                        id: string;
                                        hpId: string;
                                        doctorId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        daysMask: number | null;
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                        createdAt: string;
                                    } | null;
                                }[] | undefined;
                                error: null;
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
                    ":bookingId": import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: true;
                                message: string;
                                data: {
                                    doctor: {
                                        id: string;
                                        name: string;
                                        department: string | null;
                                    } | null;
                                    patient: {
                                        id: string;
                                        name: string | null;
                                        dob: string | null;
                                        gender: "female" | "male" | "other" | null;
                                    } | null;
                                    schedule: {
                                        id: string | null;
                                        scheduleType: "daily" | "monthly" | "weekly" | null;
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                        startTime: string | null;
                                        endTime: string | null;
                                    };
                                    booking: {
                                        id: string;
                                        date: string;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        createdAt: string;
                                        sharedCode: string | null;
                                        queueNo: number | null;
                                    };
                                    healthcareProvider: {
                                        id: string;
                                        name: string;
                                        houseNumber: string | null;
                                        roadName: string | null;
                                        landmark: string | null;
                                        city: string | null;
                                        state: string | null;
                                        pin: string | null;
                                    } | null;
                                } | null | undefined;
                                error: null;
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
                members: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                id: string;
                                userId: string;
                                relation: string | null;
                                name: string | null;
                                gender: "female" | "male" | "other" | null;
                                dob: string | null;
                                phone: string | null;
                                isMe: boolean | null;
                                isMember: boolean | null;
                                createdAt: string;
                            }[] | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                    ":memberId": import("hono/client").ClientRequest<{
                        $put: {
                            input: {
                                json: {
                                    name: string;
                                    dob: string;
                                    gender: "female" | "male" | "other";
                                    isMember?: boolean | undefined;
                                    relation?: string | undefined;
                                    phone?: string | undefined;
                                };
                            } & {
                                param: {
                                    memberId: string;
                                };
                            };
                            output: {
                                error: string;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name: string;
                                    dob: string;
                                    gender: "female" | "male" | "other";
                                    isMember?: boolean | undefined;
                                    relation?: string | undefined;
                                    phone?: string | undefined;
                                };
                            } & {
                                param: {
                                    memberId: string;
                                };
                            };
                            output: {
                                success: true;
                                member: {
                                    id: string;
                                    userId: string;
                                    relation: string | null;
                                    name: string | null;
                                    gender: "female" | "male" | "other" | null;
                                    dob: string | null;
                                    phone: string | null;
                                    isMe: boolean | null;
                                    isMember: boolean | null;
                                    createdAt: string;
                                };
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
            users: {
                doctors: {
                    availability: import("hono/client").ClientRequest<{
                        $post: {
                            input: {
                                json: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 404;
                        } | {
                            input: {
                                json: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                json: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    scheduleId: string;
                                    scheduleType: "daily" | "monthly" | "weekly";
                                    healthcareProvider: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        contactNumber: string | null;
                                        city: string | null;
                                        state: string | null;
                                        pin: string | null;
                                        houseNumber: string | null;
                                        roadName: string | null;
                                        landmark: string | null;
                                        profileImage: string | null;
                                    };
                                    timeSlots: {
                                        scheduleDayId: string;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    }[];
                                }[] | undefined;
                                error: null;
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
                profile: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                user: {
                                    id: string;
                                    phone: string;
                                    email: string | null;
                                    profilePicture: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                };
                            } | undefined;
                            error: null;
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
                                gender?: "female" | "male" | "other" | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name?: string | undefined;
                                email?: string | undefined;
                                dateOfBirth?: string | undefined;
                                profilePicture?: string | undefined;
                                gender?: "female" | "male" | "other" | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {
                            json: {
                                name?: string | undefined;
                                email?: string | undefined;
                                dateOfBirth?: string | undefined;
                                profilePicture?: string | undefined;
                                gender?: "female" | "male" | "other" | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                user: {
                                    id: string;
                                    phone: string;
                                    email: string | null;
                                    profilePicture: string | null;
                                    createdAt: string;
                                    updatedAt: string;
                                };
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    email: string;
                                } | undefined;
                                error: null;
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
                bookings: {
                    list: import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                query: {
                                    doctorId?: string | undefined;
                                    date?: string | undefined;
                                    scheduleStatus?: "applied" | "approved" | "pending" | "rejected" | undefined;
                                    visitStatus?: "complete" | "missed" | "ongoing" | undefined;
                                    bookingStatus?: "cancelled" | "confirmed" | "provisional" | undefined;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                query: {
                                    doctorId?: string | undefined;
                                    date?: string | undefined;
                                    scheduleStatus?: "applied" | "approved" | "pending" | "rejected" | undefined;
                                    visitStatus?: "complete" | "missed" | "ongoing" | undefined;
                                    bookingStatus?: "cancelled" | "confirmed" | "provisional" | undefined;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    booking: {
                                        id: string;
                                        date: string;
                                        queueNo: number | null;
                                        sharedCode: string | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        createdAt: string;
                                    };
                                    scheduleDay: {
                                        id: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    };
                                    schedule: {
                                        id: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                    };
                                    doctor: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        contactNumber: string | null;
                                        specialization: string | null;
                                        department: string | null;
                                        gender: string | null;
                                    };
                                    member: {
                                        id: string;
                                        name: string | null;
                                        gender: "female" | "male" | "other" | null;
                                        relation: string | null;
                                        dob: string | null;
                                        phone: string | null;
                                    };
                                    user: {
                                        id: string;
                                        phone: string;
                                        email: string | null;
                                    };
                                }[] | undefined;
                                error: null;
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
                bookings: {
                    ":bookingId": import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: true;
                                message: string;
                                data: {
                                    booking: {
                                        id: string;
                                        date: string;
                                        queueNo: number | null;
                                        sharedCode: string | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        createdAt: string;
                                    };
                                    scheduleDay: {
                                        id: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    };
                                    schedule: {
                                        id: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                    };
                                    doctor: {
                                        id: string;
                                        name: string;
                                        email: string | null;
                                        contactNumber: string | null;
                                        specialization: string | null;
                                        department: string | null;
                                        gender: string | null;
                                        degrees: string | null;
                                        experience: number | null;
                                    };
                                    member: {
                                        id: string;
                                        name: string | null;
                                        gender: "female" | "male" | "other" | null;
                                        relation: string | null;
                                        dob: string | null;
                                        phone: string | null;
                                    };
                                    user: {
                                        id: string;
                                        phone: string;
                                        email: string | null;
                                    };
                                } | undefined;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 200;
                        } | {
                            input: {
                                param: {
                                    bookingId: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
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
                bookings: {
                    "by-doctor": {
                        ":doctorId": import("hono/client").ClientRequest<{
                            $get: {
                                input: {
                                    query: {
                                        date?: string | undefined;
                                    };
                                } & {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    query: {
                                        date?: string | undefined;
                                    };
                                } & {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: import("hono/utils/types").JSONValue;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 500;
                            } | {
                                input: {
                                    query: {
                                        date?: string | undefined;
                                    };
                                } & {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: {
                                        bookingId: string;
                                        date: string;
                                        queueNo: number | null;
                                        bookingStatus: "cancelled" | "confirmed" | "provisional";
                                        visitStatus: "complete" | "missed" | "ongoing";
                                        sharedCode: string | null;
                                        scheduleDayId: string;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                        scheduleId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        doctorId: string;
                                        doctorName: string;
                                        memberId: string | null;
                                        memberName: string | null;
                                        memberPhone: string | null;
                                    }[] | undefined;
                                    error: null;
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
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        id: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
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
                                    success: false;
                                    message: string;
                                    data: import("hono/utils/types").JSONValue;
                                    error: null;
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
                                    success: true;
                                    message: string;
                                    data: null | undefined;
                                    error: null;
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
                    ":id": import("hono/client").ClientRequest<{
                        $put: {
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
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
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
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
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
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
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
                            } & {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    hpId: string;
                                    doctorId: string;
                                    scheduleType: "daily" | "monthly" | "weekly";
                                    daysMask: number | null;
                                    scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                    createdAt: string;
                                    timeSlots: {
                                        id: string;
                                        scheduleId: string;
                                        day: number | null;
                                        startTime: string;
                                        endTime: string;
                                        maxBookings: number;
                                    }[];
                                } | undefined;
                                error: null;
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
                doctors: {
                    all: import("hono/client").ClientRequest<{
                        $get: {
                            input: {};
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    email: string | null;
                                    contactNumber: string | null;
                                    gender: string | null;
                                    department: string | null;
                                    degrees: string | null;
                                    experience: number | null;
                                    specialization: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                }[] | undefined;
                                error: null;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                json: {
                                    name: string;
                                    email: string;
                                    otp: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    token: string;
                                    hp: {
                                        id: string;
                                        name: string;
                                        email: string;
                                    };
                                } | undefined;
                                error: null;
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
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                json: {
                                    email: string;
                                    password: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    token: string;
                                    hp: {
                                        id: string;
                                        email: string;
                                        name: string;
                                    };
                                } | undefined;
                                error: null;
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
                schedules: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: null | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                schedules: import("hono/client").ClientRequest<{
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
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
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
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
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
                        output: {
                            success: false;
                            message: string;
                            data: import("hono/utils/types").JSONValue;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 500;
                    } | {
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
                        output: {
                            success: true;
                            message: string;
                            data: {
                                createdAt: string;
                                daysMask: number | null;
                                doctorId: string;
                                hpId: string;
                                id: string;
                                scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                scheduleType: "daily" | "monthly" | "weekly";
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
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
                    ":id": import("hono/client").ClientRequest<{
                        $delete: {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 400;
                        } | {
                            input: {
                                param: {
                                    id: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
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
                                success: false;
                                message: string;
                                data: import("hono/utils/types").JSONValue;
                                error: null;
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
                                success: true;
                                message: string;
                                data: null | undefined;
                                error: null;
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
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        id: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
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
                                    success: false;
                                    message: string;
                                    data: import("hono/utils/types").JSONValue;
                                    error: null;
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
                                    success: true;
                                    message: string;
                                    data: null | undefined;
                                    error: null;
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
                    doctor: {
                        ":doctorId": import("hono/client").ClientRequest<{
                            $get: {
                                input: {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 404;
                            } | {
                                input: {
                                    param: {
                                        doctorId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: {
                                        id: string;
                                        doctorId: string;
                                        scheduleType: "daily" | "monthly" | "weekly";
                                        daysMask: number | null;
                                        scheduleStatus: "active" | "applied" | "approved" | "inactive" | "pending" | "rejected" | null;
                                        createdAt: string;
                                        timeSlots: {
                                            id: string;
                                            scheduleId: string;
                                            day: number | null;
                                            startTime: string;
                                            endTime: string;
                                            maxBookings: number;
                                        }[];
                                    }[] | undefined;
                                    error: null;
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
                    day: {
                        ":scheduleDayId": import("hono/client").ClientRequest<{
                            $delete: {
                                input: {
                                    param: {
                                        scheduleDayId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 400;
                            } | {
                                input: {
                                    param: {
                                        scheduleDayId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: null;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 401;
                            } | {
                                input: {
                                    param: {
                                        scheduleDayId: string;
                                    };
                                };
                                output: {
                                    success: false;
                                    message: string;
                                    data: import("hono/utils/types").JSONValue;
                                    error: null;
                                };
                                outputFormat: "json";
                                status: 500;
                            } | {
                                input: {
                                    param: {
                                        scheduleDayId: string;
                                    };
                                };
                                output: {
                                    success: true;
                                    message: string;
                                    data: null | undefined;
                                    error: null;
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
                doctors: {
                    "my-doctors": import("hono/client").ClientRequest<{
                        $get: {
                            input: {};
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {};
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    name: string;
                                    email: string | null;
                                    contactNumber: string | null;
                                    gender: string | null;
                                    department: string | null;
                                    degrees: string | null;
                                    experience: number | null;
                                    specialization: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                }[] | undefined;
                                error: null;
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
                bookings: {
                    patients: import("hono/client").ClientRequest<{
                        $get: {
                            input: {
                                query: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 401;
                        } | {
                            input: {
                                query: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: false;
                                message: string;
                                data: null;
                                error: null;
                            };
                            outputFormat: "json";
                            status: 500;
                        } | {
                            input: {
                                query: {
                                    doctorId: string;
                                    date: string;
                                };
                            };
                            output: {
                                success: true;
                                message: string;
                                data: {
                                    id: string;
                                    date: string;
                                    patient: {
                                        id: string;
                                        fullName: string | null;
                                        email: string | null;
                                        dob: string | null;
                                        gender: "female" | "male" | "other" | null;
                                    };
                                    queueNo: number | null;
                                    bookingStatus: "cancelled" | "confirmed" | "provisional";
                                    visitStatus: "complete" | "missed" | "ongoing";
                                    sharedCode: string | null;
                                    paymentId: string | null;
                                }[] | null | undefined;
                                error: null;
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
                bookings: {
                    patients: {
                        ":bookingId": {
                            status: import("hono/client").ClientRequest<{
                                $put: {
                                    input: {
                                        json: {
                                            visitStatus: "complete" | "missed" | "ongoing";
                                        };
                                    } & {
                                        param: {
                                            bookingId: string;
                                        };
                                    };
                                    output: {
                                        success: false;
                                        message: string;
                                        data: null;
                                        error: null;
                                    };
                                    outputFormat: "json";
                                    status: 401;
                                } | {
                                    input: {
                                        json: {
                                            visitStatus: "complete" | "missed" | "ongoing";
                                        };
                                    } & {
                                        param: {
                                            bookingId: string;
                                        };
                                    };
                                    output: {
                                        success: false;
                                        message: string;
                                        data: null;
                                        error: null;
                                    };
                                    outputFormat: "json";
                                    status: 500;
                                } | {
                                    input: {
                                        json: {
                                            visitStatus: "complete" | "missed" | "ongoing";
                                        };
                                    } & {
                                        param: {
                                            bookingId: string;
                                        };
                                    };
                                    output: {
                                        success: true;
                                        message: string;
                                        data: {
                                            id: string;
                                            scheduleDaysId: string;
                                            patientId: string;
                                            date: string;
                                            queueNo: number | null;
                                            sharedCode: string | null;
                                            bookingStatus: "cancelled" | "confirmed" | "provisional";
                                            visitStatus: "complete" | "missed" | "ongoing";
                                            paymentId: string | null;
                                            createdAt: string;
                                        } | null | undefined;
                                        error: null;
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
} & {
    api: {
        v1: {
            hp: {
                bookings: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                doctors: {
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
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                profile: import("hono/client").ClientRequest<{
                    $get: {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {};
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {};
                        output: {
                            success: true;
                            message: string;
                            data: {
                                hp: {
                                    id: string;
                                    name: string;
                                    email: string;
                                    contactNumber: string | null;
                                    location: string | null;
                                    pin: string | null;
                                    state: string | null;
                                    city: string | null;
                                    houseNumber: string | null;
                                    roadName: string | null;
                                    landmark: string | null;
                                    profileImage: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                };
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                    $put: {
                        input: {
                            json: {
                                name?: string | undefined;
                                contactNumber?: string | undefined;
                                location?: string | undefined;
                                pin?: string | undefined;
                                state?: string | undefined;
                                city?: string | undefined;
                                houseNumber?: string | undefined;
                                roadName?: string | undefined;
                                landmark?: string | undefined;
                                profileImage?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 400;
                    } | {
                        input: {
                            json: {
                                name?: string | undefined;
                                contactNumber?: string | undefined;
                                location?: string | undefined;
                                pin?: string | undefined;
                                state?: string | undefined;
                                city?: string | undefined;
                                houseNumber?: string | undefined;
                                roadName?: string | undefined;
                                landmark?: string | undefined;
                                profileImage?: string | undefined;
                            };
                        };
                        output: {
                            success: false;
                            message: string;
                            data: null;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 401;
                    } | {
                        input: {
                            json: {
                                name?: string | undefined;
                                contactNumber?: string | undefined;
                                location?: string | undefined;
                                pin?: string | undefined;
                                state?: string | undefined;
                                city?: string | undefined;
                                houseNumber?: string | undefined;
                                roadName?: string | undefined;
                                landmark?: string | undefined;
                                profileImage?: string | undefined;
                            };
                        };
                        output: {
                            success: true;
                            message: string;
                            data: {
                                hp: {
                                    id: string;
                                    name: string;
                                    email: string;
                                    contactNumber: string | null;
                                    location: string | null;
                                    pin: string | null;
                                    state: string | null;
                                    city: string | null;
                                    houseNumber: string | null;
                                    roadName: string | null;
                                    landmark: string | null;
                                    profileImage: string | null;
                                    createdAt: string;
                                    verified: boolean | null;
                                };
                            } | undefined;
                            error: null;
                        };
                        outputFormat: "json";
                        status: 200;
                    };
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            hp: {
                profile: {
                    "*": import("hono/client").ClientRequest<{}>;
                };
            };
        };
    };
};
export default hcWithType;
