import { useState } from 'react';
import styled from 'styled-components';
import { useForm, useWatch } from 'react-hook-form';
import { ModalLayout, Button, InputGroup } from '@/shared/ui';
import { AddHeartIcon } from '@/shared/assets/icons';
import { interestRule } from '@/shared/constants';
import CloseButton from './CloseButton';

interface InterestsProps {
  interests: string[];
  editMode: boolean;
  addInterest: (value: string) => boolean;
  removeInterest: (value: string) => void;
  handleEnterEditMode: () => void;
}
const Interests = ({
  interests,
  editMode,
  addInterest,
  removeInterest,
  handleEnterEditMode,
}: InterestsProps) => {
  const [isRemove, setIsRemove] = useState<undefined | string>(undefined);
  const [isAddInterest, setIsAddInterest] = useState(false);

  const {
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<{ interest: string }>({
    mode: 'onChange',
  });

  const newInterest = useWatch({ name: 'interest', control });

  function handleClickAddButton() {
    if (!editMode) handleEnterEditMode();
    setIsAddInterest(true);
  }
  function handleClickRemove() {
    if (!isRemove) return;
    removeInterest(isRemove);
    setIsRemove(undefined);
  }

  function handleAddInterest() {
    const trimmed = newInterest.trim();
    if (!trimmed) return;
    const flag = addInterest(trimmed);
    if (flag) {
      reset();
      setIsAddInterest(false);
    }
  }

  const disabled = !newInterest || Object.keys(errors).length > 0;

  return (
    <>
      <InterestsWrapper>
        {interests.map((interest) => (
          <div key={interest} style={{ position: 'relative' }}>
            <Interest>{interest}</Interest>
            {editMode && (
              <CloseButton onClick={() => setIsRemove(interest)} size='xs' />
            )}
          </div>
        ))}
        <AddInterestButton onClick={handleClickAddButton}>
          <AddHeartIcon strokeWidth={2} />
          관심사 등록
        </AddInterestButton>
      </InterestsWrapper>

      {isRemove && (
        <ModalLayout
          isOpen={!!isRemove}
          onClose={() => setIsRemove(undefined)}
          title={'관심사 삭제'}>
          <RemoveModalContent>
            <div>{`'${isRemove}' 을/를 삭제하시겠습니까?`}</div>
            <div style={{ width: 120 }} onClick={handleClickRemove}>
              <Button
                text='삭제'
                variant='primary'
                size='sm'
                onClick={() => setIsRemove(undefined)}
              />
            </div>
          </RemoveModalContent>
        </ModalLayout>
      )}
      {isAddInterest && (
        <ModalLayout
          isOpen={isAddInterest}
          onClose={() => setIsAddInterest(false)}
          title={'관심사 등록'}>
          <AddInterestContent>
            <InputGroup
              inputs={[
                {
                  name: 'interest',
                  placeholder: '관심사를 입력해 주세요',
                  rules: interestRule,
                },
              ]}
              register={register}
              errors={errors}
            />
            <div style={{ width: 120 }}>
              <Button
                text='등록'
                variant={disabled ? 'disabled' : 'primary'}
                size='sm'
                onClick={handleAddInterest}
              />
            </div>
          </AddInterestContent>
        </ModalLayout>
      )}
    </>
  );
};

export default Interests;

export const InterestsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const BaseInterest = styled.div`
  height: 40px;
  padding: 0 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
  }
`;

export const Interest = styled(BaseInterest)`
  background-color: ${({ theme }) => theme.colors.BLACK};
  color: ${({ theme }) => theme.colors.WHITE};
`;

const AddInterestButton = styled(BaseInterest)`
  cursor: pointer;
  gap: 4px;
  border: 1px ${({ theme }) => theme.colors.GRAY_400} solid;
  color: ${({ theme }) => theme.colors.GRAY_800};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_200};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
  svg {
    stroke: currentColor;
  }
`;

const RemoveModalContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 28px;
`;

const AddInterestContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 5px 30px;
  gap: 10px;
`;
