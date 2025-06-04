import { useEffect, useRef, useState } from 'react';
import { TradeStatus } from '@/entities/listing/model/types';
import {
  CancleIcon,
  CompleteIcon,
  DeleteIcon,
  EditIcon,
  MeatballsIcon,
} from '@/shared/assets/icons';
import { useTheme } from 'styled-components';
import * as S from './ListingDetail.styles';

const editOptions = [
  { value: 'EDIT', label: '수정하기' },
  { value: 'RESERVATION', label: '거래 예약' },
  { value: 'CANCLE', label: '거래 취소' },
  { value: 'COMPLETE', label: '거래 완료' },
  { value: 'DELETE', label: '삭제하기' },
];

const tradeStatusOptionMap: Record<string, string[]> = {
  READY: ['EDIT', 'RESERVATION', 'COMPLETE', 'DELETE'],
  IN_PROGRESS: ['EDIT', 'CANCLE', 'COMPLETE', 'DELETE'],
  COMPLETE: ['EDIT', 'DELETE'],
};

function getFilteredOptions(tradeStatus: string) {
  const allowed = tradeStatusOptionMap[tradeStatus] ?? [];
  return editOptions.filter((opt) => allowed.includes(opt.value));
}
interface EditMenuProps {
  tradeStatus: TradeStatus;
  postId: number;
}
const EditMenu = ({ tradeStatus, postId }: EditMenuProps) => {
  const theme = useTheme();
  const [isOpenEdit, setIsOpenEdit] = useState(false);

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

  function handleEditOptionClick(value: string) {}

  function getMatchIcon(option: string) {
    if (option === 'EDIT') return <EditIcon fill={theme.colors.BLACK} />;
    if (option === 'CANCLE' || option === 'RESERVATION')
      return <CancleIcon fill={theme.colors.BLACK} />;
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
          {getFilteredOptions(tradeStatus).map((option) => (
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
    </div>
  );
};

export default EditMenu;
