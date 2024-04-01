export interface GirosResponse {
    data:    Client[];
    status:  number;
    message: string;
}

export interface Client {
    cli_code:                    string;
    cli_full_name:               string;
    cli_birth_date:              Date;
    mar_code:                    string;
    cis_code:                    string;
    cli_dui:                     string;
    cli_place_expedition:        string;
    cli_dui_date_expedition:     Date;
    cli_dui_date_expiration:     Date;
    gen_code:                    string;
    cli_is_taxpayer:             boolean;
    cli_no_taxpayer:             string;
    cli_mount_month:             number;
    cli_have_other_incomer:      boolean;
    cli_bussiness_tipe:          string;
    cli_time_bussiness:          number;
    cli_address_bussiness:       string;
    cli_dep_code_bussines:       string;
    cli_mun_code_bussines:       string;
    cli_dis_code_bussines:       string;
    cli_daily_sell:              number;
    cli_daily_buy:               number;
    cli_daily_gain:              number;
    cli_address:                 string;
    cli_phone:                   string;
    cli_cell_phone:              string;
    cli_dep_code:                string;
    cli_mun_code:                string;
    cli_dis_code:                string;
    cli_time_alive:              number;
    cli_tenant_name:             string;
    cli_tenant_phone:            string;
    cli_status:                  string;
    cli_date_create:             Date;
    cli_date_update:             Date;
    nex_mar_markeds:             NexMarMarkeds;
    nex_cis_civil_status:        NexCisCivilStatus;
    nex_gen_gender:              NexGenGender;
    nex_dis_districts_bussinees: NexDisDistricts;
    nex_dis_districts_client:    NexDisDistricts;
}

export interface NexCisCivilStatus {
    cis_code:   string;
    cis_names:  string;
    cis_status: string;
}

export interface NexDisDistricts {
    dis_code:                string;
    dis_names:               string;
    dis_status:              string;
    mun_code:                string;
    nex_mun_municipalities?: NexMunMunicipalities;
}

export interface NexMunMunicipalities {
    mun_code:            string;
    mun_names:           string;
    mun_status:          string;
    dep_code:            string;
    nex_dep_departament: NexDepDepartament;
}

export interface NexDepDepartament {
    dep_code:   string;
    dep_names:  string;
    dep_status: string;
}

export interface NexGenGender {
    gen_code:   string;
    gen_names:  string;
    gen_status: string;
}

export interface NexMarMarkeds {
    mar_code:   string;
    mar_name:   string;
    mar_status: string;
}
