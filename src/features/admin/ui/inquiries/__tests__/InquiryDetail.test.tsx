import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/shared/test/renderWithProviders';
import * as queriesModule from '@/entities/admin/inquirues/queries';
import { GetInquiryRes } from '@/entities/admin/inquirues';
import InquiryDetail from '../InquiryDetail';
import { useMyQuery } from '@/entities/user';
import { inquiryStatusMap } from '@/shared/lib';

const mockInquiryData: GetInquiryRes = {
  id: 1,
  status: 'PENDING',
  title: '테스트 문의',
  email: 'test@example.com',
  content: '이것은 테스트 문의입니다',
  reply: null,
  managerNickname: null,
  createdAt: '2026-01-20T07:34:41',
  processedAt: null,
};

const mockMyData = {
  nickname: 'manager001',
  email: 'manager@example.com',
};

jest.mock('@/shared/ui', () => ({
  Button: ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button onClick={onClick}>{text}</button>
  ),
  LoadingIndicator: () => <div aria-label='로딩'>로딩 중...</div>,
  LoadingContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock('@/shared/assets/icons');
jest.mock('@/entities/admin/inquirues/queries');
jest.mock('next/navigation');
jest.mock('@/entities/user');

// 헬퍼 함수
const mockUseInquiryQuery = (
  data?: GetInquiryRes | null,
  isPending = false,
) => {
  (jest.mocked(queriesModule.useInquiryQuery) as jest.Mock).mockReturnValue({
    isPending,
    data,
  });
};

const mockUseMyQuery = (data = mockMyData) => {
  (jest.mocked(useMyQuery) as jest.Mock).mockReturnValue({
    data,
  });
};

const mockUseMutation = (mutate = jest.fn()) => {
  (
    jest.mocked(queriesModule.useAdminInquiryMutation) as jest.Mock
  ).mockReturnValue({
    mutate,
  });
};

describe('InquiryDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInquiryQuery(mockInquiryData);
    mockUseMyQuery();
    mockUseMutation();
  });

  it('데이터가 없으면 메시지를 표시합니다', () => {
    mockUseInquiryQuery(null);

    renderWithProviders(<InquiryDetail id={1} />);
    expect(screen.getByText('데이터가 존재하지 않습니다.')).toBeInTheDocument();
  });

  it('문의 데이터를 정상적으로 렌더링합니다', () => {
    renderWithProviders(<InquiryDetail id={1} />);

    expect(screen.getByText('테스트 문의')).toBeInTheDocument();
    expect(screen.getByText('이것은 테스트 문의입니다')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('PENDING 상태일 때 답변하기 버튼을 표시합니다', () => {
    renderWithProviders(<InquiryDetail id={1} />);

    expect(screen.getByText('답변하기')).toBeInTheDocument();
  });

  it('PROCESSED 상태일 때 답변하기 버튼을 표시하지 않습니다', () => {
    const processedData: GetInquiryRes = {
      ...mockInquiryData,
      status: 'PROCESSED',
      processedAt: '2026-01-21T10:42:09.782654',
    };

    mockUseInquiryQuery(processedData);

    renderWithProviders(<InquiryDetail id={1} />);

    expect(screen.queryByText('답변하기')).not.toBeInTheDocument();
  });

  it('IN_REVIEW 상태이고 담당자가 아니면 답변하기 버튼을 표시하지 않습니다', () => {
    const inReviewData: GetInquiryRes = {
      ...mockInquiryData,
      status: 'IN_REVIEW',
      managerNickname: 'otherManager',
    };

    mockUseInquiryQuery(inReviewData);

    renderWithProviders(<InquiryDetail id={1} />);

    expect(screen.queryByText('답변하기')).not.toBeInTheDocument();
  });

  it('IN_REVIEW 상태이고 담당자면 답변하기 버튼을 표시합니다', () => {
    const inReviewData: GetInquiryRes = {
      ...mockInquiryData,
      status: 'IN_REVIEW',
      managerNickname: 'manager001',
    };

    mockUseInquiryQuery(inReviewData);

    renderWithProviders(<InquiryDetail id={1} />);

    expect(screen.getByText('답변하기')).toBeInTheDocument();
  });

  it('드롭다운을 열고 상태를 변경할 수 있습니다', async () => {
    const mockMutate = jest.fn();
    mockUseMutation(mockMutate);

    const user = userEvent.setup();
    renderWithProviders(<InquiryDetail id={1} />);

    const statusButton = screen.getByText(inquiryStatusMap['PENDING']);
    await user.click(statusButton);

    expect(screen.getByText(inquiryStatusMap['IN_REVIEW'])).toBeInTheDocument();

    const inReviewOptions = screen.getAllByText(inquiryStatusMap['IN_REVIEW']);
    const inReviewOption = inReviewOptions[inReviewOptions.length - 1];
    await user.click(inReviewOption);

    expect(mockMutate).toHaveBeenCalled();
    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'IN_REVIEW' }),
      expect.any(Object),
    );
  });

  it('PROCESSED 상태일 때 드롭다운을 열 수 없습니다', async () => {
    const processedData: GetInquiryRes = {
      ...mockInquiryData,
      status: 'PROCESSED',
    };

    mockUseInquiryQuery(processedData);

    const user = userEvent.setup();
    renderWithProviders(<InquiryDetail id={1} />);

    const statusButton = screen.getByText(inquiryStatusMap['PROCESSED']);
    await user.click(statusButton);

    expect(
      screen.queryByText(inquiryStatusMap['PENDING']),
    ).not.toBeInTheDocument();
  });

  it('답변 텍스트를 입력하고 제출할 수 있습니다', async () => {
    const mockMutate = jest.fn();
    mockUseMutation(mockMutate);

    const user = userEvent.setup();
    renderWithProviders(<InquiryDetail id={1} />);

    const textarea = screen.getByPlaceholderText(
      '고객 문의에 대한 답변을 작성해주세요',
    );
    await user.type(textarea, '이것은 답변입니다');

    const submitButton = screen.getByText('답변하기');
    await user.click(submitButton);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'PROCESSED',
        reply: '이것은 답변입니다',
      }),
      expect.any(Object),
    );
  });

  it('빈 답변은 제출할 수 없습니다', async () => {
    const mockMutate = jest.fn();
    mockUseMyQuery();
    mockUseMutation(mockMutate);

    const user = userEvent.setup();
    renderWithProviders(<InquiryDetail id={1} />);

    const submitButton = screen.getByText('답변하기');
    expect(submitButton).toBeInTheDocument();

    await user.click(submitButton);

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
