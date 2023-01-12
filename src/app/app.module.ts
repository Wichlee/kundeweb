import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [AppComponent],
    imports: [FooterComponent, HeaderComponent, MainComponent, MaterialModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
