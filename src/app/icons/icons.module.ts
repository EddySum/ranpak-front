import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Edit2, Trash2, Plus, PlusCircle, Upload, Image, FilePlus, ArrowLeft } from 'angular-feather/icons';

const icons = {
  Edit2,
  Trash2,
  Plus,
  PlusCircle,
  Upload,
  Image,
  FilePlus,
  ArrowLeft
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }