import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

@NgModule({
    declarations: [AppComponent],
    imports: [MaterialModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
