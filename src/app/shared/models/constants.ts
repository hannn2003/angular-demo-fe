export const rowsPerPageOptions = [10, 20, 30, 50]
export const DEFAULT_TABLE_SIZE = 10
export const DEFAULT_TABLE_PAGE = 1

export const REGEX_PHONE_NUMBER = '^\\+?\\d*$'
export const REGEX_A_TO_Z_SINGLE_CHARACTER = /^[a-zA-Z]$/
export const REGEX_VIETNAMESE_NO_NUMBER_NO_SPECIAL_CHARACTERS_EXTENDED =
    /^[\sa-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+$/
export const REGEX_VIETNAMESE_NO_SPECIAL_CHARACTERS_EXTENDED =
    /^[\sa-zA-Z0-9àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+$/
export const REGEX_ALPHANUMERIC = /^[a-zA-Z0-9]+$/

export const NO_EXISTS_TOKEN = 'NO_EXISTS_TOKEN'

export const GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
}

export const MODE = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
}

export const ERROR_CODE = {
    ['422']: '422',
    ['ACC-14']: 'ACC-14',
    ['ACC-010']: 'ACC-010',
    ['ACC-03']: 'ACC-03',
    ['ACC-16']: 'ACC-16',
}

export const SUCCESS_CODE = '200'
