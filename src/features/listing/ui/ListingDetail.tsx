'use client';

import { data } from '@/mocks/mockListingDetail';
import { useTheme } from 'styled-components';
import Image from 'next/image';

import { getCategoryNameById } from '../lib';
import { bookStatusMap, convertDateToString } from '@/shared/lib';
import { useEffect, useRef, useState } from 'react';
import { colors } from '@/shared/constants';
import {
  CancleIcon,
  CompleteIcon,
  DeleteIcon,
  EditIcon,
  LikeIcon,
  MeatballsIcon,
} from '@/shared/assets/icons';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import * as S from './ListingDetail.styles';

interface ListingDetailProps {
  id: number;
}

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

const ListingDetail = ({ id }: ListingDetailProps) => {
  const visibleData = data.find((e) => e.postId === id);
  if (!visibleData) return null;

  const [liked, setLiked] = useState(visibleData.isFavorite);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const theme = useTheme();

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

  function handleLike() {
    setLiked((prev) => !prev);
    // 서버 전송 시 debounce 사용
  }

  function handleInfoToggle() {
    setIsOpenInfo((prev) => !prev);
  }
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
    <S.Container>
      <S.LeftSection>
        <S.ImageCarousel>이미지 캐러셀</S.ImageCarousel>
        <S.UserInfo>
          {visibleData.writer.profileUrl ? (
            <Image
              src={visibleData.writer.profileUrl}
              width={60}
              height={60}
              alt='profile image'
            />
          ) : (
            <DefaultProfile width={60} />
          )}
          <S.UserText>
            <S.HeadingText>{visibleData.writer.nickname}</S.HeadingText>
            <S.Text>{visibleData.writer.activityArea}</S.Text>
          </S.UserText>
        </S.UserInfo>
      </S.LeftSection>

      <S.RightSection>
        <S.HeaderRow>
          <S.HeadingText>{visibleData.book.title}</S.HeadingText>
          {visibleData.isOwner && (
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
          )}
          {isOpenEdit && (
            <S.EditList ref={menuRef}>
              {getFilteredOptions(visibleData.tradeStatus).map((option) => (
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
        </S.HeaderRow>

        <S.MetaRow>
          <S.SubText>
            #{getCategoryNameById(visibleData.category)} · #
            {bookStatusMap[visibleData.bookStatus]} ·{' '}
            {convertDateToString(visibleData.createdAt)}
          </S.SubText>
          <S.SubText>
            조회 {visibleData.viewCount} · 찜 {visibleData.scrapCount}
          </S.SubText>
        </S.MetaRow>

        <S.HeadingText>
          {visibleData.sellPrice.toLocaleString()}원
        </S.HeadingText>
        <S.Description>{visibleData.description}</S.Description>

        <S.SectionTitle onClick={handleInfoToggle}>
          책 정보 더보기
        </S.SectionTitle>
        {isOpenInfo && (
          <S.InfoGrid>
            <S.Text>저자</S.Text>
            <S.Text>{visibleData.book.author}</S.Text>

            <S.Text>출간일</S.Text>
            <S.Text>{visibleData.book.pubDate}</S.Text>

            <S.Text>정가</S.Text>
            <S.Text>{visibleData.book.priceStandard}</S.Text>

            <S.Text>책소개</S.Text>
            <S.Text>{visibleData.book.description}</S.Text>
          </S.InfoGrid>
        )}
        <S.ButtonRow>
          <S.Button
            variant={liked ? 'outline-primary' : 'outline-gray'}
            onClick={handleLike}>
            <LikeIcon
              fill={liked ? colors.light.PRIMARY : 'none'}
              stroke={!liked ? theme.colors.GRAY_500 : theme.colors.PRIMARY}
              strokeWidth={1.5}
            />
            찜하기
          </S.Button>
          <S.Button variant='primary'>채팅하기</S.Button>
        </S.ButtonRow>
      </S.RightSection>
    </S.Container>
  );
};

export default ListingDetail;
