import { NgModule } from '@angular/core';
import { AppModule } from '../infrastructure/app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './component/app/app.component';
import { AuthGuard } from './guard/auth.guard';
import { ComponentModule } from './component/component.module';
import { PageModule } from './pages/page.module';

@NgModule({
  imports: [
    AppModule,
    ComponentModule,
    PageModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class UiModule { }
