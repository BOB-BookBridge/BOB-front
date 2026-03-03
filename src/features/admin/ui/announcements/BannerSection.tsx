import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LoadingContainer, LoadingIndicator } from '@/shared/ui';
import { formatDateTime, showToast } from '@/shared/lib';
import { colors } from '@/shared/constants';
import * as S from './BannerSection.styles';
import {
  useBannerNoticeQuery,
  usePatchBannerNoticeMutation,
  usePostBannerNoticeMutation,
} from '@/entities/admin/announcements';

const BannerSection = () => {
  const [content, setContent] = useState('');
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const { isPending, data } = useBannerNoticeQuery();
  const { mutate: postNotice } = usePostBannerNoticeMutation();
  const { mutate: patchNotice } = usePatchBannerNoticeMutation();

  function handleDeactive() {
    patchNotice();
  }
  function handleSubmit() {
    if (!content) {
      showToast.error('공지 내용을 작성해 주세요');
      return;
    }
    if (endTime && !dayjs(endTime).isAfter(dayjs())) {
      showToast.error('종료 시간은 현재 시간 이후로 설정해 주세요');
      return;
    }
    postNotice(
      {
        content,
        ...(endTime && {
          endTime: dayjs(endTime).format('YYYY-MM-DDTHH:mm:ss'),
        }),
      },
      {
        onSuccess: () => {
          setContent('');
          setEndTime(null);
        },
      },
    );
  }
  return (
    <S.SectionContainer>
      {isPending ? (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      ) : (
        <>
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
                  {`작성자: ${data.writer.nickname}`}{' '}
                </S.NoticeInfoText>
                <S.NoticeInfoText>
                  {`종료일시: ${data.endTime ? formatDateTime(data.endTime) : '-'}`}
                </S.NoticeInfoText>
              </S.NoticeLeft>
              <S.DeactiveButton
                style={{ backgroundColor: colors.light.WHITE }}
                onClick={handleDeactive}>
                비활성화
              </S.DeactiveButton>
            </S.NoticeBox>
          )}
          <S.NewBanner>
            <div style={{ flex: 4 }}>
              <S.SubTitle>새 배너</S.SubTitle>
              <S.Row>
                <S.StyledInput
                  placeholder='공지 내용을 입력하세요'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </S.Row>
            </div>
            <div style={{ flex: 1.5 }}>
              <S.SubTitle>종료 시간</S.SubTitle>
              <DateTimePicker
                minDateTime={dayjs().add(1, 'minute')}
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
                        '&:hover fieldset': {
                          borderColor: colors.light.GRAY_500,
                        },
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
            <S.SubmitButton
              style={{ color: colors.light.WHITE }}
              onClick={handleSubmit}>
              등록
            </S.SubmitButton>
          </S.NewBanner>
        </>
      )}
    </S.SectionContainer>
  );
};

export default BannerSection;
