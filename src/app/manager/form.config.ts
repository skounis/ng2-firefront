import { Validators } from '@angular/forms';

export const itemsFormConfig = () => ({
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
				label: 'News',
				description: 'News posted for this Business',
				parentCollection: 'businesses',
				collection: 'news',
				summaryField: 'title'
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
				title: 'Extra options'
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
				labelProp: 'name',
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
			className: 'row',
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
				buttonLabel: 'Upload',
				description: 'Recommended: 600 px wide x 600 px high'
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
		}
	]
});
