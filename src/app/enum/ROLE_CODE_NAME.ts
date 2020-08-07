export enum ROLE_CODE_NAME {

    // # Equivalents to AppUserTypes (for convenience, so that we can use
    // # function 'hasRole()')
    ip_owner_collaborator = 1001,
    licensee_collaborator = 1002,
    agent_collaborator = 1003,

    // # Composed roles
    superadmin = 1,
    ip_owner = 2,
    basic_licensee_member = 3,
    agent_member_in_charge_of_deals = 4,
    agent_member_in_charge_of_designs = 5,
    ip_owner_member_in_charge_of_deals_but_wo_approval_rights = 6,
    ip_owner_member_in_charge_of_designs = 7,
    licensee_member_in_charge_of_deals = 8,
    licensee_member_in_charge_of_designs = 9,
    agent_member_supervising_all_deals = 10,
    agent_member_supervising_all_designs = 11,


    // # Non-composed roles
    can_create_user = 101,
    can_create_ip = 102,

    can_read_style_guide = 103,
    can_grant_access_to_style_guide = 104,
    can_write_style_guide = 105,
    can_write_deal = 106,
    can_approve_deal = 107,
    can_write_design = 108,

    can_write_user = 109,
    can_write_company = 110,
    can_have_avatar = 111,

    can_search_designs = 112,
    can_search_deals = 113,
    can_search_sales_reports = 114,
    can_search_trademarks = 115,
    can_search_users = 116,
    can_search_companies = 117,
    can_write_app_settings = 118,
    
    can_read_financial_conditions_of_deals = 119,

    can_read_conflicts_of_deal = 120,
    can_read_trademark_protection_of_deal = 121,
    can_write_trademark = 122,

    can_search_roles = 123,
    can_write_role = 124,

    can_approve_design = 125,

    can_authorize_a_nice_type = 126,
    can_write_all_properties_of_a_nice_type = 127,

    can_make_announcements = 128,

    can_receive_notifications_for_all_deals_forums = 129,
    can_receive_notifications_for_all_designs_forums = 130

}