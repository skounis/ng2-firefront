import { Validators } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';


export interface TabType {
	label: string;
	fields: FormlyFieldConfig[];
}

export const itemsFormConfig = () => ({
	activityfeed: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			key: 'body',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Body',
				description: 'Please enter at least 150 characters',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			key: 'date',
			type: 'date-time-picker',
			templateOptions: {
				label: 'Date',
				showTime: false
			}
		},
		{
			type: 'text',
			key: 'posted_by',
			templateOptions: {
				label: 'Author'
			}
		}
	],
	businesses: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Business title',
				description: 'Provide the official name of the corporation.',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'reference',
			templateOptions: {
				// label: 'News',
				panelLabel: 'News',
				description: 'News posted for this Business',
				parentCollection: 'businesses',
				collection: 'news',
				summaryField: 'title'
			}
		}
	],
	chatrooms: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'icon',
			templateOptions: {
				label: 'Icon',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		}
	],
	products: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Product title',
				description: 'Provide the official product title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'price',
			templateOptions: {
				label: 'Price',
				type: 'number'
			}
		},
		{
			type: 'numeric-input',
			key: 'priceMasked',
			templateOptions: {
				label: 'Price (int)',
				mask: {
					allowDecimal: false
				}
			}
		},
		{
			type: 'numeric-input',
			key: 'priceMaskedDecimal',
			templateOptions: {
				label: 'Price (decimal)',
				mask: {
					allowDecimal: true,
					decimalLimit: 2
				}
			}
		},
		{
			type: 'repeater',
			wrappers: ['panel'],
			key: 'extraOptions',
			templateOptions: {
				title: 'Extra options',
				expandable: true
			},
			fieldArray: {
				className: 'row',
				fieldGroup: [
					{
						className: 'col-12',
						type: 'input',
						key: 'name',
						templateOptions: {
							label: 'Name'
						}
					},
					{
						className: 'col-12',
						type: 'numeric-input',
						key: 'value',
						templateOptions: {
							label: 'Price',
							description: 'Please enter the price. Decimals are allowed.',
							mask: {
								allowDecimal: true,
								decimalLimit: 2
							}
						}
					},
					{
						className: 'col-12',
						type: 'check',
						key: 'selected',
						defaultValue: false,
						templateOptions: {
							label: 'This option is pre-selected'
						}
					},
					{
						className: 'col-12',
						key: 'deliveryDate',
						type: 'date-time-picker',
						templateOptions: {
							label: 'Delivery date',
							showTime: true
						}
					}
				]
			}
		},
		{
			type: 'open-hours',
			key: 'openhours',
			templateOptions: {
				label: 'Open hours'
			}
		},
		{
			type: 'file-upload',
			key: 'banners',
			templateOptions: {
				label: 'Banner',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload'
			}
		},
		{
			type: 'file-upload',
			key: 'pictures',
			templateOptions: {
				label: 'Product pictures',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload',
				maxFiles: 3

			}
		},
		{
			type: 'multi-select',
			key: 'color',
			templateOptions: {
				multiple: true,
				label: 'Color',
				labelProp: 'title',
				valueProp: '$key',
				collection: 'colors'
			}
		},
		{
			key: 'mapdata',
			fieldGroup: [
				{
					type: 'coords',
					key: 'annotation',
					templateOptions: {
						label: 'Coordinates',
						longitude: 34.4,
						latitude: 35.455,
						maxRecords: 5
					}
				}
			]
		},
		{
			type: 'multi-select',
			key: 'size',
			templateOptions: {
				multiple: false,
				label: 'Size',
				labelProp: 'title',
				valueProp: '$key',
				collection: 'sizes'
			}
		},
		{
			key: 'description',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Description',
				description: 'Please enter at least 150 characters'
			}
		}
	],
	catalogitems: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'url',
			templateOptions: {
				label: 'Url',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			key: 'body',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Body'
			}
		},
		{
			type: 'file-upload',
			key: 'thumb',
			templateOptions: {
				label: 'Thumb',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload',
				description: 'Recommended: 300 px wide x 300 px high'
			}
		},
		{
			type: 'file-upload',
			key: 'pictures',
			templateOptions: {
				label: 'Pictures',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload',
				description: 'Recommended: 300 px wide x 300 px high'
			}
		},
		{
			type: 'input',
			key: 'pdf',
			templateOptions: {
				label: 'PDF'
			}
		}
	],
	menuitems: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				description: 'Provide the official product title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			key: 'body',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Description'
			}
		},
		{
			type: 'input',
			key: 'category',
			templateOptions: {
				label: 'Category',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			className: 'col-12',
			type: 'check',
			key: 'isFeatured',
			defaultValue: false,
			templateOptions: {
				label: 'Featured'
			}
		},
		{
			type: 'file-upload',
			key: 'pictures',
			templateOptions: {
				label: 'Avatar',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload'
			}
		},
		{
			type: 'file-upload',
			key: 'thumb',
			templateOptions: {
				label: 'Thumb',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload'
			}
		},
		{
			type: 'repeater',
			wrappers: ['panel'],
			key: 'price',
			templateOptions: {
				title: 'Price',
				expandable: true
			},
			fieldArray: {
				className: 'row',
				fieldGroup: [
					{
						className: 'col-12',
						type: 'input',
						key: 'currency',
						templateOptions: {
							label: 'Currency'
						}
					},
					{
						className: 'col-12',
						type: 'input',
						key: 'name',
						templateOptions: {
							label: 'Name'
						}
					},
					{
						className: 'col-12',
						type: 'numeric-input',
						key: 'value',
						templateOptions: {
							label: 'Price',
							description: 'Please enter the price. Decimals are allowed.',
							mask: {
								allowDecimal: true,
								decimalLimit: 2
							}
						}
					}
				]
			}
		},
		{
			type: 'repeater',
			wrappers: ['panel'],
			key: 'standardOptions',
			templateOptions: {
				title: 'Standard options',
				expandable: true
			},
			fieldArray: {
				className: 'row',
				fieldGroup: [
					{
						className: 'col-12',
						type: 'input',
						key: 'name',
						templateOptions: {
							label: 'Name'
						}
					},
					{
						className: 'col-12',
						type: 'check',
						key: 'selected',
						defaultValue: false,
						templateOptions: {
							label: 'This option is pre-selected'
						}
					}
				]
			}
		},
	],
	news: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				description: 'Provide the official product title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			key: 'description',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Description',
				description: 'Please enter the article body'
			}
		},
		{
			key: 'adate',
			type: 'date-time-picker',
			templateOptions: {
				label: 'Another date',
				showTime: true
			}
		},
		{
			wrappers: ['panel'],
			// className: 'row',
			key: 'postDate',
			templateOptions: {
				title: 'Post date'
			},
			fieldGroup: [
				{
					className: 'full-width',
					type: 'date-picker',
					key: 'date'
				},
				{
					type: 'time-picker',
					key: 'time'
				}
			]
		},
		{
			type: 'file-upload',
			key: 'thumb',
			templateOptions: {
				label: 'Thumb',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload',
				description: 'Recommended: 300 px wide x 300 px high'
			}
		},
		{
			type: 'file-upload',
			key: 'image',
			templateOptions: {
				label: 'Image',
				storage: 'S3',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload',
				description: 'Recommended: 600 px wide x 600 px high'
			}
		}
	],
	photogalleries: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			key: 'body',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Body',
				description: 'Please enter at least 150 characters',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'file-upload',
			key: 'picture',
			templateOptions: {
				label: 'Avatar',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload'
			}
		}
	],
	properties: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				description: 'Provide the official product title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'category',
			templateOptions: {
				label: 'Category',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'code',
			templateOptions: {
				label: 'Code',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'buildIn',
			templateOptions: {
				label: 'BuildIn:',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			key: 'description',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Description',
				description: 'Please enter at least 150 characters',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'numeric-input',
			key: 'surface',
			templateOptions: {
				label: 'Surface',
				required: true,
				mask: {
					allowDecimal: false
				}
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'address',
			templateOptions: {
				label: 'Address',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'intention',
			templateOptions: {
				label: 'Intention',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'file-upload',
			key: 'pictures',
			templateOptions: {
				label: 'Avatar',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload'
			}
		},
		{
			type: 'file-upload',
			key: 'thumb',
			templateOptions: {
				label: 'Thumb',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload',
				description: 'Recommended: 300 px wide x 300 px high'
			}
		},
		{
			key: 'mapdata',
			fieldGroup: [
				{
					type: 'coords',
					key: 'annotation',
					templateOptions: {
						label: 'Coordinates'
					}
				}
			]
		},
		{
			className: 'col-12',
			type: 'numeric-input',
			key: 'price',
			templateOptions: {
				label: 'Price',
				description: 'Please enter the price. Decimals are allowed.',
				mask: {
					allowDecimal: true,
					decimalLimit: 2
				}
			}
		},
		{
			wrappers: ['panel'],
			// className: 'row',
			key: 'contact',
			templateOptions: {
				title: 'Contact'
			},
			fieldGroup: [
				{
					type: 'input',
					key: 'email'
				},
				{
					type: 'input',
					key: 'phoneNumber'
				},
				{
					type: 'input',
					key: 'web'
				},
			]
		}
	],
	userprofiles: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'file-upload',
			key: 'avatar',
			templateOptions: {
				label: 'Avatar',
				storage: 'FIRE',
				disabled: true,
				filetype: 'image/*',
				buttonLabel: 'Upload'
			}
		},
		{
			type: 'input',
			key: 'firstName',
			templateOptions: {
				label: 'First name',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'lastName',
			templateOptions: {
				label: 'Last name',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'email',
			templateOptions: {
				label: 'Email',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'phoneNumber',
			templateOptions: {
				label: 'Phone'
			}
		},
		{
			type: 'input',
			key: 'linkedIn',
			templateOptions: {
				label: 'LinkedIn'
			}
		},
		{
			type: 'input',
			key: 'webpage',
			templateOptions: {
				label: 'Web page'
			}
		},
		{
			type: 'input',
			key: 'address',
			templateOptions: {
				label: 'Address'
			}
		},
		{
			key: 'bio',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Bio'
			}
		}
	],
	colors: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Color',
				description: 'Enter the color name.',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'text',
			key: 'justText',
			templateOptions: {
				label: 'Read only next',
				description: 'This is just a read only text'
			}
		},

		{
			key: 'hue',
			templateOptions: {
				label: 'Hue',
				titleColumnValueSetter: (item, index: number) => {
					item.title = `Hue #${index}`;
				}
			},
			type: 'master-details',
			// wrappers: ['panel'],
			fieldArray: {
				fieldGroup: [
					{
						key: 'title',
						templateOptions: {
							label: 'Title',
							showInGrid: true
						},
						type: 'input'
					},
					{
						key: 'description',
						templateOptions: {
							label: 'Description'
						},
						type: 'input'
					}
				]
			}
		}
	],
	events: {
		tabs: [
			{
				type: 'tab',
				label: 'General',
				fields: [
					{
						template: `
							<h3>General information about your event</h3>
							<p class="mb-4">To get started with Captix<sup>®</sup>, please provide some basic information regarding your event.</p>
						`,
					},
					{
						type: 'input',
						key: 'title',
						templateOptions: {
							label: 'Event name',
							description: 'Enter the full name of the event.',
							required: true
						},
						validators: {
							validation: Validators.compose([Validators.required])
						}
					}, // Name
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-6',
								type: 'select',
								key: 'region',
								templateOptions: {
									label: 'Region',
									placeholder: 'Select a region',
									description: 'Where is your event?',
									required: true,
									options: [
										{ value: 1, label: 'North America'  },
										{ value: 2, label: 'EMEA'  },
										{ value: 3, label: 'APJ'  },
										{ value: 4, label: 'LATAM'  },
									],
								},
							}, // Region
							{
								className: 'col-6',
								type: 'select',
								key: 'eventType',
								templateOptions: {
									label: 'Type',
									placeholder: 'Select a tpe',
									description: 'Where is your event type?',
									required: true,
									options: [
										{ value: 1, label: 'Customer Briefing'  },
										{ value: 2, label: 'Executive Events'  },
										{ value: 3, label: 'Virtual Events'  },
										{ value: 4, label: 'Sales Led Events'  },
										{ value: 5, label: 'Technical Workshop'  },
										{ value: 6, label: 'Business Workshop'  },
										{ value: 7, label: 'Seminar Series'  },
										{ value: 8, label: 'Partner-Facing Event'  },
									],
								},
							}, // Event type
						],
					}, // Region and Event Type

					{
						type: 'textarea',
						key: 'description',
						templateOptions: {
							label: 'Description',
							description: 'Enter a short description of the event.',
							rows: 5
						}
					}, // Name
				]
			}, // Tab General
			{
				type: 'tab',
				label: 'Dates and Location',
				fields: [
					{
						template: `
							<h3>Dates and Location</h3>
							<p class="mb-4">Where and when the event takes place</p>
						`,
					},
					{
						template: '<div><h4 class="mt-3">Important dates</h4></div>',
					},
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-4',
								key: 'startdate',
								type: 'date-time-picker',
								templateOptions: {
									label: 'Start',
									showTime: true
								}
							}, // Start date
							{
								className: 'col-4',
								key: 'enddate',
								type: 'date-time-picker',
								templateOptions: {
									label: 'End',
									showTime: true
								}
							}, // End date
							{
								className: 'col-4',
								type: 'select',
								key: 'timezone',
								templateOptions: {
									label: 'Timezone',
									placeholder: 'Select timezone',
									required: true,
									options: [
										{ value: 1, label: 'America/Chicago (Central)'  },
										{ value: 2, label: 'America/New_York (Eastern)'  },
										{ value: 3, label: 'America/Denver (Mountain)'  },
										{ value: 4, label: 'America/Los_Angeles (Pacific)'  },
										{ value: 5, label: 'Africa/Abidjan'  },
										{ value: 6, label: 'Africa/Accra'  },
										{ value: 7, label: 'Africa/Algiers'  },
										{ value: 8, label: 'Africa/Asmara'  },
									],
								}, // Timezone
							}, // Event type
						]
					}, // Start / End dates
					{
						template: '<div><h4 class="mt-3">Location</h4></div>',
					},
					{
						type: 'input',
						key: 'venue',
						templateOptions: {
							label: 'Venue',
							description: 'Enter the full name of the venue.',
							required: true
						},
						validators: {
							validation: Validators.compose([Validators.required])
						}
					}, // Venue
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-12',
								key: 'address',
								type: 'input',
								templateOptions: {
									label: 'Address',
									placeholder: 'Street address'
								}
							}, // Address
							{
								className: 'col-8',
								key: 'addressAux',
								type: 'input',
								templateOptions: {
									placeholder: 'Suite Number, Apt, etc',

								}
							}, // Address Aux
							{
								className: 'col-4',
								type: 'select',
								key: 'country',
								templateOptions: {
									placeholder: 'Select country',
									required: true,
									options: [
										{ value: 1, label: 'United States'  },
										{ value: 2, label: 'Afghanistan'  },
										{ value: 3, label: 'Albania'  },
										{ value: 4, label: 'Algeria'  },
										{ value: 5, label: 'American Samoa'  },
										{ value: 6, label: 'Andorra'  },
										{ value: 7, label: 'Angola'  },
										{ value: 8, label: 'Anguilla'  },
									],
								},
							}, // Country
							{
								className: 'col-4',
								key: 'city',
								type: 'input',
								templateOptions: {
									placeholder: 'City',

								}
							}, // City
							{
								className: 'col-4',
								key: 'state',
								type: 'input',
								templateOptions: {
									placeholder: 'State',

								}
							}, // State
							{
								className: 'col-4',
								key: 'zip',
								type: 'input',
								templateOptions: {
									placeholder: 'Zip / Postal Code',

								}
							}, // Zip
						]
					}, // Address
					{
						key: 'includeMap',
						type: 'check',
						templateOptions: {
							label: 'Include map on the registration page.',
						},
					},
				]
			}, // Tab Dates and Location
			{
				type: 'tab',
				label: 'People and Promotion',
				fields: [
					{
						template: `
							<h3>Management team and promotion options</h3>
							<p class="mb-3">Set the management and sales persons for this event and its promotion options.</p>
						`,
					},
					{
						type: 'select',
						key: 'branding',
						templateOptions: {
							label: 'Branding',
							placeholder: 'Branding',
							required: true,
							options: [
								{ value: 1, label: 'Dell'  },
								{ value: 2, label: 'Dell EMC'  },
								{ value: 3, label: 'Dell Technologies'  },
							],
							description: 'What branding do you want to use for this event.'
						},
					}, // Branding
					{
						type: 'select',
						key: 'eventManager',
						templateOptions: {
							label: 'Event Manager',
							placeholder: 'Select manager',
							required: true,
							options: [
								{ value: 1, label: 'Hari Seldon'  },
								{ value: 2, label: 'Dors Venabili'  },
								{ value: 3, label: 'Chetter Hummin'  },
								{ value: 4, label: 'Salvor Hardin'  },
								{ value: 5, label: 'Hober Mallow'  },
								{ value: 6, label: 'Bayta Darell'  },
								{ value: 7, label: 'Ebling Mis'  },
								{ value: 8, label: 'Golan Trevize'  },
								{ value: 9, label: 'Harla Branno'  },
							],
							description: 'Select the person that manages the event.'
						},
					}, // Branding
					{
						template: '<div><h4 class="mt-3">Campaign</h4></div>',
					},
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-4',
								type: 'input',
								key: 'campaignID',
								templateOptions: {
									label: 'ID',
									required: true
								},
								validators: {
									validation: Validators.compose([Validators.required])
								}
							},
							{
								className: 'col-8',
								type: 'input',
								key: 'campaignName',
								templateOptions: {
									label: 'Name',
									description: 'Enter the name of the campaign.',
									required: true
								},
								validators: {
									validation: Validators.compose([Validators.required])
								}
							},
							{
								className: 'col-12',
								key: 'routeEMC',
								type: 'check',
								templateOptions: {
									label: 'Route to EMC.',
								},
							},
							{
								className: 'col-6',
								type: 'select',
								key: 'eventAutomationPath',
								templateOptions: {
									label: 'Event Automation Path',
									placeholder: 'Select path',
									required: true,
									options: [
										{ value: 1, label: 'Send leads by automation'  },
										{ value: 2, label: 'Manual extract the leads, bypass automation'  },
									],
								},
							}, // Automation path
							{
								className: 'col-6',
								type: 'select',
								key: 'fundingSource',
								templateOptions: {
									label: 'Funding Source',
									placeholder: 'Select source',
									required: true,
									options: [
										{ value: 1, label: 'NA Field & Partner Marketing'  },
										{ value: 2, label: 'Other Marketing'  },
									],
								},
							}, // Funding Source
						]
					}, // Campaign
					{
						template: `
						<div>
							<h4 class="mt-3">Contacts</h4>
							<p>Add Sales team, Account Executives, Event Support staff, etc</p>
						</div>
						`
					},
					{
						type: 'repeater',
						wrappers: ['panel'],
						key: 'eventContacts',
						templateOptions: {
							title: 'Contacts',
							expandable: true
						},
						fieldArray: {
							className: 'row',
							fieldGroup: [
								{
									className: 'col-6',
									type: 'input',
									key: 'firstName',
									templateOptions: {
										label: 'First Name'
									}
								},
								{
									className: 'col-6',
									type: 'input',
									key: 'lastName',
									templateOptions: {
										label: 'Last Name'
									}
								},
								{
									className: 'col-6',
									type: 'input',
									key: 'email',
									templateOptions: {
										label: 'Email'
									}
								},
								{
									className: 'col-6',
									type: 'input',
									key: 'phoneNumber',
									templateOptions: {
										label: 'Phone Number'
									}
								},
								{
									className: 'col-12',
									type: 'check',
									key: 'primaryContact',
									defaultValue: false,
									templateOptions: {
										label: 'Set this as the primany contact.'
									}
								},
							]
						}
					}, // Contacts
					{
						template: `
						<div>
							<h4 class="mt-3">Pubishing</h4>
							<p>Set Event URL and publishing details.</p>
						</div>
						`
					},
					{
						type: 'input',
						key: 'url',
						templateOptions: {
							label: 'Event URL',
							description: 'The public web address of the event.',
							addonLeft: {
								text: 'qa.captix.com/',
							},
							placeholder: 'pL9XgA'
						},
						validators: {
							validation: Validators.compose([Validators.required])
						}
					}, // Event URL
					{
						type: 'input',
						key: 'pubfedValue',
						templateOptions: {
							label: 'PUB/FED Value',
							description: 'Enter the value for PUB/FED Customers.',
							addonLeft: {
								text: '$',
							},
							addonRight: {
								text: '.00',
							}
						}
					}, // PUB / FED
					{
						type: 'check',
						key: 'publishOnDELLCOM',
						defaultValue: true,
						templateOptions: {
							label: 'Publish on dell.com/events'
						}
					},
					{
						type: 'check',
						key: 'privateEvent',
						defaultValue: false,
						templateOptions: {
							label: 'Make this event private.'
						}
					},
				]
			},
			{
				type: 'tab',
				label: 'Targets and Sponsoring',
				fields: [
					{
						template: `
						<div>
							<h3>Targets and Sponsoring</h3>
							<p class="mb-3">Set Event targets and Sponsoring details.</p>
						</div>
						`
					},
					{
						type: 'select',
						key: 'eventCategory',
						templateOptions: {
							label: 'Event Category',
							placeholder: 'Select category',
							required: true,
							options: [
								{ value: 1, label: '3rd Party'  },
								{ value: 2, label: 'Dell Owned / Marketing Funded'  },
							],
							description: 'Select the category of the event.'
						},
					}, // Event Category
					{
						type: 'multi-select',
						key: 'targetSegment',
						templateOptions: {
							multiple: true,
							label: 'Target Segment',
							staticValues: [
								{
									label: 'Commercial',
									value: 'commercial'
								},
								{
									label: 'Enterprise',
									value: 'enterprise'
								},
								{
									label: 'Acquisition',
									value: 'acquisition'
								},
								{
									label: 'Federal',
									value: 'federal'
								},
								{
									label: 'Medium Business',
									value: 'mediumBusiness'
								},
								{
									label: 'Healthcare',
									value: 'healthcare'
								},
								{
									label: 'Education',
									value: 'education'
								},
								{
									label: 'Consumer',
									value: 'consumer'
								},
								{
									label: 'Channel',
									value: 'channel'
								}
							]
						}
					}, // Target Segment
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-4',
								type: 'input',
								key: 'totalRegistrants',
								templateOptions: {
									label: 'Target Registrants',
									type: 'number'
								}
							},
							{
								className: 'col-4',
								type: 'input',
								key: 'maximumRegistrants',
								templateOptions: {
									label: 'Maximum Registrants',
									type: 'number'
								}
							},
							{
								className: 'col-4',
								type: 'input',
								key: 'estimatedBudget',
								templateOptions: {
									label: 'Estimated Budget',
									description: 'Total estimated budget',
									type: 'number'
								}
							},
						]
					},
					{
						type: 'multi-select',
						key: 'sponsoringBU',
						templateOptions: {
							multiple: true,
							label: 'Sponsoring BU',
							staticValues: [
								{
									label: 'ISG',
									value: 'ISG'
								},
								{
									label: 'DSG',
									value: 'DSG'
								},
								{
									label: 'CSG',
									value: 'CSG'
								},
								{
									label: 'Services',
									value: 'Services'
								},
								{
									label: 'Channel',
									value: 'Channel'
								},
								{
									label: 'Consumer',
									value: 'Consumer'
								},
								{
									label: 'Corporate (including cross-BU events)',
									value: 'corporate'
								},
								{
									label: 'OEM',
									value: 'OEM'
								}
							]
						}
					}
				]
			}
		]
	},
	eventRequests: {
		tabs: [
			{
				type: 'tab',
				label: 'General',
				fields: [
					{
						template: `
							<h3>General information about your event</h3>
							<p class="mb-4">To get started with Captix<sup>®</sup>, please provide some basic information regarding your event.</p>
						`,
					},
					{
						type: 'input',
						key: 'title',
						templateOptions: {
							label: 'Event name',
							description: 'Enter the full name of the event.',
							required: true
						},
						validators: {
							validation: Validators.compose([Validators.required])
						}
					}, // Name
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-6',
								type: 'select',
								key: 'region',
								templateOptions: {
									label: 'Region',
									placeholder: 'Select a region',
									description: 'Where is your event?',
									required: true,
									options: [
										{ value: 1, label: 'North America'  },
										{ value: 2, label: 'EMEA'  },
										{ value: 3, label: 'APJ'  },
										{ value: 4, label: 'LATAM'  },
									],
								},
							}, // Region
							{
								className: 'col-6',
								type: 'select',
								key: 'eventType',
								templateOptions: {
									label: 'Type',
									placeholder: 'Select a tpe',
									description: 'Where is your event type?',
									required: true,
									options: [
										{ value: 1, label: 'Customer Briefing'  },
										{ value: 2, label: 'Executive Events'  },
										{ value: 3, label: 'Virtual Events'  },
										{ value: 4, label: 'Sales Led Events'  },
										{ value: 5, label: 'Technical Workshop'  },
										{ value: 6, label: 'Business Workshop'  },
										{ value: 7, label: 'Seminar Series'  },
										{ value: 8, label: 'Partner-Facing Event'  },
									],
								},
							}, // Event type
						],
					}, // Region and Event Type
					{
						type: 'select',
						key: 'topic',
						templateOptions: {
							label: 'Topic',
							placeholder: 'Select a region',
							description: 'Select the topic of the event?',
							required: true,
							options: [
								{ value: 1, label: 'CS: Workforce Transformation'  },
								{ value: 2, label: 'Woman in Technology'  },
								{ value: 3, label: 'Security'  },
								{ value: 4, label: 'Other'  },
							],
						},
					}, // Region
					{
						type: 'textarea',
						key: 'description',
						templateOptions: {
							label: 'Description',
							description: 'Enter a short description of the event.',
							rows: 5
						}
					}, // Name
				]
			}, // Tab General
			{
				type: 'tab',
				label: 'Dates and Location',
				fields: [
					{
						template: `
							<h3>Dates and Location</h3>
							<p class="mb-4">Where and when the event takes place</p>
						`,
					},
					{
						template: '<div><h4 class="mt-3">Important dates</h4></div>',
					},
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-4',
								key: 'startdate',
								type: 'date-time-picker',
								templateOptions: {
									label: 'Start',
									showTime: true
								}
							}, // Start date
							{
								className: 'col-4',
								key: 'enddate',
								type: 'date-time-picker',
								templateOptions: {
									label: 'End',
									showTime: true
								}
							}, // End date
							{
								className: 'col-4',
								type: 'select',
								key: 'timezone',
								templateOptions: {
									label: 'Timezone',
									placeholder: 'Select timezone',
									required: true,
									options: [
										{ value: 1, label: 'America/Chicago (Central)'  },
										{ value: 2, label: 'America/New_York (Eastern)'  },
										{ value: 3, label: 'America/Denver (Mountain)'  },
										{ value: 4, label: 'America/Los_Angeles (Pacific)'  },
										{ value: 5, label: 'Africa/Abidjan'  },
										{ value: 6, label: 'Africa/Accra'  },
										{ value: 7, label: 'Africa/Algiers'  },
										{ value: 8, label: 'Africa/Asmara'  },
									],
								}, // Timezone
							}, // Event type
						]
					}, // Start / End dates
					{
						template: '<div><h4 class="mt-3">Location</h4></div>',
					},
					{
						type: 'input',
						key: 'venue',
						templateOptions: {
							label: 'Venue',
							description: 'Enter the full name of the venue.',
							required: true
						},
						validators: {
							validation: Validators.compose([Validators.required])
						}
					}, // Venue
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-12',
								key: 'address',
								type: 'input',
								templateOptions: {
									label: 'Address',
									placeholder: 'Street address'
								}
							}, // Address
							{
								className: 'col-8',
								key: 'addressAux',
								type: 'input',
								templateOptions: {
									placeholder: 'Suite Number, Apt, etc',

								}
							}, // Address Aux
							{
								className: 'col-4',
								type: 'select',
								key: 'country',
								templateOptions: {
									placeholder: 'Select country',
									required: true,
									options: [
										{ value: 1, label: 'United States'  },
										{ value: 2, label: 'Afghanistan'  },
										{ value: 3, label: 'Albania'  },
										{ value: 4, label: 'Algeria'  },
										{ value: 5, label: 'American Samoa'  },
										{ value: 6, label: 'Andorra'  },
										{ value: 7, label: 'Angola'  },
										{ value: 8, label: 'Anguilla'  },
									],
								},
							}, // Country
							{
								className: 'col-4',
								key: 'city',
								type: 'input',
								templateOptions: {
									placeholder: 'City',

								}
							}, // City
							{
								className: 'col-4',
								key: 'state',
								type: 'input',
								templateOptions: {
									placeholder: 'State',

								}
							}, // State
							{
								className: 'col-4',
								key: 'zip',
								type: 'input',
								templateOptions: {
									placeholder: 'Zip / Postal Code',

								}
							}, // Zip
						]
					}, // Address
				]
			}, // Tab Dates and Location
			{
				type: 'tab',
				label: 'Management',
				fields: [
					{
						template: `
							<h3>Management team and Account Executive</h3>
							<p class="mb-3">Set the Manager and Account Executive for this event and its promotion options.</p>
						`,
					},
					{
						type: 'select',
						key: 'eventManager',
						templateOptions: {
							label: 'Event Manager',
							placeholder: 'Select manager',
							required: true,
							options: [
								{ value: 1, label: 'Hari Seldon'  },
								{ value: 2, label: 'Dors Venabili'  },
								{ value: 3, label: 'Chetter Hummin'  },
								{ value: 4, label: 'Salvor Hardin'  },
								{ value: 5, label: 'Hober Mallow'  },
								{ value: 6, label: 'Bayta Darell'  },
								{ value: 7, label: 'Ebling Mis'  },
								{ value: 8, label: 'Golan Trevize'  },
								{ value: 9, label: 'Harla Branno'  },
							],
							description: 'Select the person that manages the event.'
						},
					}, // Event manager
					{
						key: 'notesForEventManager',
						type: 'textarea',
						templateOptions: {
							rows: 5,
							label: 'Notes for Event Manager',
							description: 'These notes will be sent to the Event Manager via Email',
							required: true
						}
					},
					{
						template: `
						<div>
							<h4 class="mt-3">Account Executive</h4>
						</div>
						`
					},
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-6',
								type: 'input',
								key: 'firstName',
								templateOptions: {
									label: 'First Name'
								}
							},
							{
								className: 'col-6',
								type: 'input',
								key: 'lastName',
								templateOptions: {
									label: 'Last Name'
								}
							},
							{
								className: 'col-6',
								type: 'input',
								key: 'email',
								templateOptions: {
									label: 'Email'
								}
							},
							{
								className: 'col-6',
								type: 'input',
								key: 'phoneNumber',
								templateOptions: {
									label: 'Phone Number'
								}
							},
						]
					},
				]
			},
			{
				type: 'tab',
				label: 'Estimation',
				fields: [
					{
						template: `
						<div>
							<h3>Estimation</h3>
							<p class="mb-3">Estimate the attendance and the cost of the event.</p>
						</div>
						`
					},
					{
						fieldGroupClassName: 'row',
						fieldGroup: [
							{
								className: 'col-6',
								type: 'input',
								key: 'estAttendees',
								templateOptions: {
									label: 'Attendees',
									type: 'number',
									description: 'Estimated number of attendees.'
								}
							},
							{
								className: 'col-6',
								type: 'input',
								key: 'costPerAttendee',
								templateOptions: {
									label: 'Cost per Attendee',
									type: 'number',
									description: 'Estimated cost per attendee.'
								}
							},
						]
					},
					{
						type: 'check',
						key: 'isFunded',
						defaultValue: false,
						templateOptions: {
							label: 'The event is funded'
						}
					},
				]
			}
		]
	},
	eventKits: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
	],
	'system-menus': [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'icon',
			templateOptions: {
				label: 'Icon',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'itemsType',
			templateOptions: {
				label: 'ItemsType',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'numeric-input',
			key: 'order',
			templateOptions: {
				label: 'Order',
				required: true,
				mask: {
					allowDecimal: false
				}
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		}
	]
});
