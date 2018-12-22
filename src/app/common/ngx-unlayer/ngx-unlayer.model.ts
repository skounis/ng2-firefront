export class Options {
	projectId: number;
	templateId: number;
	tools: Object;
	designTags: Object;
}

export class Template {
	id?: string;
	name?: string;
	$key?: string;
	type: string; // TEMPLATE_TYPE_SYSTEM | TEMPLATE_TYPE_USER
	design: any;
}

export const TEMPLATE_TYPE_SYSTEM = 'TEMPLATE_TYPE_SYSTEM';
export const TEMPLATE_TYPE_USER = 'TEMPLATE_TYPE_USER'
