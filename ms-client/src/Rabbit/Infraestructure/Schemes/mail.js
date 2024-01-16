import z from 'zod'

const mailScheme = z.object({
    recipient: z.string({
        invalid_type_error: "The email recipient must be a string",
        required_error: "The email recipient is required",
    }),
    subject: z.string({
        invalid_type_error: "The email subject must be a string",
        required_error: "The email subject is required",
    }),
    message: z.string({
        invalid_type_error: "The email message must be a string",
        required_error: "The email message is required",
    }),
})


export function validateMail(input) {
    return mailScheme.safeParse(input);
}

export function validatePartialEmail(input) {
    return mailScheme.partial().safeParse(input);
}