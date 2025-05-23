import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import * as S from './InputGroup.styles';

export interface InputItem<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  rules?: RegisterOptions<T, Path<T>>;
  rightElement?: React.ReactNode;
}

interface InputGroupProps<T extends FieldValues> {
  inputs: InputItem<T>[];
  register: UseFormRegister<T>;
  errors?: Partial<Record<keyof T, FieldError>>;
}

const InputGroup = <T extends FieldValues>({
  inputs,
  register,
  errors,
}: InputGroupProps<T>) => {
  const errorMessage = Object.values(errors || {}).find(
    (err) => !!err?.message,
  )?.message;
  return (
    <S.Container>
      <S.InputContainer>
        {inputs.map((input, idx) => (
          <div key={input.name}>
            <S.InputWrapper idx={idx}>
              <S.Input
                type={input.type ?? 'text'}
                {...register(input.name, input.rules)}
                placeholder={input.placeholder}
              />
              {input.rightElement}
            </S.InputWrapper>
          </div>
        ))}
      </S.InputContainer>
      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </S.Container>
  );
};

export default InputGroup;
