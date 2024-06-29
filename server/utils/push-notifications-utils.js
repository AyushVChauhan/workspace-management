async function sendPushNotification(notificationOptions) {
	const options = {
		message: {
			token: notificationOptions.token,
			notification: {
				body: notificationOptions.body,
				title: notificationOptions.title,
			},
		},
	};
	const res = await fetch('https://fcm.googleapis.com/v1/projects/tryfcm-90140/messages:send', {
		body: JSON.stringify(options),
		headers: {
			'Authorization':
				'Bearer ' +
				'AAAAluTMuOw:APA91bG-tWeAerRV9TViKoBTRMph08eb1CozkbTRD0wUi4HGPXAq8CFa9x0QaTRiosf_p-pqltCXlOZPcn1SyTgMWVZImiWHTQedrsUwnSM5GSFh33lYBqdvvVUjXszGjxOYkI-K5PnL',
		},
	});
	console.log(res);
}
