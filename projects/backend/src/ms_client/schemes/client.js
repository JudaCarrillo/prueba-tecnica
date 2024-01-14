import z from 'zod';

const clientSchema = z.object({
    email: z.string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required",
    }),
    password: z.string({
        invalid_type_error: "Password must be a string",
        required_error: "Password is required",
    }),
    sendEmailValue: z.boolean(),
    idToken: z.string({
        invalid_type_error: "ID Token must be a string",
        required_error: "ID Token is required",
    })
})

export function validateRegClient(input) {
    return clientSchema.safeParse(input);
}