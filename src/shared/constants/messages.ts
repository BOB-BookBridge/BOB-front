export const VALIDATION_MESSAGES = {
  required: (label: string) => `${label}을(를) 입력해주세요`,
  email: '유효한 이메일 형식을 입력해주세요',
  password:
    '비밀번호는 영어 대소문자, 숫자 포함 8자 이상, 20자 이하로 설정해 주세요',
  passwordConfirm: '비밀번호와 비밀번호 확인란의 입력이 일치하지 않습니다',
  nickname: {
    tooLong: '닉네임은 12자 이하로 입력해주세요',
  },
};

export const HELP_MESSAGES = {
  search:
    'ISBN은 국제표준 도서번호를 말하는 것으로 각 도서 뒷편 바코드 위치에 10 or 13자리 숫자로 표기되어 있습니다.\n\n정확한 검색을 원하신다면 ISBN을 입력해 주세요.',
  state:
    '최상: 사용 흔적이 거의 없고, 선물용으로도 무리 없음\n\n상: 표지나 책 등에 미세한 마모 또는 작은 접힘이 있음\n\n중: 필기, 접힘 등 사용 흔적이 있으나 열람에는 지장이 없음\n\n하: 사용감이 많고, 일부 페이지가 찢어지거나 필기가 많음',
};
