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
import { LoginComponent } from './component/page/login/login.component';
import { AuthGuardService } from './service/auth-guard-service.service';
import { ErrorHandlerService } from './service/error-handler.service';
import { AuthenticationService } from 'src/app/module/appuser/service/authentication.service';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { OtherTranslationsComponent } from './component/other-translations/other-translations.component';
import { AuthInterceptor} from './AuthInterceptor';

import { APP_INITIALIZER } from '@angular/core';
import { ProcessingComponent } from './component/processing/processing.component';
import { PageNotAccessibleComponent } from './component/misc/page-not-accessible/page-not-accessible.component';
import { BannerComponent } from './component/banner/banner.component';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';

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
import { ValueCheckModule } from './module/value-check/value-check.module';
import { TranslationModule } from './module/translation/translation.module';
import { AppuserModule } from './module/appuser/appuser.module';
import { Spe3dlabUtilsModule } from './module/spe3dlab-utils/spe3dlab-utils.module';
import { FrontendVersionModule } from './module/frontend-version/frontend-version.module';
import { ChoixVariableAVerifierComponent } from './component/page/choix-variable-a-verifier/choix-variable-a-verifier.component';
import { VerificationVariableComponent } from './component/page/verification-variable/verification-variable.component'
import { TranslationService } from './module/translation/service/translation.service';
import { UtilisateursComponent } from './component/page/utilisateurs/utilisateurs.component';
import { UtilisateurComponent } from './component/page/utilisateur/utilisateur.component';
import { UnstructuredDatasetUploadComponent } from './component/unstructured/unstructured-dataset-upload/unstructured-dataset-upload.component';
import { FileUploaderComponent } from './component/file-uploader/file-uploader.component';
import { DatasetSelectorComponent } from './component/dataset-selector/dataset-selector.component';
import { CheckAnonymizedSentenceComponent } from './component/unstructured/check-anonymization/check-anonymized-sentence/check-anonymized-sentence.component';
import { CheckAnonymizedDocComponent } from './component/unstructured/check-anonymization/check-anonymized-doc/check-anonymized-doc.component';
import { CheckAnonymizedWordComponent } from './component/unstructured/check-anonymization/check-anonymized-word/check-anonymized-word.component';
import { CheckDocVariablesComponent } from './component/unstructured/check-variables/check-doc-variables/check-doc-variables.component';
import { CheckDocProcessingComponent } from './component/unstructured/check-doc-processing/check-doc-processing.component';
import { CheckDocVariableComponent } from './component/unstructured/check-variables/check-doc-variable/check-doc-variable.component';
import { SpinnerComponent } from './component/misc/spinner/spinner.component';
import { ManualTaggingComponent } from './component/unstructured/manual-tagging/manual-tagging.component';
import { CheckAnonymizedTextEltComponent } from './component/unstructured/check-anonymization/check-anonymized-text-elt/check-anonymized-text-elt.component';

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
    MainMenuComponent,
    OtherTranslationsComponent,
    ProcessingComponent,
    PageNotAccessibleComponent,
    BannerComponent,
    ChoixVariableAVerifierComponent,
    VerificationVariableComponent,
    UtilisateursComponent,
    UtilisateurComponent,
    UnstructuredDatasetUploadComponent,
    FileUploaderComponent,
    DatasetSelectorComponent,
    CheckAnonymizedSentenceComponent,
    CheckAnonymizedDocComponent,
    CheckAnonymizedWordComponent,
    CheckDocVariablesComponent,
    CheckDocVariableComponent,
    CheckDocProcessingComponent,
    SpinnerComponent,
    ManualTaggingComponent,
    CheckAnonymizedTextEltComponent,    
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
    Spe3dlabUtilsModule,
    ValueCheckModule,
    TranslationModule,
    FrontendVersionModule,
    AppuserModule
  ],
  providers: [ErrorHandlerService,
              // AuthenticationService,
              AuthGuardService,
              // LoginService,
              MessageService,
              TranslationService,
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
