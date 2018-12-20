import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { NgxUnlayerRestService } from './ngx-unlayer.service';

@Component({
  selector: 'ngx-unlayer-templates',
  templateUrl: './ngx-unlayer-templates.component.html',
  styleUrls: ['./ngx-unlayer-templates.component.scss']
})
export class NgxUnlayerTemplatesComponent implements OnInit, OnChanges {

	@Input() userDesigns = [];
	@Output() onTemplateSelected = new EventEmitter();

  constructor(public service: NgxUnlayerRestService) { }
  systemTemplates: [];

  ngOnInit() {
    console.log(this.userDesigns);
    this.service.getTemplates().subscribe((response: any) => {
      this.systemTemplates = response.data || [];
      console.log('Templates: ', response);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);

    const _userDesigns: SimpleChange = changes.userDesigns;
    console.log('prev value: ', _userDesigns.previousValue);
    console.log('got name: ', _userDesigns.currentValue);
    this.userDesigns = _userDesigns.currentValue;
	}
	
	selectTemplate(type: string, template: any) {
		let templateWithType = {
			type: type,
			template: template
		}
		this.onTemplateSelected.emit(templateWithType);
	}
}
