export class Options {
	projectId: number;
	templateId: number;
	tools: Object;
	designTags: Object;
}

export class DesignData {
	id?: string;
	name?: string;
	$key?: string;
	design: any;
}

export const TEMPLATE_TYPE_SYSTEM = 'TEMPLATE_TYPE_SYSTEM';
export const TEMPLATE_TYPE_USER = 'TEMPLATE_TYPE_USER'

export class TemplateWithType {
	type: string;
	template: DesignData;
}
