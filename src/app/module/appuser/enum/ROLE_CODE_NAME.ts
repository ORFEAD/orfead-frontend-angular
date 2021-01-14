export enum ROLE_CODE_NAME {

    // # Equivalents to AppuserTypes (for convenience, so that we can use
    // # function 'hasRole()')
    healthcare_professional = 1001,
    other = 1002,

    // # Composed roles
    doctor = 1,
    value_checker = 2,
    value_checker_arbitrator = 3,
    superadmin = 4,
    
    // # Non-composed roles
    can_modify_user = 101,
    can_check_value = 102,
    can_settle_check_value_dispute = 103

}