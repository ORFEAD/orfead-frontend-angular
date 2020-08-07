import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as Moment from 'moment-timezone';
import { DEAL_STATUS } from '../enum/DEAL_STATUS';
import { APPUSER_TYPE } from '../enum/APPUSER_TYPE';
import { TRADEMARK_TYPE } from '../enum/TRADEMARK_TYPE';
import { TRADEMARK_STATUS } from '../enum/TRADEMARK_STATUS';
import { IP_USAGE } from '../enum/IP_USAGE';
import { ROLE_CODE_NAME } from '../enum/ROLE_CODE_NAME';
import { COMPANY_TYPE } from '../enum/COMPANY_TYPE';
import { DESIGN_STATUS } from '../enum/DESIGN_STATUS';
import { FINANCIAL_TERMS_TYPE } from '../enum/FINANCIAL_TERMS_TYPE';
               
@Pipe({ name: 'enumCode2EnumName', pure: false })
export class EnumCode2EnumNamePipe implements PipeTransform {
  constructor() {
  }

  transform(arg,enumType) {
    
    if (arg == null) {
      return "missing"
    }

    // We may have passed an argument that is aready the enum name,
    //   in which case we do nothing
    if (isNaN(arg)) {
      return arg;
    }
    
    if (enumType == "DEAL_STATUS" || enumType == DEAL_STATUS) {
      return DEAL_STATUS[arg];
    } else if (enumType == "APPUSER_TYPE" || enumType == APPUSER_TYPE) {
      return APPUSER_TYPE[arg];
    } else if (enumType == "TRADEMARK_TYPE" || enumType == TRADEMARK_TYPE) {
      return TRADEMARK_TYPE[arg];
    } else if (enumType == "TRADEMARK_STATUS" || enumType == TRADEMARK_STATUS) {
      return TRADEMARK_STATUS[arg];
    } else if (enumType == "IP_USAGE" || enumType == IP_USAGE) {
      return IP_USAGE[arg];
    }  else if (enumType == "ROLE_CODE_NAME" || enumType == ROLE_CODE_NAME) {
      return ROLE_CODE_NAME[arg];
    } else if (enumType == "COMPANY_TYPE" || enumType == COMPANY_TYPE) {
      return COMPANY_TYPE[arg];
    } else if (enumType == "DESIGN_STATUS" || enumType == DESIGN_STATUS) {
      return DESIGN_STATUS[arg];
    } else if (enumType == "FINANCIAL_TERMS_TYPE" || enumType == FINANCIAL_TERMS_TYPE) {
      return FINANCIAL_TERMS_TYPE[arg];
    }
    else {
      throw "Unknown enum type[" + enumType + "]";
      
    }

  }
}