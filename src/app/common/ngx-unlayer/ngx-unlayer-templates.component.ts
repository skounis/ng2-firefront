import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Template, TEMPLATE_TYPE_SYSTEM, TEMPLATE_TYPE_USER } from './ngx-unlayer.model';
import { NgxUnlayerRestService } from './ngx-unlayer.service';

@Component({
  selector: 'ngx-unlayer-templates',
  templateUrl: './ngx-unlayer-templates.component.html',
  styleUrls: ['./ngx-unlayer-templates.component.scss']
})

export class NgxUnlayerTemplatesComponent implements OnInit, OnChanges {

  TEMPLATE_TYPE_SYSTEM = TEMPLATE_TYPE_SYSTEM;
  TEMPLATE_TYPE_USER = TEMPLATE_TYPE_USER;

  @Input() selectedTemplate;
  @Input() userTemplates = [];
  @Output() onTemplateSelected = new EventEmitter<Template>();

  constructor(public service: NgxUnlayerRestService) { }
  systemTemplates: [];

  ngOnInit() {
    console.log(this.userTemplates);
    this.service.getTemplates().subscribe((response: any) => {
      this.systemTemplates = response.data || [];
      console.log('Templates: ', response);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);

    const _userTemplates: SimpleChange = changes.userTemplates;
    console.log('prev value: ', _userTemplates.previousValue);
    console.log('got name: ', _userTemplates.currentValue);
    this.userTemplates = _userTemplates.currentValue;
  }

  selectTemplate(type: string, template: Template) {
    template.type = type;
    this.selectedTemplate = template;
    this.onTemplateSelected.emit(template);
  }
}
