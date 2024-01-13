import { ClientController } from "../controller/client.controller.js";

export const createClientRoutes = () => {
    const clientController = new ClientController();

    const clientRoutes = [
        {
            method: 'POST',
            path: '/reg-client',
            handler: clientController.registerClient
        }
    ]

    return clientRoutes
}
