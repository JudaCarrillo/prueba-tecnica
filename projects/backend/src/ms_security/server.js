import Hapi from '@hapi/hapi';
import { createTokenRoutes } from './routes/token.route.js';

const init = async () => {
	const hapi = Hapi;
	const server = hapi.Server({
		port: process.env.PORT ?? 3000,
		host: 'localhost',
		"routes": {
			"cors": {
				"origin": ["http://localhost:4200"],
				"headers": ["Accept", "Content-Type"],
				"additionalHeaders": ['X-Requested-With']
			},
		}
	});

	server.route(createTokenRoutes())

	await server.start();
	console.log('Server running on:  %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
