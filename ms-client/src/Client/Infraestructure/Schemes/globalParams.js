import z from 'zod'

const globalParamsScheme = z.object({

    key: z.string({
        invalid_type_error: "Key must be a string",
        required_error: "Key is required",
    }),
    value: z.string({
        invalid_type_error: "Value must be a string",
        required_error: "Value is required",
    })

})

export function validateGlobalParams(input) {
    return globalParamsScheme.safeParse(input)
}