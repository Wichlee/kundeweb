import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [AppComponent],
    imports: [MaterialModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
