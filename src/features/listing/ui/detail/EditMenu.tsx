import { useRouter } from 'next/navigation';
import { useTheme } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { CancelTradeForm, SelectBuyerForm } from '@/features/trade/ui';
import { useDeleteListingMutation } from '@/entities/listing';
import { PostTradeStatus } from '@/entities/listing/types';
import * as S from './ListingDetail.styles';
import { ModalLayout } from '@/shared/ui';
import {
  CancelIcon,
  CompleteIcon,
  DeleteIcon,
  EditIcon,
  MeatballsIcon,
} from '@/shared/assets/icons';
import {
  TradeStatus,
  usePostTradeQuery,
  useTradeMutation,
} from '@/entities/trade';

const editOptions = [
  { value: 'EDIT', label: '수정하기' },
  { value: 'RESERVED', label: '거래 예약' },
  { value: 'CANCELED', label: '거래 취소' },
  { value: 'COMPLETED', label: '거래 완료' },
  { value: 'DELETE', label: '삭제하기' },
];

const EDIT_TITLE = {
  RESERVED: '예약자 선택',
  CANCELED: '거래 취소',
  COMPLETED: '거래자 선택',
} as const;

type EditModalType = keyof typeof EDIT_TITLE;

const tradeStatusOptionMap: Record<string, string[]> = {
  READY: ['EDIT', 'RESERVED', 'COMPLETED', 'DELETE'],
  RESERVED: ['EDIT', 'CANCELED', 'COMPLETED', 'DELETE'],
  COMPLETED: ['EDIT', 'DELETE'],
};

function getFilteredOptions(tradeStatus: string) {
  const allowed = tradeStatusOptionMap[tradeStatus] ?? [];
  return editOptions.filter((opt) => allowed.includes(opt.value));
}
interface EditMenuProps {
  postStatus: PostTradeStatus;
  postId: number;
}

export type CancelSubmitData = {
  reason: string;
};

export type SelectBuyerSubmitData = {
  tradeId: number;
  status: TradeStatus;
};

type ModalSubmitData = CancelSubmitData | SelectBuyerSubmitData;

const EditMenu = ({ postStatus, postId }: EditMenuProps) => {
  const theme = useTheme();
  const router = useRouter();
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
  const { mutate: deleteMutate } = useDeleteListingMutation();
  function handleEditOptionClick(option: string) {
    if (option === 'EDIT') router.push(`/listings/${postId}/edit`);
    else if (
      option === 'CANCELED' ||
      option === 'RESERVED' ||
      option == 'COMPLETED'
    )
      setOpenModalType(option);
    else if (option === 'DELETE') {
      deleteMutate(postId);
      router.back();
    }
    setIsOpenEdit(false);
  }

  function handleCloseModal() {
    setOpenModalType(null);
  }

  const { mutate: changeTradeStatus } = useTradeMutation({ postId });
  const { data: tradeData } = usePostTradeQuery(postId);
  function handleModalSubmit(data: ModalSubmitData) {
    if ('reason' in data) {
      if (
        !tradeData?.trades ||
        (tradeData.trades[0].status !== 'COMPLETED' &&
          tradeData.trades[0].status !== 'RESERVED')
      )
        return;
      const tradeId = tradeData.trades[0].id;
      changeTradeStatus({ tradeId, status: 'CANCELED', reason: data.reason });
    } else {
      changeTradeStatus({
        tradeId: data.tradeId,
        status: data.status,
        reason: null,
      });
    }

    setOpenModalType(null);
  }

  function getMatchIcon(option: string) {
    if (option === 'EDIT') return <EditIcon fill={theme.colors.BLACK} />;
    if (option === 'CANCELED' || option === 'RESERVED')
      return <CancelIcon fill={theme.colors.BLACK} />;
    if (option === 'COMPLETED')
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
          {openModalType === 'CANCELED' ? (
            <CancelTradeForm
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
            />
          ) : (
            <SelectBuyerForm
              postId={postId}
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
