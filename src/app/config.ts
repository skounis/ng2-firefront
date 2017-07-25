import { AuthMethods, AuthProviders } from 'angularfire2';

export const config = {
	app: {
		name: 'ePostersLive',
		subtitle: 'Manager Portal',
		slogan: 'Your one-stop-shop for managing your electronic Poster Program'
	},
	fire: {
		auth: {
			apiKey: 'AIzaSyB3c6WmfOf9_Dd_Sh1gC2n7MjyGrUYPiSw',
			authDomain: 'scigen-portal.firebaseapp.com',
			databaseURL: 'https://scigen-portal.firebaseio.com',
			storageBucket: 'scigen-portal.appspot.com',
			messagingSenderId: '318307380325'
		},
		authConfig: {
			provider: AuthProviders.Google,
			method: AuthMethods.Redirect
		}
	},
	s3: {
		accessKeyId: 'AKIAJY6GD4REGAP7BPHQ',
		secretAccessKey: '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',
		bucket: 'dev.appseed.io/mobile-apps/businessdirectory-frb-admin'
	}
};
