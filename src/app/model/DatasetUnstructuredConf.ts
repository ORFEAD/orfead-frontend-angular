import {EntityBase} from "./EntityBase";
import { Appuser } from 'src/app/module/appuser/model/Appuser';
import { Dataset } from "./Dataset";

export class DatasetUnstructuredConf  extends EntityBase {
    
    dataset:Dataset;
    languageCode:string;
    extractionTplContent:String;
    goThroughTableFromTopToBottom:boolean;
    ignoredFramesNumbersCommaSeparated:string;
    
    constructor(_json:Object) {
        super(_json);
        if (_json['dataset'] != null) {                
            this.dataset = new Dataset(_json['dataset']);                    
        }
        this.languageCode = _json['languageCode'];
        this.extractionTplContent = _json['extractionTplContent'];
        this.goThroughTableFromTopToBottom = _json['goThroughTableFromTopToBottom'];
        this.ignoredFramesNumbersCommaSeparated = _json['ignoredFramesNumbersCommaSeparated'];
        
        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new Appuser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new Appuser(_json['lastEditor']);                    
        }
    }
    
}





