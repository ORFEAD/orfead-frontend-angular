import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,Validators,FormControl,FormGroup,FormBuilder, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilePdf} from '@fortawesome/free-regular-svg-icons';
import { DynamicDialogModule, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardService } from './service/auth-guard-service.service';
import { AppVersionComponent } from './component/misc/app-version/app-version.component';
import { ErrorHandlerService } from './service/error-handler.service';
import { AuthenticationService } from './service/authentication.service';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { OtherTranslationsComponent } from './component/other-translations/other-translations.component';
import { AuthInterceptor} from './AuthInterceptor';
import { EscapeHtmlPipe } from './pipe/escape-html.pipe';

import { FormatUTC2LocalTimePipe } from './pipe/format-utc2localtime.pipe';
import { APP_INITIALIZER } from '@angular/core';
import { UserEditComponent } from './component/user/user-edit/user-edit.component';
import { UserDetailsComponent } from './component/user/user-details/user-details.component';
import { EnumCode2EnumNamePipe } from './pipe/enum-code-2-enum-name.pipe';
import { ProcessingComponent } from './component/processing/processing.component';
import { UsersComponent } from './component/user/users/users.component';
import { FormatUTC2LocalDatePipe } from './pipe/format-utc2localdate.pipe';
import { PageNotAccessibleComponent } from './component/misc/page-not-accessible/page-not-accessible.component';
import { RolesComponent } from './component/settings/roles/roles.component';
import { BannerComponent } from './component/banner/banner.component';
import { SharedModule, MessageService, ConfirmationService } from 'primeng';

import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';
import { EditorModule } from 'primeng/editor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { ChipsModule } from 'primeng/chips';
import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { LightboxModule } from 'primeng/lightbox';
import { BlockUIModule } from 'primeng/blockui';
import { InplaceModule } from 'primeng/inplace';
import { CardModule } from 'primeng/card';
import { DashboardComponent } from './component/dashboard-elts/dashboard/dashboard.component';
import { DataQualificationHomeComponent } from './component/data-qualification/data-qualification-home/data-qualification-home.component';
//import { CheckVariableComponent } from './component/data-qualification/check-variable/check-variable.component';
import { ValueCheckModule } from './module/value-check/value-check.module';
import { TranslationModule } from './module/translation/translation.module';
import { ChoixVariableAVerifierComponent } from './component/page/choix-variable-a-verifier/choix-variable-a-verifier.component';
import { VerificationVariableComponent } from './component/page/verification-variable/verification-variable.component'
import { TranslationService } from './module/translation/service/translation.service';

// References: - https://devblog.dymel.pl/2017/10/17/angular-preload/
//             - https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/
export function translationServiceFactory(translationService: TranslationService) {
  return () => translationService.loadTranslations();
}

// The user maybe reloading the page, in which case we want to load the roles from the token.
// If the jwt has been invalidated or deleted the user will be kicked out, no risk.
export function initializeRolesFactory(authenticationService: AuthenticationService) {
  return () => authenticationService.initializeRoles();
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AppVersionComponent,
    MainMenuComponent,
    OtherTranslationsComponent,
    EscapeHtmlPipe,
    EnumCode2EnumNamePipe,
    FormatUTC2LocalTimePipe,
    FormatUTC2LocalDatePipe,
    UserEditComponent,
    UserDetailsComponent,
    ProcessingComponent,
    UsersComponent,
    PageNotAccessibleComponent,
    RolesComponent,
    BannerComponent,
    DataQualificationHomeComponent,
    ChoixVariableAVerifierComponent,
    VerificationVariableComponent,
  ],
  entryComponents: [
     // This is needed for displaying the component in a Dynamic Dialog
  ],
  exports: [
  ],
  imports: [    
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    
    FontAwesomeModule,
    ReactiveFormsModule,
    
    // PrimeNG
    InputTextModule,InputTextareaModule,PanelModule,MessagesModule,MessageModule,ButtonModule,
    SharedModule,TabViewModule,MenubarModule,DropdownModule, CalendarModule,CheckboxModule,
    SelectButtonModule,MultiSelectModule,RadioButtonModule,TriStateCheckboxModule,
    FieldsetModule,InputSwitchModule,InputMaskModule,ListboxModule,
    OverlayPanelModule,DialogModule,ToggleButtonModule,SliderModule,EditorModule,
    ConfirmDialogModule,PasswordModule,SidebarModule,AutoCompleteModule,
    FileUploadModule,TooltipModule,ChipsModule,AccordionModule,ToastModule, TableModule,
    ScrollPanelModule, LightboxModule,BlockUIModule, DynamicDialogModule,InplaceModule,
    CardModule,
    
    // Spe3dlab modules (NEEDED?)
    ValueCheckModule,
    TranslationModule

  ],
  providers: [ErrorHandlerService,
              // AuthenticationService,
              AuthGuardService,
              // LoginService,
              MessageService,
              TranslationService,
              EnumCode2EnumNamePipe,
              ConfirmationService, // For PrimeNG confirmation dialog
              DynamicDialogRef, DynamicDialogConfig,
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              { provide: APP_INITIALIZER, useFactory: translationServiceFactory, deps: [TranslationService], multi: true },
              { provide: APP_INITIALIZER, useFactory: initializeRolesFactory, deps: [AuthenticationService], multi: true }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    // Add an icon to the library for convenient access in other components
    // See https://www.npmjs.com/package/@fortawesome/angular-fontawesome
    library.add(faFilePdf);
  }

}
