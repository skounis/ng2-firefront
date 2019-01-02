import { Validators } from '@angular/forms';

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
			type: 'datepicker',
			templateOptions: {
				label: 'Date',
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
	sizes: [
		{
			wrappers: ['ha-fieldset'],
			fieldGroup:[
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
					key: 'abbreviation',
					templateOptions: {
						label: 'Abbreviation',
					},
					validators: {
						validation: Validators.compose([Validators.required])
					}
				}
			]
		},
		{
			wrappers: ['ha-fieldset'],
			templateOptions: { label: 'International' },
			fieldGroup:[
				{
					type: 'input',
					key: 'sizeUS',
					templateOptions: {
						label: 'US Size'
					}
				},
				{
					type: 'input',
					key: 'sizeEU',
					templateOptions: {
						label: 'EU size'
					}
				},
				{
					type: 'input',
					key: 'sizeUK',
					templateOptions: {
						label: 'UK Size'
					}
				}
			]
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
				maxFiles: 3,
				width: '250px',
				height: '250px'

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
				description: 'Recommended: 300 px wide x 300 px high',
				width: '300px',
				height: '300px'
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
				description: 'Recommended: 300 px wide x 300 px high',
				width: '300px',
				height: '300px'
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
				buttonLabel: 'Upload',
				width: '150px',
				height: '150px'
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
				width: '150px',
				height: '150px'
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
					type: 'as-datepicker',
					key: 'date'
				},
				{
					type: 'as-timepicker',
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
				description: 'Recommended: 300 px wide x 300 px high',
				width: '300px',
				height: '300px'
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
				description: 'Recommended: 600 px wide x 600 px high',
				width: '600px',
				height: '600px'
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
				buttonLabel: 'Upload',
				width: '600px',
				height: '600px'
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
				buttonLabel: 'Upload',
				width: '150px',
				height: '150px'
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
				description: 'Recommended: 300 px wide x 300 px high',
				width: '300px',
				height: '300px'
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
				buttonLabel: 'Upload',
				width: '150px',
				height: '150px'
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
