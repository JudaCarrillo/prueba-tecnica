import * as dotenv from 'dotenv'

dotenv.config()

export const endPoints = {
    API_GENERATE: process.env.API_GENERATE || 'http://localhost:3000/generate',
    API_VALIDATE: process.env.API_VALIDATE || 'http://localhost:3000/validate/',
}