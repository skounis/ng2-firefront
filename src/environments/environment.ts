// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	app: {
		name: 'Firefront',
		subtitle: 'Firebase Admin',
		slogan: 'Your Firebase Admin Panel'
	},
	fire: {
		auth: {
			apiKey: 'AIzaSyB3c6WmfOf9_Dd_Sh1gC2n7MjyGrUYPiSw',
			authDomain: 'scigen-portal.firebaseapp.com',
			databaseURL: 'https://scigen-portal.firebaseio.com',
			storageBucket: 'scigen-portal.appspot.com',
			messagingSenderId: '318307380325'
		}
	},
	s3: {
		accessKeyId: 'AKIAJY6GD4REGAP7BPHQ',
		secretAccessKey: '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',
		bucket: 'dev.appseed.io/mobile-apps/businessdirectory-frb-admin'
	}
};
