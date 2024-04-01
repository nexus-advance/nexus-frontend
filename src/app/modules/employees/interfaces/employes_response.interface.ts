export interface EmployesInterface {
    data:    Employee[];
    status:  number;
    message: string;
}

export interface Employee {
    emp_code:                 string;
    emp_code_employee:        string;
    emp_first_name:           string;
    emp_second_name:          string;
    emp_third_name:           string;
    emp_first_surname:        string;
    emp_second_surname:       string;
    emp_married_surname:      string;
    emp_birth_date:           Date;
    emp_cel_phone:            string;
    hos_gen_genders:          HosGenGenders;
    hos_jti_job_title:        HosJtiJobTitle;
    hos_lad_labor_department: HosLadLaborDepartment;
    hos_wst_work_status:      HosWstWorkStatus;
    hos_usr_usuario:          HosUSRUsuario;
}

export interface HosGenGenders {
    gen_name: string;
}

export interface HosJtiJobTitle {
    jti_name: string;
}

export interface HosLadLaborDepartment {
    lad_name: string;
}

export interface HosUSRUsuario {
    usr_names:    string;
    usr_surnames: string;
}

export interface HosWstWorkStatus {
    wst_name: string;
}
