export enum RoleAccount {
    VIEN_TRUONG = 'VIEN_TRUONG',
    VIEN_PHO = 'VIEN_PHO',
    IT_ADMIN = 'IT_ADMIN',
    TRUONG_PHONG = 'TRUONG_PHONG',
    PHO_PHONG = 'PHO_PHONG',
    KIEM_SAT_VIEN = 'KIEM_SAT_VIEN',
}

export enum DepartmentCode {
    PB_LANH_DAO = 'PB_LANH_DAO',
    PB_KY_THUAT = 'PB_KY_THUAT',
    PB_TRAT_TU_XA_HOI = 'PB_TRAT_TU_XA_HOI',
    PB_AN_NINH_MA_TUY = 'PB_AN_NINH_MA_TUY',
    PB_KINH_TE_THAM_NHUNG = 'PB_KINH_TE_THAM_NHUNG',
    PB_DAN_SU_HANH_CHINH_KINH_DOANH = 'PB_DAN_SU_KINH_DOANH',
    PB_KHIEU_NAI_TO_CAO = 'PB_KHIEU_NAI_TO_CAO',
    PB_TO_CHUC_CAN_BO = 'PB_TO_CHUC_CAN_BO',
    PB_THANH_TRA_KHIEU_TO = 'PB_THANH_TRA_KHIEU_TO',
    PB_THI_HANH_AN = 'PB_THI_HANH_AN',
}

export enum KeyAction {
    REMOVE = 'remove',
    UPDATE = 'update',
    CREATE = 'create',
    VIEW = 'view',
    ACTIVE = 'active',
    IN_ACTIVE = 'inactive',
    LOCK = 'lock',
    UN_LOCK = 'un_lock',
    DISABLE = 'disable',
    HIDDEN = 'hidden',
    SELECT_DATE_FROM_TO = 'select_date_from_to',
    SELECT_DATE_TO = 'select_date_to',
    MOVE = 'move',
    UPLOAD = 'upload_file',
    ROLL_BACK='role_back'
}

export enum KeyCategory {
    ROLE = 'roles',
    DEPARTMENT = 'departments',
    ORGANIZATION = 'organizations',
}

export enum StatusAccount {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    INITIAL = 'INITIAL',
}

export enum StatusDevice {
    DISCONNECTED = 'DISCONNECTED',
    CONNECTED = 'CONNECTED',
}

export enum CaseType {
    HINH_SU = 'HINH_SU',
    DAN_SU = 'DAN_SU',
}

export enum CaseDocumentType {
    ROOT = 'ROOT',
    INVESTIGATION = 'INVESTIGATION',
    TRIAL = 'TRIAL',
    TRASH = 'TRASH',
    HISTORY = 'HISTORY',
}

export enum CitizenType {
    INVESTIGATOR = 'INVESTIGATOR',
    SUSPECT = 'SUSPECT',
    DEFENDANT = 'DEFENDANT'
}