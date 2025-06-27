import { useEffect, useRef, useState } from 'react';
import { PostStatus } from '@/entities/listing/types';
import {
  CancelIcon,
  CompleteIcon,
  DeleteIcon,
  EditIcon,
  MeatballsIcon,
} from '@/shared/assets/icons';
import { useTheme } from 'styled-components';
import * as S from './ListingDetail.styles';
import { ModalLayout } from '@/shared/ui';
import CancelTradeForm from './CancelTradeForm';
import SelectBuyerForm from './SelectBuyerForm';

const editOptions = [
  { value: 'EDIT', label: '수정하기' },
  { value: 'RESERVATION', label: '거래 예약' },
  { value: 'CANCEL', label: '거래 취소' },
  { value: 'COMPLETE', label: '거래 완료' },
  { value: 'DELETE', label: '삭제하기' },
];

const EDIT_TITLE = {
  RESERVATION: '예약자 선택',
  CANCEL: '거래 취소',
  COMPLETE: '거래자 선택',
} as const;

type EditModalType = keyof typeof EDIT_TITLE;

const tradeStatusOptionMap: Record<string, string[]> = {
  READY: ['EDIT', 'RESERVATION', 'COMPLETE', 'DELETE'],
  IN_PROGRESS: ['EDIT', 'CANCEL', 'COMPLETE', 'DELETE'],
  COMPLETE: ['EDIT', 'DELETE'],
};

function getFilteredOptions(tradeStatus: string) {
  const allowed = tradeStatusOptionMap[tradeStatus] ?? [];
  return editOptions.filter((opt) => allowed.includes(opt.value));
}
interface EditMenuProps {
  postStatus: PostStatus;
  postId: number;
}

export type CancelSubmitData = {
  reason: string;
};

export type SelectBuyerSubmitData = {
  tradeId: number;
  type: 'RESERVATION' | 'COMPLETE';
};

type ModalSubmitData = CancelSubmitData | SelectBuyerSubmitData;

const EditMenu = ({ postStatus, postId }: EditMenuProps) => {
  const theme = useTheme();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [openModalType, setOpenModalType] = useState<EditModalType | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpenEdit) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpenEdit(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenEdit]);

  function handleOpenEdit() {
    setIsOpenEdit((prev) => !prev);
  }

  function handleEditOptionClick(option: string) {
    if (option === 'EDIT') console.log(postId);
    else if (
      option === 'CANCEL' ||
      option === 'RESERVATION' ||
      option == 'COMPLETE'
    )
      setOpenModalType(option);
    else if (option === 'DELETE') console.log('delete', postId);
    setIsOpenEdit(false);
  }

  function handleCloseModal() {
    setOpenModalType(null);
  }

  function handleModalSubmit(data: ModalSubmitData) {
    if ('reason' in data) {
      // 거래 취소 처리
      console.log(data.reason);
    } else {
      // 예약자 선택 or 거래 완료 처리
      console.log(data.tradeId, data.type);
    }

    setOpenModalType(null);
  }

  function getMatchIcon(option: string) {
    if (option === 'EDIT') return <EditIcon fill={theme.colors.BLACK} />;
    if (option === 'CANCEL' || option === 'RESERVATION')
      return <CancelIcon fill={theme.colors.BLACK} />;
    if (option === 'COMPLETE')
      return <CompleteIcon fill={theme.colors.BLACK} />;
    if (option === 'DELETE') return <DeleteIcon fill={theme.colors.ERROR} />;
  }

  return (
    <div>
      <div
        ref={buttonRef}
        onClick={handleOpenEdit}
        style={{
          display: 'inline-block',
          padding: 8,
          cursor: 'pointer',
        }}>
        <MeatballsIcon stroke={theme.colors.BLACK} strokeWidth={2} />
      </div>

      {isOpenEdit && (
        <S.EditList ref={menuRef}>
          {getFilteredOptions(postStatus).map((option) => (
            <S.EditItem
              key={option.value}
              type={option.value}
              onClick={() => handleEditOptionClick(option.value)}>
              {getMatchIcon(option.value)}
              {option.label}
            </S.EditItem>
          ))}
        </S.EditList>
      )}
      {openModalType && (
        <ModalLayout
          isOpen={true}
          title={EDIT_TITLE[openModalType]}
          onClose={handleCloseModal}>
          {openModalType === 'CANCEL' ? (
            <CancelTradeForm
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
            />
          ) : (
            <SelectBuyerForm
              mode={openModalType}
              onSubmit={handleModalSubmit}
              onClose={handleCloseModal}
            />
          )}
        </ModalLayout>
      )}
    </div>
  );
};

export default EditMenu;
