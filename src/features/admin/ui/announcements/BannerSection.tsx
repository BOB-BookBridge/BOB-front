import { Dayjs } from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import { DateTimePicker } from '@mui/x-date-pickers';
import { formatDateTime } from '@/shared/lib';
import { colors } from '@/shared/constants';
import * as S from './BannerSection.styles';

const data = {
  title: '[공지사항]',
  content: '2월 19일 18:00까지 점검입니다.',
  endTime: '2026-02-19T18:00:00',
  writer: {
    id: '019c1341-2f18-7fd0-943d-4c1722e16462',
    nickname: 'manager001',
  },
};

const BannerSection = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  function handleSubmit() {}
  return (
    <S.SectionContainer>
      <S.SectionTitle>📌 페이지 상단 배너 공지</S.SectionTitle>
      {data && (
        <S.NoticeBox>
          <S.NoticeLeft>
            <S.Row>
              <S.NoticeCircle />
              <S.NoticeTitleText>{data.title}</S.NoticeTitleText>
            </S.Row>
            <S.NoticeContentText>{data.content}</S.NoticeContentText>
            <S.NoticeInfoText>
              작성자: {data.writer.nickname} 종료:{' '}
              {formatDateTime(data.endTime)}
            </S.NoticeInfoText>
          </S.NoticeLeft>
          <S.DeactiveButton style={{ backgroundColor: colors.light.WHITE }}>
            비활성화
          </S.DeactiveButton>
        </S.NoticeBox>
      )}
      <S.NewBanner>
        <div style={{ flex: 4 }}>
          <S.SubTitle>새 배너</S.SubTitle>
          <S.Row>
            <S.StyledInput
              placeholder='공지 제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ flex: 1 }}
            />
            <S.StyledInput
              placeholder='공지 내용을 입력하세요'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ flex: 4 }}
            />
          </S.Row>
        </div>
        <div style={{ flex: 1.5 }}>
          <S.SubTitle>종료 시간</S.SubTitle>
          <DateTimePicker
            enableAccessibleFieldDOMStructure={false}
            value={endTime}
            onChange={(value) => setEndTime(value)}
            slotProps={{
              textField: {
                size: 'small',
                sx: {
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    '& fieldset': { borderColor: colors.light.GRAY_400 },
                    '&:hover fieldset': { borderColor: colors.light.GRAY_500 },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.light.SECONDARY,
                    },
                  },
                  '& .MuiInputBase-input': { padding: '0 14px' },
                },
              },
            }}
          />
        </div>
        <S.SubmitButton style={{ color: colors.light.WHITE }}>
          등록
        </S.SubmitButton>
      </S.NewBanner>
    </S.SectionContainer>
  );
};

export default BannerSection;
