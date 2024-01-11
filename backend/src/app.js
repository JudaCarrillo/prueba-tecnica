// 'use strict';
import Hapi from '@hapi/hapi';
import Crypto, { randomUUID } from 'crypto';

let tokens = [];

const init = async () => {
	const hapi = Hapi;
	const server = hapi.Server({
		port: 3000,
		host: 'localhost'
	});

	server.route({
		method: 'GET',
		path: '/generate',
		handler: (request, h) => {
			const token = Crypto.randomBytes(4).toString('hex');
			const uuid = randomUUID();
			const objToken = { 'id': uuid,'token': token};
			tokens.push(objToken);
			console.log(tokens);
			return token;
		}    
	});

	server.route({
		method: 'GET',
		path: '/validate/{token}',
		handler: (request, h) => {
			const tokenValidate = request.params.token;

			let label = 'Token inválido';
			tokens.forEach((token)=> {
				if (token.token === tokenValidate) {
					label = 'Token válido';
				}
			});

			return label;		
		}
	});

	server.route({
		method: 'PUT',
		path: '/edit/{token}',
		handler: (request, h) => {
			const editToken = request.params.token;
			const updatedToken = request.payload.token;

			const index = tokens.findIndex((token) => token.token === editToken);
			if (index === -1) return 'Token no encontrado';
			tokens[index].token = updatedToken;
 
			return {
				message: 'Token actualizado exitosamente',
				updatedToken: updatedToken
			};
		}
	});

	await server.start();
	console.log('Server running on:  %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
