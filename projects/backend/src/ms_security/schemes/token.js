import z from "zod";

const tokenScheme = z.object({
    id: z.string().refine((value) => value.length === 36, {
        message: "It must be exactly 36 characters.",
    }),
    token: z.string().refine((value) => value.length === 8, {
        message: "It must be exactly 8 characters.",
    })
});

export function validatePartialToken(input) {
    return tokenScheme.partial().safeParse(input);
}
