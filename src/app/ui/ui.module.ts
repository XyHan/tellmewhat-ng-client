import { NgModule } from '@angular/core';
import { AppModule } from '../infrastructure/app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './component/app/app.component';
import { AuthGuard } from './guard/auth.guard';
import { PageModule } from './pages/page.module';

@NgModule({
  imports: [
    AppModule,
    PageModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class UiModule { }
