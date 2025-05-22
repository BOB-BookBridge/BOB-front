export const VALIDATION_MESSAGES = {
  required: (label: string) => `${label}을(를) 입력해주세요`,
  email: '유효한 이메일 형식을 입력해주세요',
  password:
    '비밀번호는 영어 대소문자, 숫자 포함 8자 이상, 20자 이하로 설정해 주세요',
  passwordConfirm: '비밀번호와 비밀번호 확인란의 입력이 일치하지 않습니다',
  nickname: {
    tooLong: '닉네임은 10자 이하로 입력해주세요',
  },
};
